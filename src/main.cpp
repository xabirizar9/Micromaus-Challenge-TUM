#include <stdio.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "sdkconfig.h"

void main_task(void *pvParameter)
{
    // TODO: place code here
}

void app_main()
{
    xTaskCreate(&main_task, "main_task", configMINIMAL_STACK_SIZE, NULL, 5, NULL);
}