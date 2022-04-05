package main

import (
	"encoding/json"
	"fmt"
	"net"
	"net/http"

	"go.uber.org/zap"
)

var (
	robots map[string]net.IP = make(map[string]net.IP)
	log, _                   = zap.NewDevelopment()
)

func handleUDPConnection(conn *net.UDPConn) {
	// here is where you want to do stuff like read or write to client

	buffer := make([]byte, 1024)

	n, _, err := conn.ReadFromUDP(buffer)

	if err != nil {
		log.Error("failed to read maus IP", zap.Error(err))
		return
	}

	if n != 8 {
		log.Error("invalid maus address length", zap.Int("length", n))
		return
	}

	robotMac := fmt.Sprintf("%02X:%02X:%02X:%02X", buffer[0], buffer[1], buffer[2], buffer[3])
	robotIP := (net.IP(buffer[4:8]))

	log.Info("registered maus", zap.String("mac", robotMac), zap.String("ip", robotIP.String()))
	robots[robotMac] = robotIP
}

func main() {
	hostName := "0.0.0.0"
	portNum := "8888"
	service := hostName + ":" + portNum

	udpAddr, err := net.ResolveUDPAddr("udp4", service)

	if err != nil {
		log.Error("failed to open UDP steam", zap.Error(err))
		return
	}

	// setup listener for incoming UDP connection
	ln, err := net.ListenUDP("udp", udpAddr)

	if err != nil {
		log.Error("failed to open UDP steam", zap.Error(err))
		return
	}

	log.Info("UDP server up and listening on port 8888")

	defer ln.Close()

	go func() {

		// web socket handler
		http.HandleFunc("/maus", func(w http.ResponseWriter, r *http.Request) {
			l := log.With(
				zap.String("url", r.URL.String()),
				zap.String("ip", r.RemoteAddr),
			)
			l.Info("maus requested")

			type Robots struct {
				Robots map[string]net.IP `json:"robots"`
			}

			robots := Robots{
				Robots: robots,
			}

			buf, err := json.Marshal(robots)
			if err != nil {
				l.Error("failed to marshal robots", zap.Error(err))
				return
			}

			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)

			w.Write(buf)
		})

		log.Info("server started")

		http.ListenAndServe(":7777", nil)
	}()

	for {
		// wait for UDP client to connect
		handleUDPConnection(ln)
	}

}
