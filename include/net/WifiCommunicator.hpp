#pragma once
#include <freertos/FreeRTOS.h>
#include <freertos/message_buffer.h>
#include <freertos/queue.h>
#include <lwip/netdb.h>

#include <functional>
#include <string>

#include "lwip/err.h"
#include "lwip/sockets.h"
#include "lwip/sys.h"
#include "message.pb.h"
#include "net/NetController.hpp"

class UdpCommunicator {
   private:
	int sock = -1;
	struct sockaddr_storage sourceAddr;
	socklen_t socklen = sizeof(sourceAddr);

	// TODO: remove single UDP address also switch to IPv4
	char addrTmp[128];

   public:
	UdpCommunicator(uint16_t port = 8888);

	~UdpCommunicator();

	int read(uint8_t *buf, size_t bufLen);
	int write(uint8_t *buf, size_t msgLen);
};
class WifiCommunicator : public NetController::Communicator {
   public:
	static WifiCommunicator &getInstance() {
		static WifiCommunicator instance;
		return instance;
	}
	UdpCommunicator *com;

   private:
	WifiCommunicator();

	~WifiCommunicator();
};