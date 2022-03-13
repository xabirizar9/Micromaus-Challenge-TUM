
#include <stdint.h>
#include <string.h>
#include <stdbool.h>
#include <stdio.h>
#include "freertos/FreeRTOS.h"
#include "freertos/queue.h"
#include "sys/time.h"
#include "esp_log.h"

#include "pb_decode.h"
#include "pb_encode.h"
#include "message.pb.h"

#include "periph/SerialBluetooth.hpp"
#include "periph/BluetoothCore.hpp"
#include "config.h"

using namespace SerialBluetooth;

#define BT_COM_TAG "BT_COM"

uint8_t buf[256];
MausIncomingMessage msg;
// Read in buffer
pb_istream_t istream;

void receiverTask(void *pvParameter)
{
    uint8_t buf[256];
    QueueHandle_t queue = BluetoothCore::getCmdReceiverQueue();
    ESP_LOGI(BT_COM_TAG, "receiverTask started");
    while (true)
    {
        if (queue == NULL)
        {
            ESP_LOGI(BT_COM_TAG, "not initialized");
            vTaskDelay(pdMS_TO_TICKS(20));
            continue;
        }
        if (!xQueueReceive(queue, &buf, 0))
        {
            // ESP_LOGI(BT_COM_TAG, "queue empty");
            vTaskDelay(pdMS_TO_TICKS(20));
            continue;
        }
        ESP_LOGI(BT_COM_TAG, "persed incoming msg");

        /*pb_istream_from_buffer((pb_byte_t *)buf, sizeof(MausIncomingMessage));

        if (!pb_decode(&istream, MausIncomingMessage_fields, &msg))
        {
            ESP_LOGE(BT_COM_TAG, "failed to decode: %s", PB_GET_ERROR(&istream));
            continue;
        }

        ESP_LOGD(BT_COM_TAG, "persed incoming msg");
        esp_log_buffer_hex("", &msg, sizeof(MausIncomingMessage));*/
        vTaskDelay(pdMS_TO_TICKS(20));
    }
}

void testTask(void *pvParameter)
{
    while (true)
    {
        SerialBluetooth::write('c');
        vTaskDelay(pdMS_TO_TICKS(2000));
    }
}

/**
 * @brief begin bluetooth advertising with given name
 *
 * @param name
 */
void SerialBluetooth::begin(std::string name)
{
    ESP_LOGI(BT_COM_TAG, "Initializing SPP...");
    BluetoothCore::setup();

    xTaskCreate(receiverTask, "receiverTask", 2048, NULL, 5, NULL);
    xTaskCreate(testTask, "testTask", 2048, NULL, 5, NULL);
};

uint8_t buffer[128];

void SerialBluetooth::write(char in)
{
    ESP_LOGI(BT_COM_TAG, "w: %c", in);

    QueueHandle_t queue = BluetoothCore::getCmdSenderQueue();
    MausOutgoingMessage test = MausOutgoingMessage_init_zero;
    test.msgSensor = SensorPacket_init_zero;
    test.type = MsgType_SensorData;
    test.msgSensor.left = 1;
    test.msgSensor.front = 2;
    test.msgSensor.right = 3;
    // pb_ostream_t stream = pb_ostream_from_buffer(buffer, sizeof(buffer));

    // pb_ostream_from_buffer((pb_byte_t *)buf, sizeof(MausIncomingMessage));

    // bool status = pb_encode(&stream, MausOutgoingMessage_fields, &test);

    // if (!status)
    // {
    //     ESP_LOGE(BT_COM_TAG, "failed to encode: %s", PB_GET_ERROR(&istream));
    //     return;
    // }

    // ESP_LOG_BUFFER_HEX(BT_COM_TAG, &buffer, stream.bytes_written);
    if (queue == NULL)
    {
        ESP_LOGI(BT_COM_TAG, "not initialized");
        return;
    }
    xQueueSend(queue, &test, 0);
};