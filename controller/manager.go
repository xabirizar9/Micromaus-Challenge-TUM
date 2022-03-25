package main

import (
	"context"
	"fmt"

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
}

func NewManager() *Manager {
	return &Manager{
		Clients:          make(map[string]*Client),
		broadcastChannel: make(chan *pb.MausOutgoingMessage),
		ctx:              context.WithValue(context.TODO(), "log", log.With(zap.String("service", "manager"))),
	}
}

func (m *Manager) getLogger() *zap.Logger {
	return m.ctx.Value("log").(*zap.Logger)
}

func (m *Manager) RegisterRobot(r *Robot) error {
	l := m.getLogger().With(zap.String("robot", "MAUS"))
	m.Robot = r

	err := r.Connect()
	if err != nil {
		return err
	}

	l.Debug("reading command from server")

	go func() {
		for {
			if r.Status == Disconnected {
				l.Info("robot disconnected stopping transmission")
				return
			}

			cmd := <-r.IncomingMsg

			switch msg := cmd.Payload.(type) {
			case *pb.MausOutgoingMessage_Nav:
				fmt.Printf(".")
				l.Debug("nav package:",
					zap.String("content", msg.Nav.String()),
				)
				m.broadcastChannel <- cmd
			}

		}
	}()

	// start client broadcast
	go func() {
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
	}()

	// start client broadcast
	go func() {
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
	}()

	l.Debug("send init packet to robot")

	return nil
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

func (m *Manager) AddClient(c *websocket.Conn) string {
	client := &Client{
		ID:   uuid.NewString(),
		conn: c,
	}

	m.Clients[client.ID] = client

	// TODO: remove clients when connection is closed
	go m.onClientMsg(client)

	return client.ID
}

func (m *Manager) Run() {

}
