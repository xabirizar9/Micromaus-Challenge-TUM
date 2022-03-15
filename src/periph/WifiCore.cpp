#include <stdint.h>
#include <string.h>
#include <stdbool.h>
#include <stdio.h>

#include "freertos/FreeRTOS.h"
#include "freertos/queue.h"
#include "freertos/task.h"
#include "freertos/message_buffer.h"
#include "nvs.h"
#include "nvs_flash.h"
#include "esp_log.h"

#include "pb_decode.h"
#include "pb_encode.h"
#include "message.pb.h"

#include "periph/WifiCore.hpp"

#define WIFI_CORE_TAG "WIFI_CORE"
#define BSSID "maus-wifi"
#define PASSWD "12345678"

using namespace WifiCore;

QueueHandle_t cmdSenderQueue;
MessageBufferHandle_t cmdReceiverMsgBuffer;
TaskHandle_t senderTaskHandle;

bool WifiCore::setup()
{
    // TODO: implement me
    return true;
}

void WifiCore::teardown()
{
    // TODO: implement
}

MessageBufferHandle_t WifiCore::getCmdReceiverMsgBuffer()
{
    return cmdReceiverMsgBuffer;
}

QueueHandle_t WifiCore::getCmdSenderQueue()
{
    return cmdSenderQueue;
}