package main

import (
	"net/http"
	"time"

	"github.com/gorilla/websocket"
	"go.uber.org/zap"
)

var (
	upgrader = websocket.Upgrader{}
	log, _   = zap.NewDevelopment()
)

func main() {
	c := Config{}
	c.getConf()
	m := NewManager()
	// try connecting robot
	go func() {
		for {
			log.Info("connecting to robot...")
			r, err := NewRobot(log, RobotConnectionOptions{
				Baud: 115200,
				Dev:  "/dev/cu.MAUS_BT_SERIAL",
				Addr: c.MausAddr,
			})
			if err != nil {

				time.Sleep(1 * time.Second)
				continue
			}

			err = m.RegisterRobot(r)
			if err != nil {
				time.Sleep(1 * time.Second)
				continue
			}

			log.Info("connected to robot")

			return
		}
	}()

	// serve static assets
	fs := http.FileServer((http.Dir("./frontend/dist")))
	http.Handle("/", fs)

	// web socket handler
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		l := log.With(
			zap.String("url", r.URL.String()),
			zap.String("ip", r.RemoteAddr),
		)
		l.Info("websocket request")

		conn, err := upgrader.Upgrade(w, r, nil)

		if err != nil {
			return
		}

		id := m.AddClient(conn)

		l.Debug("client added", zap.String("id", id))
	})

	log.Info("server started")

	http.ListenAndServe(":8080", nil)
}
