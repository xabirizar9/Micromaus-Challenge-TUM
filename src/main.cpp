#include <freertos/FreeRTOS.h>
#include <freertos/task.h>
#include "sdkconfig.h"
#include "periph/Serial.hpp"
#include "periph/SerialBluetooth.hpp"
#include "esp_log.h"

// import nanopb
#include "pb_encode.h"
#include "pb_decode.h"
#include "message.pb.h"

static const char *TAG = "MAIN";
static const char *VERSION = "0.0.1";

HardwareSerial ser(1, 3);

void print_sensor_data(void *pvParameter)
{
    // 20ms delay
    const TickType_t xDelay = 20 / portTICK_PERIOD_MS;

    for (;;)
    {
        SerialBluetooth::write('c');
        vTaskDelay(xDelay);
    }
}

void navigate(void *pvParameter)
{
    while (true)
    {
        ESP_LOGD(TAG, "navigating");
        vTaskDelay(20 / portTICK_PERIOD_MS);
    };
};

void main_task(void *pvParameter)
{
    while (true)
        ser.write("hallo\n");
}

extern "C" void app_main()
{
    // Serial.begin(115200, 0);
    // esp_log_level_set(LOG_DEFAULT_LEVEL_VERBOSE);
    // SerialBluetooth::begin("test");

    // xTaskCreate(&main_task, "main_task", configMINIMAL_STACK_SIZE, NULL, 5, NULL);

    xTaskCreate(&print_sensor_data, "print_sensor_data", configMINIMAL_STACK_SIZE, NULL, 5, NULL);

    xTaskCreate(&navigate, "path_navigation", 512, NULL, 5, NULL);
}
