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
	float gridMM = 160;
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

			case _DriveCmdType::DriveCmdType_MoveCells: {
				//_MsgTurn payload =

				// NavigationPacket *data = &controller->getState();

				// get current motor postition in ticks
				// float speed->cmd.speed;
				interval = gridMM / cmd.speed;
				float averageEncoder1 = averageEncoder(controller);

				controller->drive(cmd.speed, 0);
				vTaskDelay(pdMS_TO_TICKS(interval));
				// check motor postition again if pulses are prooving wanted distance
				float averageEncoder2 = averageEncoder(controller);
				float dif = averageEncoder2 - averageEncoder1;
				if (dif < 1790 || dif > 1804) {
					// TODO: correction
				}
				controller->drive(0, 0);
				break;
			}
			case _DriveCmdType::DriveCmdType_TurnAround: break;
			case _DriveCmdType::DriveCmdType_TurnLeft:
				float d = ((3.14 / 2) * cmd.value);
				interval = d / cmd.speed;
				controller->drive(cmd.speed, INT16_MIN);
				vTaskDelay(pdMS_TO_TICKS(interval));
				controller->drive(0, 0);
				// ToDo: time!!!
				break;
			case _DriveCmdType::DriveCmdType_TurnRight:
				// controller.drive(speed, 90);
				//  ToDo: time!!!
				break;
			case _DriveCmdType::DriveCmdType_TurnLeftOnSpot: break;
			case _DriveCmdType::DriveCmdType_TurnRightOnSpot: break;
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

float averageEncoder(Controller *controller) {
	int64_t right = controller->getEncoder('right')->getTotalCounter();
	int64_t left = controller->getEncoder('left')->getTotalCounter();
	return 0.5 * (right + left);
}