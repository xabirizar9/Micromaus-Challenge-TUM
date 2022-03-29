package main

import (
	"fmt"
	"log"
	"net"
)

var (
	robotIP net.IP
)

func handleUDPConnection(conn *net.UDPConn) {
	// here is where you want to do stuff like read or write to client

	buffer := make([]byte, 1024)

	n, addr, err := conn.ReadFromUDP(buffer)

	if err != nil {
		log.Fatal(err)
	}

	if n != 4 {
		fmt.Println("Invalid UDP IP packet")
		return
	}

	robotIP = (net.IP(buffer[:4]))
	fmt.Println(robotIP.String())
}

func main() {
	hostName := "0.0.0.0"
	portNum := "8888"
	service := hostName + ":" + portNum

	udpAddr, err := net.ResolveUDPAddr("udp4", service)

	if err != nil {
		log.Fatal(err)
	}

	// setup listener for incoming UDP connection
	ln, err := net.ListenUDP("udp", udpAddr)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("UDP server up and listening on port 8888")

	defer ln.Close()

	for {
		// wait for UDP client to connect
		handleUDPConnection(ln)
	}

}
