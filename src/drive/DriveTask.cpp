#include "drive/DriveTask.hpp"

#include "Controller.hpp"
#include "MazeExplorer.hpp"
#include "freertos/FreeRTOS.h"
#include "freertos/queue.h"
#include "message.pb.h"
#include "periph/Motor.hpp"

void driveTask(void *arg) {
	RobotDriver *driver = (RobotDriver *)arg;
	uint16_t navInterval = 100;
	NavigationPacket state;
	Controller *controller = driver->controller;
	QueueHandle_t execQueue = driver->executionQueue;

	DriveCommand cmd;
	DriveCommand *curCmd

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

		switch (cmd.type) {
			case DriveCommandType::move: break;
			case DriveCommandType::moveCells: {
				_MsgTurn payload = NavigationPacket data = controller.getstate();
				float encoderPos->data.speed;
				float speed->data.speed;
				controller.drive();
				break
			};
			case DriveCommandType::turnAround: break;
			case DriveCommandType::turnLeft: break;
			case DriveCommandType::turnRight: break;
			case DriveCommandType::turnLeftOnSpot: break;
			case DriveCommandType::turnRightOnSpot: break;
		}

		curCmd = NULL;

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