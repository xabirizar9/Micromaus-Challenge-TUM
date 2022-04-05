package main

import (
	"flag"
	"fmt"
	"net/http"
	"os/exec"
	"runtime"
	"time"

	"github.com/gorilla/websocket"
	"go.uber.org/zap"
)

var (
	upgrader = websocket.Upgrader{}
	log, _   = zap.NewDevelopment()
)

func openbrowser(url string) {
	var err error

	switch runtime.GOOS {
	case "linux":
		err = exec.Command("xdg-open", url).Start()
	case "windows":
		err = exec.Command("rundll32", "url.dll,FileProtocolHandler", url).Start()
	case "darwin":
		err = exec.Command("open", url).Start()
	default:
		err = fmt.Errorf("unsupported platform")
	}
	if err != nil {
		log.Error("failed to open browser", zap.Error(err))
	}

}

func main() {
	var forceMDNS = flag.Bool("force-mdns", false, "if enabled only mDNS mouses will be discovered")
	flag.Parse()

	c := Config{}
	c.getConf()
	m := NewManager()
	// try connecting robot
	go func() {
		for {
			log.Info("connecting to robot...")
			r, err := NewRobot(log, RobotConnectionOptions{
				Baud:     115200,
				Dev:      "/dev/cu.MAUS_BT_SERIAL",
				Addr:     c.MausAddr,
				OnlyMDNS: *forceMDNS,
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
	// openbrowser("http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
