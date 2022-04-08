package remote

import (
	"errors"
	"fmt"
	"net"

	"go.uber.org/zap"
)

type RobotAddr struct {
	PrivateIP net.IP
	PublicIP  net.IP
	Mac       string
}

var (
	robots map[string]RobotAddr = make(map[string]RobotAddr)
	log, _                      = zap.NewDevelopment()
)

func handleUDPConnection(conn *net.UDPConn) (roboAddr RobotAddr, err error) {
	// here is where you want to do stuff like read or write to client

	buffer := make([]byte, 1024)

	n, addr, err := conn.ReadFromUDP(buffer)
	if err != nil {
		err = errors.New("failed to read from UDP stream")
		log.Error("failed to read maus IP", zap.Error(err))
		return
	}

	if n != 8 {
		err = errors.New("invalid maus registration packet length")
		log.Error("invalid maus address length", zap.Int("length", n))
		return
	}

	robotMac := fmt.Sprintf("%02X:%02X:%02X:%02X", buffer[0], buffer[1], buffer[2], buffer[3])
	robotIP := (net.IP(buffer[4:8]))

	log.Info("registered maus", zap.String("mac", robotMac), zap.String("ip", robotIP.String()))
	roboAddr = RobotAddr{
		PrivateIP: robotIP,
		PublicIP:  addr.IP,
		Mac:       robotMac,
	}
	robots[robotMac] = roboAddr
	return
}

func HandleRobotRegisteredFunc(url string, port string, f func(addr RobotAddr)) (stopchan chan struct{}, err error) {
	hostName := "0.0.0.0"
	service := hostName + port

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

	log.Info("UDP server up and listening", zap.String("port", port), zap.String("url", url), zap.String("addr", udpAddr.String()))
	stopchan = make(chan struct{})

	go func() {
		defer ln.Close()
		for {
			select {
			case <-stopchan:
				return
			default:
				log.Info("waiting for UDP connection")
				// wait for UDP client to connect
				addr, err := handleUDPConnection(ln)
				if err != nil {
					log.Error("failed to handle UDP connection", zap.Error(err))
					continue
				}
				f(addr)
			}
		}
	}()

	return
}
