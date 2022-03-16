#include <freertos/FreeRTOS.h>
#include <freertos/task.h>

#include "esp_log.h"
#include "periph/Encoder.hpp"
#include "periph/NetController.hpp"
#include "periph/WifiCommunicator.hpp"
#include "sdkconfig.h"

Encoder e(16, 17);

static const char* TAG = "test";

void navigate(void* pvParameter) {
	while (true) {
		ESP_LOGD(TAG, "navigating");
		vTaskDelay(20 / portTICK_PERIOD_MS);
	};
};

void main_task(void* pvParameter) {
	while (true) {
		int i = e.get();
		ESP_LOGI("x", "%d", i);
		vTaskDelay(pdMS_TO_TICKS(2000));
	}
}
// NetController::Manager &netManager = NULL;

extern "C" void app_main() {
	// WifiCommunicator::getInstance();

	esp_log_level_set(TAG, ESP_LOG_INFO);
	xTaskCreate(&main_task, "main_task", 2048, NULL, 5, NULL);
}
