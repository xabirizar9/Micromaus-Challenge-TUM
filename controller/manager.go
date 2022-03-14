package main

import (
	"context"

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

	ctx context.Context
}

func NewManager() *Manager {
	return &Manager{
		Clients: make(map[string]*Client),

		ctx: context.WithValue(context.TODO(), "log", log.With(zap.String("service", "manager"))),
	}
}

func (m *Manager) getLogger() *zap.Logger {
	return m.ctx.Value("log").(*zap.Logger)
}

func (m *Manager) RegisterRobot(r *Robot) error {
	l := m.getLogger().With(zap.String("robot", "MAUS"))
	m.Robot = r

	err := r.StartInitSequence()
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

			cmd, err := r.ReadCmd()
			if err != nil {
				l.Error("failed to read command", zap.Error(err))
				return
			}

			switch msg := cmd.Payload.(type) {
			case *pb.MausOutgoingMessage_SensorData:

				l.Info("sensor cmd (dynamic):",
					zap.Int("left", int(msg.SensorData.Left)),
					zap.Int("front", int(msg.SensorData.Front)),
					zap.Int("right", int(msg.SensorData.Right)),
				)
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

		l.Debug("got client message, TODO: implement")

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
