
#include <stdint.h>
#include <string.h>
#include <stdbool.h>
#include <stdio.h>
#include "time.h"
#include "sys/time.h"
#include "esp_log.h"

#include "periph/SerialBluetooth.hpp"
#include "periph/BluetoothCore.hpp"
#include "config.h"

using namespace SerialBluetooth;

#define BT_COM_TAG "BT_COM"

static void onIncomingMessage(MausIncomingMessage *msg)
{
    ESP_LOGI(BT_COM_TAG, "got message");
};

/**
 * @brief begin bluetooth advertising with given name
 *
 * @param name
 */
void SerialBluetooth::begin(std::string name)
{
    ESP_LOGI(BT_COM_TAG, "Initializing SPP...");
    BluetoothCore::setup(onIncomingMessage);
};

void SerialBluetooth::write(char test){};