package main

import (
	"context"
	"errors"
	"net"
	"time"

	pb "gitlab.lrz.de/waxn/micromaus/proto"
	"go.uber.org/zap"
	"google.golang.org/protobuf/proto"
)

type RobotConnStatus int

const (
	Connected RobotConnStatus = iota
	Disconnected
)

type RobotComInterface interface {
	Write(b []byte) (n int, err error)
	Read(b []byte) (n int, err error)
}

type Robot struct {
	com           RobotComInterface
	ID            string
	InterfaceAddr string
	Status        RobotConnStatus
	Ctx           context.Context

	OnLostConnection func()
	OnConnected      func()

	// channel on which to listen for messages
	pongMsgChannel chan bool

	// channel on which to listen for messages
	IncomingMsg chan *pb.MausOutgoingMessage

	Config *pb.MausConfigPacket
}

type RobotConnectionOptions struct {
	Baud int
	Dev  string
	Addr string
}

func (r *Robot) connect(ctx context.Context, address string) (err error) {
	raddr, err := net.ResolveUDPAddr("udp", address)
	if err != nil {
		return
	}

	conn, err := net.DialUDP("udp", nil, raddr)
	if err != nil {
		return
	}
	r.com = conn
	return
}

var (
	lastAddr string
)

func NewRobot(l *zap.Logger, opt RobotConnectionOptions) (r *Robot, err error) {
	l.Debug("NewRobot()")
	r = &Robot{
		ID:            opt.Dev,
		InterfaceAddr: opt.Addr,
		//port:   s,
		Status:      Disconnected,
		IncomingMsg: make(chan *pb.MausOutgoingMessage, 10),
		// channel for incoming pong messages
		pongMsgChannel: make(chan bool, 10),
		Ctx:            context.Background(),
	}

	err = r.connect(context.TODO(), opt.Addr)

	// connect using last address
	if err != nil && lastAddr != "" {
		err = r.connect(context.TODO(), lastAddr+":8888")
		if err != nil {
			l.Error("failed to connect to robot", zap.Error(err))
			lastAddr = ""
			return nil, err
		}
		return r, nil
	}

	// connect using remote server
	if err != nil {
		return nil, err
	}

	// start listening on the serial port
	return
}

func (r *Robot) SendCmd(cmd *pb.MausIncomingMessage) error {
	buf, err := proto.Marshal(cmd)
	if err != nil {
		return err
	}

	log.Debug("sending command", zap.String("cmd", cmd.String()), zap.Binary("buf", buf), zap.Int("len", len(buf)))

	if r.com == nil {
		log.Error("no connection to robot")
		return errors.New("no connection to robot")
	}

	_, err = r.com.Write(buf)
	if err != nil {
		return err
	}
	return nil
}

func (r *Robot) ReadCmd() (*pb.MausOutgoingMessage, []byte, error) {
	buf := make([]byte, 1024)
	n, err := r.com.Read(buf)
	if err != nil {
		return nil, nil, err
	}

	cmd := &pb.MausOutgoingMessage{}

	err = proto.Unmarshal(buf[:n], cmd)
	if err != nil {
		return nil, buf[:n], err
	}

	return cmd, buf[:n], nil
}

func (r *Robot) sendInitWithRetries(ctx context.Context) error {
	respChannel := make(chan error, 1)
	go func() {
		log.Debug("connecting to robot")

		// set init packet
		cmd := &pb.MausIncomingMessage{

			Payload: &pb.MausIncomingMessage_Init{
				Init: &pb.MsgInit{
					Version: 3,
				},
			},
		}

		err := r.SendCmd(cmd)
		log.Debug("init packet send", zap.Error(err))
		if err != nil {
			respChannel <- err
			return
		}
		log.Debug("waiting for init ack")
		ackCmd, _, err := r.ReadCmd()
		log.Debug("received response", zap.String("cmd", ackCmd.String()))
		if err != nil {
			respChannel <- errors.New("invalid robot response to init packet")
			return
		}

		if ack := ackCmd.GetAck(); ack != nil {
			log.Debug("got ack packet stopping func")
			respChannel <- nil
			return
		}

		if conf := ackCmd.GetMausConfig(); conf != nil {
			r.Config = conf
			log.Debug("got config packet stopping func")
			respChannel <- nil
			return
		}

		if nav := ackCmd.GetNav(); nav != nil {
			log.Debug("robot already streaming reconnecting...")
			respChannel <- nil
			return
		}

	}()

	select {
	case <-ctx.Done():
		return ctx.Err()
	case resp := <-respChannel:
		log.Debug("connected")
		return resp
	}
}

func executeWithRetries(ctx context.Context, maxRetries uint, f func(ctx context.Context, errChan chan error)) (err error) {
	for i := uint(0); i < maxRetries; i++ {
		errChan := make(chan error, 1)
		go f(ctx, errChan)
		select {
		case err := <-errChan:
			return err
		case <-ctx.Done():
			log.Error("context canceled")
			return ctx.Err()
		}
	}
	return err
}

// send recv ping pong messages from robot to make sure robot is still connected
func (r *Robot) startPingPong(interval time.Duration, timeout time.Duration, maxRetries uint) {
	pingCmd := &pb.MausIncomingMessage{

		Payload: &pb.MausIncomingMessage_Ping{},
	}

	time.Sleep(5 * time.Second)

	for {
		ctx, cancel := context.WithTimeout(context.TODO(), timeout)

		defer cancel()

		err := executeWithRetries(ctx, maxRetries, func(ctx context.Context, errChan chan error) {
			err := r.SendCmd(pingCmd)
			if err != nil {
				log.Error("failed to send ping", zap.Error(err))
				errChan <- err
				return
			}
			log.Info("ping->")
			// wait for pong
			<-r.pongMsgChannel
			log.Info("<-pong")

			errChan <- nil
		})

		if err != nil {
			log.Error("failed to send ping, disconnecting", zap.Error(err))

			r.Status = Disconnected

			if r.OnLostConnection != nil {
				r.OnLostConnection()
			}

			err = r.Connect()
			if err != nil {
				log.Error("failed to reconnect", zap.Error(err))
				return
			}
			// close(r.pongMsgChannel)
			// r.pongMsgChannel = nil
			return
		}
		time.Sleep(interval)
	}
}

func (r *Robot) Connect() error {
	log := log.With(zap.String("ID", r.ID))
	log.Debug("Robot.Connect()")
	if r.Status == Connected {
		return errors.New("already connected")
	}

	for {
		ctx, cancel := context.WithTimeout(context.TODO(), 5*time.Second)
		defer cancel()
		err := r.sendInitWithRetries(ctx)

		if err != nil {
			// if cancelled due to timeout retry
			if errors.Is(err, context.DeadlineExceeded) {
				log.Debug("failed to connect to robot in time", zap.Error(err))
				continue
			}

			// if failed due to other error cancel setup
			return err

		}
		r.Status = Connected
		r.pongMsgChannel = make(chan bool)

		if r.OnConnected != nil {
			r.OnConnected()
		}

		// start message handling routine
		go func() {
			for {
				if r.Status == Disconnected {
					log.Debug("disconnected, stopping message handling routine")
					return
				}
				// log.Debug("waiting for message")
				cmd, buf, err := r.ReadCmd()
				if err != nil {
					log.Error("failed to read command", zap.Error(err), zap.Binary("buf", buf), zap.Int("len", len(buf)))
					return
				}

				// log.Info("got command", zap.String("cmd", cmd.String()), zap.Int("len", len(buf)))

				// internally handle ack messages
				if pong := cmd.GetPong(); pong != nil {
					r.pongMsgChannel <- true
					continue
				}

				r.IncomingMsg <- cmd
			}
		}()

		// start ping pong routine
		go r.startPingPong(3*time.Second, 5*time.Second, 2)

		return nil
	}
}
