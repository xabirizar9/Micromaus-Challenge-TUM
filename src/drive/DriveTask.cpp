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
	float gridCM = 0.16;
	float gridPulses = 1797.46;
	float interval = 0;

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

		switch (cmd.type) {
			case _DriveCmdType::DriveCmdType_Move: break;

			case _DriveCmdType::moveCells: {
				//_MsgTurn payload =

				NavigationPacket *data = &controller->getState();
				controller->getEncoder(right);
				controller->getEncoder(left);
				float averageEncoder =
					// get current motor postition in ticks
					// float speed->cmd.speed;
					interval = gridCM / cmd.speed;

				controller.drive(set);
				vTaskDelay(pdMS_TO_TICKS(interval));
				// check motor postition again if pulses are prooving wanted distance
				controller.drive(0);
				break
			};
			case _DriveCmdType::turnAround: break;
			case _DriveCmdType::turnLeft:
				float d = ((3.14 / 2) * cmd.value);
				interval = d / cmd.speed;
				controller.drive(speed, 90);
				vTaskDelay(pdMS_TO_TICKS(interval));
				controller.drive(speed, 90);
				// ToDo: time!!!
				break;
			case _DriveCmdType::turnRight:
				controller.drive(speed, 90);
				// ToDo: time!!!
				break;
			case _DriveCmdType::turnLeftOnSpot: break;
			case _DriveCmdType::turnRightOnSpot: break;
		}

		curCmd = NULL;

		// TODO: send this event when command is completed
		xEventGroupSetBits(driver->eventHandle, DRIVE_EVT_COMPLETED_BIT);

		vTaskDelay(pdMS_TO_TICKS(navInterval));
	}
}

void turn() {
	// vTaskDelay(pdMS_TO_TICKS(5000));
	int8_t pre = -1;
	if (degree < 0) {
		pre = 1;
	}
	uint8_t rMaus = 60;
	float dRad = abs(degree) * rMaus;
	float duration = dRad / speed;

	this->leftSpeedTickTarget = convertMMsToTPS(-pre * speed);
	this->rightSpeedTickTarget = convertMMsToTPS(pre * speed);

	ESP_LOGI(TAG, "no time passed %f %f", leftSpeedTickTarget, rightSpeedTickTarget);

	vTaskDelay(pdMS_TO_TICKS(duration));
	this->setSpeed(0);
}