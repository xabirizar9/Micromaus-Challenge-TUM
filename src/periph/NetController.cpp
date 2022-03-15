
#include <stdint.h>
#include <string.h>
#include <stdbool.h>
#include <stdio.h>
#include <math.h>

#include "freertos/FreeRTOS.h"
#include "freertos/queue.h"
#include "freertos/message_buffer.h"
#include "sys/time.h"
#include "esp_log.h"

#include "pb_decode.h"
#include "pb_encode.h"
#include "message.pb.h"

#include "periph/NetController.hpp"
// TODO: add toggle
// #include "periph/BluetoothCore.hpp"
#include "periph/WifiCore.hpp"
#include "config.h"

using namespace NetController;

#define NET_COM_TAG "NET"

bool initCompleted = false;

/**
 * @brief send a command to the BT SPP sender queue
 *
 * @param msg message to send
 * @return true msg was added to the sender queue
 * @return false queue not initialized
 */
bool writeCmd(MausOutgoingMessage *msg)
{
    QueueHandle_t queue = WifiCore::getCmdSenderQueue();
    if (queue == NULL)
    {
        ESP_LOGI(NET_COM_TAG, "not initialized");
        return false;
    };

    xQueueSend(queue, msg, 0);
    return true;
};

template <typename T, int tag>
void NetController::writePacket(T packet)
{
    MausOutgoingMessage msg = MausOutgoingMessage_init_zero;
    msg.which_payload = tag;
    *reinterpret_cast<T *>(&msg.payload) = packet;

    ESP_LOGD(NET_COM_TAG, "x %f y %f", msg.payload.nav.position.x, msg.payload.nav.position.y);

    writeCmd(&msg);
};

void receiverTask(void *pvParameter)
{
    uint16_t msgLen = 0;
    uint8_t buffer[256];
    MausIncomingMessage msg = MausIncomingMessage_init_default;
    MessageBufferHandle_t msgBuffer = WifiCore::getCmdReceiverMsgBuffer();
    ESP_LOGI(NET_COM_TAG, "receiverTask started");

    while (true)
    {
        if (msgBuffer == NULL)
        {
            ESP_LOGD(NET_COM_TAG, "not initialized");
            vTaskDelay(pdMS_TO_TICKS(20));
            continue;
        }
        msgLen = xMessageBufferReceive(msgBuffer, buffer, sizeof(buffer), 0);
        if (msgLen == 0)
        {
            // ESP_LOGI(NET_COM_TAG, "queue empty");
            vTaskDelay(pdMS_TO_TICKS(20));
            continue;
        }
        ESP_LOGD(NET_COM_TAG, "persed incoming msg");

        pb_istream_t stream = pb_istream_from_buffer(buffer, msgLen);
        if (!pb_decode(&stream, MausIncomingMessage_fields, &msg))
        {
            ESP_LOGE(NET_COM_TAG, "failed to decode: %s", PB_GET_ERROR(&stream));
            continue;
        }

        switch (msg.which_payload)
        {
        case MausIncomingMessage_init_tag:
            ESP_LOGI(NET_COM_TAG, "connected to connector v.%d", msg.payload.init.version);
            // TODO: improve memory management
            NetController::writePacket<AckPacket, MausOutgoingMessage_ack_tag>(AckPacket_init_zero);
            initCompleted = true;
            break;
        }
    }
}

void testTask(void *pvParameter)
{
    uint8_t i = 0;

    NavigationPacket packet = NavigationPacket_init_zero;
    packet.has_position = true;
    packet.has_sensors = true;
    packet.position = Position_init_zero;
    packet.sensors = SensorPacket_init_zero;

    while (true)
    {
        // TODO: replace with actual position data
        packet.position.x = sin((float)i / 10.0);
        packet.position.y = cos((float)i / 10.0);
        packet.sensors.left = ((float)rand() / (float)(RAND_MAX)) * 2;
        packet.sensors.front = ((float)rand() / (float)(RAND_MAX)) * 2;
        packet.sensors.right = ((float)rand() / (float)(RAND_MAX)) * 2;

        if (initCompleted)
        {
            NetController::writePacket<NavigationPacket, MausOutgoingMessage_nav_tag>(packet);
            i++;
        }
        vTaskDelay(pdMS_TO_TICKS(200));
    }
}

/**
 * @brief begin bluetooth advertising with given name
 *
 * @param name
 */
void NetController::begin()
{

    ESP_LOGI(NET_COM_TAG, "Initializing SPP...");
    WifiCore::setup();

    xTaskCreate(receiverTask, "receiverTask", 2048, NULL, 5, NULL);
    xTaskCreate(testTask, "testTask", 2048, NULL, 5, NULL);
};