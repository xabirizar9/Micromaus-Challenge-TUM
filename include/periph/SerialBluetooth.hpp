#pragma once
#include <freertos/FreeRTOS.h>
#include <freertos/queue.h>
#include <string>
#include "message.pb.h"

namespace SerialBluetooth
{
    void begin(std::string name);

    template <typename T, int tag>
    void writePacket(T packet);

    void writeAck();
     
    void setIncomingPacketCallback(void (*callback)(MausIncomingMessage));
};
