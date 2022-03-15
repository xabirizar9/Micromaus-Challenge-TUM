#pragma once
#include <freertos/FreeRTOS.h>
#include <freertos/queue.h>
#include <freertos/message_buffer.h>
#include <string>
#include <functional>
#include "message.pb.h"
#include "periph/NetController.hpp"

class WifiCommunicator : public NetController::Communicator
{
public:
    WifiCommunicator();

    ~WifiCommunicator();
};