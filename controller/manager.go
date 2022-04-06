package main

import (
	"context"
	"errors"

	"github.com/google/uuid"
	"github.com/gorilla/websocket"
	pb "gitlab.lrz.de/waxn/micromaus/proto"
	"go.uber.org/zap"
	"google.golang.org/protobuf/proto"
)

type Manager struct {
	// currently connected robot
	Robot *Robot

	// currently connected web clients
	Clients map[string]*Client

	broadcastChannel chan *pb.MausOutgoingMessage

	ctx context.Context

	routineRunning bool
}

func NewManager() *Manager {
	return &Manager{
		Clients:          make(map[string]*Client),
		broadcastChannel: make(chan *pb.MausOutgoingMessage),
		ctx:              context.WithValue(context.TODO(), "log", log.With(zap.String("service", "manager"))),
		routineRunning:   false,
	}
}

func (m *Manager) AddClient(c *websocket.Conn) string {
	client := &Client{
		ID:   uuid.NewString(),
		conn: c,
	}

	m.Clients[client.ID] = client

	// send mouse config to newly registered client
	if m.Robot != nil && m.Robot.Config != nil {
		var msg pb.MausOutgoingMessage
		msg.Payload = &pb.MausOutgoingMessage_MausConfig{
			MausConfig: m.Robot.Config,
		}

		m.sendCmdToClient(client.ID, &msg)
	}
	// TODO: remove clients when connection is closed
	go m.onClientMsg(client)

	return client.ID
}

func (m *Manager) RegisterRobot(r *Robot) error {
	m.Robot = r

	err := r.Connect()
	if err != nil {
		return err
	}

	if !m.routineRunning {
		m.startComRoutine()
	}

	return nil
}

func (m *Manager) sendCmdToClient(ID string, cmd *pb.MausOutgoingMessage) error {
	l := m.getLogger()
	// re encode message
	buf, err := proto.Marshal(cmd)
	if err != nil {
		l.Error("failed to encode proto message", zap.Error(err))
		return err
	}

	if c, ok := m.Clients[ID]; ok {
		c.conn.WriteMessage(websocket.BinaryMessage, buf)
		if err != nil {
			l.Error("failed to write to client", zap.Error(err), zap.String("client", c.ID))
			return err
		}
		return nil
	} else {
		l.Error("client not found", zap.String("client", ID))
		return errors.New("client not found")
	}
}

func (m *Manager) broadCastRoutine() {
	l := m.getLogger().With(zap.String("robot", "MAUS"))
	for {
		cmd := <-m.broadcastChannel
		// re encode message
		buf, err := proto.Marshal(cmd)
		if err != nil {
			l.Error("failed to encode proto message", zap.Error(err))
			continue

		}
		// send message to all clients
		for _, c := range m.Clients {
			c.conn.WriteMessage(websocket.BinaryMessage, buf)
			if err != nil {
				l.Error("failed to write to client", zap.Error(err), zap.String("client", c.ID))
				continue

			}
		}
	}
}

func (m *Manager) recvFromMausRoutine() {
	l := m.getLogger().With(zap.String("robot", "MAUS"))
	r := m.Robot
	for {
		if r == nil {
			l.Info("robot disconnected stopping transmission")
			return
		}

		cmd := <-r.IncomingMsg
		l.Info("got message", zap.String("type", cmd.String()))

		switch cmd.Payload.(type) {
		case *pb.MausOutgoingMessage_MausConfig:
			l.Info("received config from robot")
			// store mouse config
			m.Robot.Config = cmd.GetMausConfig()
			m.broadcastChannel <- cmd
		case *pb.MausOutgoingMessage_Nav:
			l.Info("got nav packet")
			m.broadcastChannel <- cmd
		case *pb.MausOutgoingMessage_MazeState:
			m.broadcastChannel <- cmd
		}

	}
}

func (m *Manager) startComRoutine() {
	l := m.getLogger().With(zap.String("robot", "MAUS"))
	m.routineRunning = true
	l.Debug("reading command from server")

	// start send receive tasks
	go m.recvFromMausRoutine()
	go m.broadCastRoutine()

	m.routineRunning = true
}

func (m *Manager) getLogger() *zap.Logger {
	return m.ctx.Value("log").(*zap.Logger)
}

func (m *Manager) onClientMsg(c *Client) {
	l := m.getLogger().With(zap.String("client", c.ID))
	for {
		// Read message from browser
		_, msg, err := c.conn.ReadMessage()

		if err != nil {
			l.Error("failed to read message", zap.Error(err))
			return
		}

		outMsg := &pb.MausOutgoingMessage{}

		err = proto.Unmarshal(msg, outMsg)
		if err != nil {
			l.Error("failed to parse proto message", zap.Error(err))
			return
		}

		n, err := m.Robot.com.Write(msg)
		if err != nil {
			l.Error("failed to send message to robot", zap.Error(err))
			return
		}

		l.Debug("sent message to robot", zap.Int("bytes", n))
	}
}
