#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "sdkconfig.h"
#include "sensors.hpp"
#include "periph/Serial.hpp"

void main_task(void *pvParameter)
{
    Serial.begin(115200, 0);
    // TODO: place code here
    Sensors::someMethod();
}

extern "C" void app_main()
{

    xTaskCreate(&main_task, "main_task", configMINIMAL_STACK_SIZE, NULL, 5, NULL);
}