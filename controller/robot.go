package main

import (
	"errors"
	"time"

	"github.com/tarm/serial"
	pb "gitlab.lrz.de/waxn/micromaus/proto"
	"go.uber.org/zap"
	"google.golang.org/protobuf/proto"
)

type RobotConnStatus int

const (
	Connected RobotConnStatus = iota
	Disconnected
)

type Robot struct {
	port *serial.Port

	Status RobotConnStatus
}

type RobotConnectionOptions struct {
	Baud int
	Dev  string
}

func NewRobot(l *zap.Logger, opt RobotConnectionOptions) (r *Robot, err error) {
	c := &serial.Config{Name: opt.Dev, Baud: opt.Baud}
	s, err := serial.OpenPort(c)
	if err != nil {
		l.Error("failed to open port", zap.Error(err))
		return
	}

	l.Debug("serial connection established")

	r = &Robot{
		port:   s,
		Status: Disconnected,
	}

	// start listening on the serial port

	return
}

func (r *Robot) SendCmd(cmd *pb.MausIncomingMessage) error {
	buf, err := proto.Marshal(cmd)
	if err != nil {
		return err
	}

	_, err = r.port.Write(buf)
	if err != nil {
		return err
	}

	return nil
}

func (r *Robot) ReadCmd() (*pb.MausOutgoingMessage, error) {
	buf := make([]byte, 1024)
	n, err := r.port.Read(buf)
	if err != nil {
		return nil, err
	}

	cmd := &pb.MausOutgoingMessage{}

	err = proto.Unmarshal(buf[:n], cmd)
	if err != nil {
		return nil, err
	}

	return cmd, nil
}

func (r *Robot) StartInitSequence() error {
	// set init packet
	cmd := pb.MausIncomingMessage{
		Type: pb.MsgType_Init,
	}
	// retry sending init message till robot respo
	for {
		log.Info("sending init packet")
		err := r.SendCmd(&cmd)
		if err != nil {
			return err
		}

		cmd, err := r.ReadCmd()

		if err != nil {
			return errors.New("invalid robot response to init packet")
		}

		if ack := cmd.GetAck(); ack != nil {
			r.Status = Connected
			return nil
		}
		time.Sleep(5 * time.Second)
	}

}
