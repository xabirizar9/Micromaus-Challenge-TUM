#include <freertos/FreeRTOS.h>
#include <freertos/task.h>
#include "sdkconfig.h"
#include "periph/Serial.hpp"

HardwareSerial ser(1, 3);

void main_task(void *pvParameter)
{
	while (true)
		ser.write("hallo\n");
}

extern "C" void app_main()
{

    xTaskCreate(&main_task, "main_task", configMINIMAL_STACK_SIZE, NULL, 5, NULL);
}
