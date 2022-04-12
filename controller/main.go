package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"net/http"
	"os/exec"
	"runtime"
	"time"

	"gitlab.lrz.de/waxn/micromaus/remote"

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

	// only search for mDNS if explicitly enabled, this does not make sense on the server
	if *forceMDNS {
		// try connecting robot
		go func() {
			for {
				log.Info("connecting to robot...")
				r, err := NewRobot(log, RobotConnectionOptions{
					Baud: 0,
					Dev:  "waxn-robot.local",
					Addr: c.MausAddr,
				})
				if err != nil {
					log.Info("low level connection failed", zap.Error(err), zap.String("addr", c.MausAddr))
					time.Sleep(1 * time.Second)
					continue
				}

				err = m.RegisterRobot(r)
				if err != nil {
					log.Info("register failed", zap.Error(err), zap.String("addr", c.MausAddr))
					time.Sleep(1 * time.Second)
					continue
				}

				log.Info("connected to robot")

				return
			}
		}()
	} else {
		// listen for robot registration
		remote.HandleRobotRegisteredFunc("/maus", ":8888", func(addr remote.RobotAddr) {
			// try connecting multiple times
			for {
				log.Info("registered maus", zap.String("mac", addr.Mac), zap.String("ip", addr.PublicIP.String()))
				r, err := NewRobot(log, RobotConnectionOptions{
					Baud: 0,
					Dev:  addr.Mac,
					Addr: addr.PublicIP.String() + ":8888",
				})
				if err != nil {
					log.Error("failed to register", zap.Error(err))
					time.Sleep(1 * time.Second)
					continue
				}

				err = m.RegisterRobot(r)
				if err != nil {
					log.Error("failed to register", zap.Error(err))
					time.Sleep(1 * time.Second)
					continue
				}

				log.Info("connected to robot")

				return
			}
		})
	}

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
		conn.SetCloseHandler(func(code int, text string) error {
			l.Info("websocket closed", zap.Int("code", code), zap.String("text", text))
			return nil
		})
		if err != nil {
			return
		}

		m.RunWebSocketClient(conn)

	})

	http.HandleFunc("/maus", func(w http.ResponseWriter, r *http.Request) {
		type MausInfo struct {
			ID  string `json:"id"`
			Mac string `json:"mac"`
			IP  string `json:"ip"`
		}
		type MausList struct {
			Items []MausInfo `json:"maus"`
		}

		data := MausList{
			Items: make([]MausInfo, len(m.Robots)),
		}
		i := 0
		for k, v := range m.Robots {
			data.Items[i] = MausInfo{
				Mac: v.ID,
				IP:  v.InterfaceAddr,
				ID:  k,
			}
			i++
		}

		w.Header().Set("Content-Type", "application/json")
		buf, err := json.Marshal(data)
		if err != nil {
			log.Error("failed to marshal robots", zap.Error(err))
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)

		w.Write(buf)
	})

	log.Info("server started")
	http.ListenAndServe("0.0.0.0:8080", nil)
}
