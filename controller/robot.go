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
	com RobotComInterface

	Status RobotConnStatus
}

type RobotConnectionOptions struct {
	Baud int
	Dev  string
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

func NewRobot(l *zap.Logger, opt RobotConnectionOptions) (r *Robot, err error) {
	/*c := &serial.Config{Name: opt.Dev, Baud: opt.Baud}
	s, err := serial.OpenPort(c)
	if err != nil {
		l.Error("failed to open port", zap.Error(err))
		return
	}*/

	l.Debug("serial connection established")
	r = &Robot{
		//port:   s,
		Status: Disconnected,
	}

	r.connect(context.TODO(), "waxn-maus.local:8888")

	// start listening on the serial port

	return
}

func (r *Robot) SendCmd(cmd *pb.MausIncomingMessage) error {
	buf, err := proto.Marshal(cmd)
	if err != nil {
		return err
	}

	log.Debug("sending command", zap.String("cmd", cmd.String()), zap.Binary("buf", buf), zap.Int("len", len(buf)))

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

	log.Debug("got command", zap.String("cmd", cmd.String()))

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
					Version: 2,
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
		log.Debug("received response", zap.Error(err))
		if err != nil {
			respChannel <- errors.New("invalid robot response to init packet")
			return
		}

		if ack := ackCmd.GetAck(); ack != nil {
			respChannel <- nil
			return
		}
	}()

	select {
	case <-ctx.Done():
		return ctx.Err()
	case resp := <-respChannel:
		return resp
	}
}

func (r *Robot) StartInitSequence() error {
	for {
		ctx, cancel := context.WithTimeout(context.TODO(), 2*time.Second)
		defer cancel()
		err := r.sendInitWithRetries(ctx)

		if err != nil {

			// if cancelled due to timeout retry
			if errors.Is(err, context.DeadlineExceeded) {
				continue
			}

			// if failed due to other error cancel setup
			return err

		}
		log.Debug("init completed")
		r.Status = Connected
		return nil
	}
}
