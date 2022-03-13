#include <freertos/FreeRTOS.h>
#include <freertos/task.h>
#include "sdkconfig.h"
#include "periph/Encoder.hpp"
#include "esp_log.h"

#include "periph/SerialBluetooth.hpp"

Encoder e(22, 23);

static const char *TAG = "test";

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
    {
        // int i = e.get();
        // ESP_LOGI("x", "%d", i);
        vTaskDelay(pdMS_TO_TICKS(50));
    }
}

extern "C" void app_main()
{
    SerialBluetooth::begin("bla");
    esp_log_level_set(TAG, ESP_LOG_INFO);
    xTaskCreate(&main_task, "main_task", 2048, NULL, 5, NULL);
}
