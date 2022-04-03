#include <freertos/FreeRTOS.h>
#include <freertos/task.h>

#include "Controller.hpp"
#include "config.h"
#include "esp_log.h"
#include "nav/MazeSolver.hpp"
#include "nav/RobotDriver.hpp"
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

// FIXME: @wlad move somewhere else
MazeSolver* explorer = NULL;

extern "C" void app_main() {
	// configure logging and other pre-run setup
	esp_log_level_set(TAG, ESP_LOG_DEBUG);

	// enable if you want network streaming

	// start main robot controller interface with motors and encoders
	mainController = new Controller();

	netManager = new NetController::Manager(WifiCommunicator::getInstance());
	// pass controller to remote controller
	netManager->controller = mainController;

	explorer = new MazeSolver(mainController);

	// mainController->turnOnSpot(0.5 * 3.1416, 50);
}
