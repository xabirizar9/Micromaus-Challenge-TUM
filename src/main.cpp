#include <freertos/FreeRTOS.h>
#include <freertos/task.h>

#include "Controller.hpp"
#include "config.h"
#include "esp_log.h"
#include "net/NetController.hpp"
#include "net/WifiCommunicator.hpp"
#include "periph/Encoder.hpp"
#include "periph/Power.hpp"
#include "sdkconfig.h"

static const char* TAG = "test";

void navigate(void* pvParameter) {
	while (true) {
		ESP_LOGD(TAG, "navigating");
		vTaskDelay(20 / portTICK_PERIOD_MS);
	};
};

NetController::Manager* netManager = NULL;
Controller* mainController = NULL;

extern "C" void app_main() {
	// configure logging and other pre-run setup
	esp_log_level_set(TAG, ESP_LOG_DEBUG);

	// enable if you want network streaming
	// netManager = new NetController::Manager(WifiCommunicator::getInstance());

	// start main robot controller interface with motors and encoders
	mainController = new Controller();
	mainController->drive(20, 0);
}
