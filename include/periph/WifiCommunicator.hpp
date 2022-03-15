#pragma once
#include <freertos/FreeRTOS.h>
#include <freertos/queue.h>
#include <freertos/message_buffer.h>
#include <string>
#include <functional>
#include "message.pb.h"
#include "periph/NetController.hpp"

#include "lwip/err.h"
#include "lwip/sockets.h"
#include "lwip/sys.h"
#include <lwip/netdb.h>

class UdpCommunicator
{
private:
    int rxSock = -1;
    int txSock = -1;

public:
    UdpCommunicator(const char *ipAddrV4, int port);

    bool send(uint8_t *payload, int len);
    bool recv(uint8_t *buffer);
};
class WifiCommunicator : public NetController::Communicator
{
public:
    static WifiCommunicator &getInstance()
    {
        static WifiCommunicator instance;
        return instance;
    }

private:
    // UdpCommunicator udpCom;

    WifiCommunicator();

    ~WifiCommunicator();
};