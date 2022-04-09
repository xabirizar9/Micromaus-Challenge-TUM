package main

import (
	"context"

	"github.com/gorilla/websocket"
	pb "gitlab.lrz.de/waxn/micromaus/proto"
	"go.uber.org/zap"
	"google.golang.org/protobuf/proto"
)

// Client is a middleman between the websocket connection and the hub.
type Client struct {
	ID string

	// robot the client is listening to
	RobotID string

	// The websocket connection.
	conn *websocket.Conn

	// Buffered channel of outbound messages.
	send chan []byte

	ctx context.Context
}

func NewClient(conn *websocket.Conn, ID string) *Client {
	return &Client{
		ID:   ID,
		conn: conn,
		send: make(chan []byte, 1024),
		ctx:  context.WithValue(context.Background(), "log", log.With(zap.String("service", "client"), zap.String("clientID", ID))),
	}
}

func (c *Client) getLogger() *zap.Logger {
	return c.ctx.Value("log").(*zap.Logger)
}

func (c *Client) sendDashboardMsgToClient(cmd *pb.DashboardServerMessage) error {
	msg := &pb.ServerMessage{
		Payload: &pb.ServerMessage_Dashboard{
			Dashboard: cmd,
		},
	}
	return c.sendCmdToClient(msg)
}

func (c *Client) sendMausMsgToClient(cmd *pb.MausOutgoingMessage) error {
	msg := &pb.ServerMessage{
		Payload: &pb.ServerMessage_Maus{
			Maus: cmd,
		},
	}
	return c.sendCmdToClient(msg)
}

func (c *Client) sendCmdToClient(cmd *pb.ServerMessage) error {
	l := c.getLogger()
	// re encode message
	buf, err := proto.Marshal(cmd)
	if err != nil {
		l.Error("failed to encode proto message", zap.Error(err))
		return err
	}

	c.conn.WriteMessage(websocket.BinaryMessage, buf)
	if err != nil {
		l.Error("failed to write to client", zap.Error(err), zap.String("client", c.ID))
		return err
	}
	return nil

}

func (c *Client) sendMausDisconnect() error {
	return c.sendDashboardMsgToClient(&pb.DashboardServerMessage{
		Payload: &pb.DashboardServerMessage_DeviceLost{
			DeviceLost: &pb.DeviceLostMessage{},
		},
	})
}

func (c *Client) sendMausSelectedOk() error {
	return c.sendDashboardMsgToClient(&pb.DashboardServerMessage{
		Payload: &pb.DashboardServerMessage_Selected{
			Selected: &pb.DeviceSelected{},
		},
	})
}
