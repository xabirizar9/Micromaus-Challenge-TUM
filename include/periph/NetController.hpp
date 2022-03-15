
#pragma once
#include <freertos/FreeRTOS.h>
#include <freertos/queue.h>
#include <string>
#include "message.pb.h"

namespace NetController
{
    void begin();

    template <typename T, int tag>
    void writePacket(T packet);

    void setIncomingPacketCallback(void (*callback)(MausIncomingMessage));
};
