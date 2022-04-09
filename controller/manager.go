package main

import (
	"context"
	"errors"
	"fmt"

	"github.com/google/uuid"
	"github.com/gorilla/websocket"
	pb "gitlab.lrz.de/waxn/micromaus/proto"
	"go.uber.org/zap"
	"google.golang.org/protobuf/proto"
)

type Manager struct {
	// currently connected robot
	Robots map[string]*Robot

	// currently connected web clients
	Clients map[string]*Client

	// monitoring routines per robot
	robotComStopChan map[string]chan int

	broadcastChannels map[string]chan *pb.MausOutgoingMessage

	ctx context.Context

	routineRunning bool
}

func NewManager() *Manager {
	return &Manager{
		Robots:            make(map[string]*Robot),
		Clients:           make(map[string]*Client),
		broadcastChannels: make(map[string]chan *pb.MausOutgoingMessage, 1),
		robotComStopChan:  make(map[string]chan int),
		ctx:               context.WithValue(context.TODO(), "log", log.With(zap.String("service", "manager"))),
		routineRunning:    false,
	}
}

func (m *Manager) RunWebSocketClient(c *websocket.Conn) string {
	client := NewClient(c, uuid.NewString())

	m.Clients[client.ID] = client

	// send mouse config to newly registered client

	m.onClientMsg(client)

	// cleanup connection
	c.Close()
	delete(m.Clients, client.ID)

	return client.ID
}

func (m *Manager) RegisterRobot(r *Robot) error {

	// create broadcast channel
	m.broadcastChannels[r.ID] = make(chan *pb.MausOutgoingMessage, 1)
	// store robot on interface address
	m.Robots[r.ID] = r
	m.startComRoutine(r.ID)

	r.OnLostConnection = func() {
		// write disconnect event in broadcast channel

		msg := &pb.DashboardServerMessage{
			Payload: &pb.DashboardServerMessage_DeviceLost{},
		}

		for _, c := range m.Clients {
			if c.RobotID != r.ID {
				continue
			}
			c.sendDashboardMsgToClient(msg)
		}
	}

	err := r.Connect()
	if err != nil {

		return err
	}
	return nil
}

func (m *Manager) broadCastRoutine(robotID string) {
	l := m.getLogger().With(zap.String("ID", robotID))
	quitChan := m.robotComStopChan[robotID]
	cmdChan := m.broadcastChannels[robotID]

	for {
		select {
		case <-quitChan:
			return
		case cmd := <-cmdChan:
			envelope := &pb.ServerMessage{
				Payload: &pb.ServerMessage_Maus{
					Maus: cmd,
				},
			}

			// re encode message
			buf, err := proto.Marshal(envelope)
			if err != nil {
				l.Error("failed to encode proto message", zap.Error(err))
				continue

			}
			// send message to all clients
			for _, c := range m.Clients {
				if c.RobotID != robotID {
					continue
				}

				c.conn.WriteMessage(websocket.BinaryMessage, buf)
				fmt.Print(".")
				if err != nil {
					l.Error("failed to write to client", zap.Error(err), zap.String("client", c.ID))
					continue

				}
			}
		}

	}
}

func (m *Manager) recvFromMausRoutine(robotID string) {
	l := m.getLogger().With(zap.String("ID", robotID))
	r := m.Robots[robotID]
	cmdChan := m.broadcastChannels[robotID]

	if r == nil || cmdChan == nil {
		l.Info("robot not found")
		return
	}

	for {
		if r == nil {
			l.Info("robot disconnected stopping transmission")
			return
		}
		cmd := <-r.IncomingMsg

		switch cmd.Payload.(type) {
		case *pb.MausOutgoingMessage_MausConfig:
			l.Info("received config from robot")
			// store mouse config
			r.Config = cmd.GetMausConfig()
			cmdChan <- cmd
		case *pb.MausOutgoingMessage_MausCommandStatus:
			cmdChan <- cmd
		case *pb.MausOutgoingMessage_Nav:
			cmdChan <- cmd
		case *pb.MausOutgoingMessage_MazeState:
			cmdChan <- cmd
		}

	}
}

func (m *Manager) startComRoutine(robotID string) {
	l := m.getLogger().With(zap.String("robot", robotID))

	if _, ok := m.robotComStopChan[robotID]; ok {
		close(m.robotComStopChan[robotID])
		l.Info("found old routine for robot, stopping")
	}

	// create routine channel
	r := make(chan int)
	m.robotComStopChan[robotID] = r

	// start send receive tasks
	go m.recvFromMausRoutine(robotID)
	go m.broadCastRoutine(robotID)

	l.Info("started new robot routine")
}

func (m *Manager) getLogger() *zap.Logger {
	return m.ctx.Value("log").(*zap.Logger)
}

func (m *Manager) onClientDashboardMsg(c *Client, msg *pb.DashboardClientMessage) error {

	log.Info("got dashboard message", zap.String("client", c.ID), zap.String("type", msg.String()))

	if payload := msg.GetSelectDevice(); payload != nil {
		r := m.Robots[payload.DeviceId]
		if r == nil {
			return errors.New("robot not found")
		}
		c.RobotID = payload.DeviceId
		if r, ok := m.Robots[c.RobotID]; ok {
			log.Info("selected robot", zap.String("client", c.ID), zap.String("robot", c.RobotID))

			err := c.sendMausSelectedOk()
			if err != nil {
				return err
			}

			// send initial robot config to server
			err = c.sendMausMsgToClient(&pb.MausOutgoingMessage{
				Payload: &pb.MausOutgoingMessage_MausConfig{
					MausConfig: r.Config,
				},
			})
			if err != nil {
				return err
			}
			return nil
		} else {
			log.Info("robot not found", zap.String("client", c.ID), zap.String("robot", c.RobotID))
			c.sendMausDisconnect()
		}
	}

	return nil
}

func (m *Manager) onClientMsg(c *Client) {
	l := m.getLogger().With(zap.String("client", c.ID))
	for {

		// Read message from browser
		_, msg, err := c.conn.ReadMessage()

		if err != nil {
			l.Error("failed to read message", zap.Binary("msg", msg), zap.Error(err))
			return
		}

		clientMsg := &pb.ClientMessage{}

		err = proto.Unmarshal(msg, clientMsg)
		if err != nil {
			l.Error("failed to unmarshal message", zap.Binary("msg", msg), zap.Error(err))
			return
		}

		switch clientMsg.Payload.(type) {
		case *pb.ClientMessage_Dashboard:
			err = m.onClientDashboardMsg(c, clientMsg.GetDashboard())
			if err != nil {
				l.Error("failed to parse proto message", zap.Error(err))
				return
			}
		case *pb.ClientMessage_Maus:
			r := m.Robots[c.RobotID]
			mausCmd := clientMsg.GetMaus()
			log.Info("got message", zap.String("client", c.ID), zap.String("type", mausCmd.String()))

			if r == nil {
				l.Error("failed to send message, robot not found", zap.String("robotID", c.RobotID))
				return

			}

			buf, err := proto.Marshal(mausCmd)
			if err != nil {
				l.Error("failed to encode proto message", zap.Error(err))
				return
			}

			n, err := r.com.Write(buf)
			if err != nil {
				l.Error("failed to send message to robot", zap.Error(err))
				return
			}

			l.Debug("sent message to robot", zap.Int("bytes", n))
		}
	}
}
