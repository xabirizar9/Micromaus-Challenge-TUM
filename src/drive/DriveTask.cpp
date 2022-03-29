#include "drive/DriveTask.hpp"

#include "Controller.hpp"
#include "MazeExplorer.hpp"
#include "freertos/FreeRTOS.h"
#include "freertos/queue.h"
#include "periph/Motor.hpp"

void driveTask(void *arg) {
	RobotDriver *driver = (RobotDriver *)arg;
	uint16_t navInterval = 100;
	NavigationPacket state;
	Controller *controller = driver->controller;
	QueueHandle_t execQueue = driver->executionQueue;

	DriveCommand cmd;
	DriveCommand *curCmd;

	bool working = false;

	while (true) {
		// update and get state
		controller->updateSensors();
		controller->updatePosition();
		state = controller->getState();

		if (curCmd == NULL) {
			if (xQueueReceive(execQueue, &cmd, 0)) {
				curCmd = &cmd;
			} else {
				vTaskDelay(pdMS_TO_TICKS(navInterval));
				continue;
			}
		}

		// switch (cmd.type) {
		// 	case DriveCommandType::move: break;
		// }

		curCmd = NULL;

		vTaskDelay(pdMS_TO_TICKS(navInterval));
	}
}