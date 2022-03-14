#pragma once
#include <freertos/FreeRTOS.h>
#include <freertos/queue.h>
#include <string>
#include "message.pb.h"

namespace SerialBluetooth
{
    void begin(std::string name);

    void writeSensorData(SensorPacket packet);
};
