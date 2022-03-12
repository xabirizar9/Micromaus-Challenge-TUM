#pragma once
#include <freertos/FreeRTOS.h>
#include <freertos/queue.h>
#include <string>
#include <functional>
#include "message.pb.h"

namespace BluetoothCore
{

    /**
     * @brief
     *
     * @return true setup okay
     * @return false setup failed
     */
    bool setup(void (*handler)(MausIncomingMessage *));
}