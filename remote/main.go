package main

import (
	"net"
	"net/http"

	"go.uber.org/zap"
)

var (
	robotIP net.IP
	log, _  = zap.NewDevelopment()
)

func handleUDPConnection(conn *net.UDPConn) {
	// here is where you want to do stuff like read or write to client

	buffer := make([]byte, 1024)

	n, _, err := conn.ReadFromUDP(buffer)

	if err != nil {
		log.Error("failed to read maus IP", zap.Error(err))
		return
	}

	if n != 4 {
		log.Error("invalid maus address length", zap.Int("length", n))
		return
	}

	robotIP = (net.IP(buffer[:4]))
	log.Info("got maus IP", zap.String("ip", robotIP.String()))
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
			w.Write([]byte(robotIP.String()))
			w.WriteHeader(http.StatusOK)
		})

		log.Info("server started")

		http.ListenAndServe(":7777", nil)
	}()

	for {
		// wait for UDP client to connect
		handleUDPConnection(ln)
	}

}
