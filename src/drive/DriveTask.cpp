#include "drive/DriveTask.hpp"

#include "Controller.hpp"
#include "freertos/FreeRTOS.h"
#include "freertos/queue.h"
#include "message.pb.h"
#include "nav/MazeSolver.hpp"
#include "periph/Motor.hpp"

void driveTask(void *arg) {
	RobotDriver *driver = (RobotDriver *)arg;
	uint16_t navInterval = 40;
	NavigationPacket state;
	Controller *controller = driver->controller;
	QueueHandle_t execQueue = driver->executionQueue;

	MsgDrive cmd;
	MsgDrive *curCmd;

	while (true) {
		// update and get state
		controller->updateSensors();
		controller->updatePosition();
		state = controller->getState();

		if (curCmd == NULL) {
			if (xQueueReceive(execQueue, &cmd, 0)) {
				curCmd = &cmd;
				xEventGroupSetBits(driver->eventHandle, DRIVE_EVT_STARTED_BIT);
			} else {
				vTaskDelay(pdMS_TO_TICKS(navInterval));
				continue;
			}
		}

		// switch (cmd.type) {
		// 	case DriveCommandType::move: break;
		// }

		curCmd = NULL;

		// TODO: send this event when command is completed
		xEventGroupSetBits(driver->eventHandle, DRIVE_EVT_COMPLETED_BIT);

		vTaskDelay(pdMS_TO_TICKS(navInterval));
	}
}