
#include "drive/DriveTask.hpp"

#include <cmath>

#include "Controller.hpp"
#include "drive/LaneTask.hpp"
#include "freertos/FreeRTOS.h"
#include "freertos/queue.h"
#include "message.pb.h"
#include "nav/MazeSolver.hpp"
#include "periph/Motor.hpp"
#include "utils/units.hpp"

static const char* tag = "[drive]";

float averageEncoder(Controller* controller) {
	int64_t right = controller->getEncoder(MotorPosition::right)->getTotalCounter();
	int64_t left = controller->getEncoder(MotorPosition::left)->getTotalCounter();
	return 0.5 * (right + left);
}
void driveTask(void* arg) {
	TaskHandle_t laneControllTaskHandle;

	RobotDriver* driver = (RobotDriver*)arg;
	uint16_t navInterval = 100;
	NavigationPacket state;
	Controller* controller = driver->controller;
	float gridMM = 180;
	float gridPulses = 1797.46;
	float interval = 0;
	float distance = 0;
	int64_t encoderTemp = 0;
	float averageEncoder1 = 0;
	float averageEncoder2 = 0;
	float dif = 0;

	MsgDrive cmd;
	MsgDrive* curCmd;

	xTaskCreate(laneControlTask, "laneControltask", 2048, controller, 1, &laneControllTaskHandle);
	vTaskSuspend(laneControllTaskHandle);

	while (true) {
		// update and get state
		controller->updateSensors();
		controller->updatePosition();
		state = controller->getState();

		if (curCmd == NULL) {
			if (xQueueReceive(driver->executionQueue, &cmd, 0)) {
				ESP_LOGI(tag, "recv");
				curCmd = &cmd;
				xEventGroupSetBits(driver->eventHandle, DRIVE_EVT_STARTED_BIT);
			} else {
				vTaskDelay(pdMS_TO_TICKS(navInterval));
				continue;
			}
		}
		// ESP_LOGI(tag, "cmd type:%d", cmd.type);

		switch (cmd.type) {
			case DriveCmdType::DriveCmdType_Move: break;

			case DriveCmdType::DriveCmdType_MoveCells: {
				ESP_LOGI(tag, "DriveCell");

				vTaskResume(laneControllTaskHandle);

				// interval = gridMM * cmd.value / cmd.speed * 1000;
				averageEncoder1 = averageEncoder(controller);

				while (dif < (1790 * cmd.value)) {
					vTaskDelay(pdMS_TO_TICKS(20));
					controller->drive(cmd.speed, 0);
					averageEncoder2 = averageEncoder(controller);
					dif = averageEncoder2 - averageEncoder1;
				}
				dif = 0;
				controller->drive(0, 0);
				vTaskSuspend(laneControllTaskHandle);
				break;
			}
			case DriveCmdType::DriveCmdType_TurnAround: break;

			case DriveCmdType::DriveCmdType_TurnLeft:
				distance = ((3.14 / 2) * cmd.value);
				interval = distance / cmd.speed;
				controller->drive(cmd.speed, INT16_MIN);
				vTaskDelay(pdMS_TO_TICKS(interval));
				controller->drive(INT16_MIN, 0);
				// ToDo: time!!!
				break;

			case DriveCmdType::DriveCmdType_TurnRight:
				// controller.drive(speed, 90);
				//  ToDo: time!!!
				break;
			case DriveCmdType::DriveCmdType_TurnLeftOnSpot: {
				ESP_LOGI(tag, "DriveLeftOnSpot");
				vTaskResume(laneControllTaskHandle);
				encoderTemp = controller->getEncoder(MotorPosition::right)->getTotalCounter();
				while (
					(controller->getEncoder(MotorPosition::right)->getTotalCounter() - encoderTemp <
					 (1056 * cmd.value))) {
					// vTaskDelay(pdMS_TO_TICKS(10));

					controller->drive(65, INT16_MIN);
				}
				controller->drive(0, 0);
				encoderTemp = 0;
				vTaskSuspend(laneControllTaskHandle);
				break;
			}
			case DriveCmdType::DriveCmdType_TurnRightOnSpot: {
				ESP_LOGI(tag, "DriveRightOnSpot");
				vTaskResume(laneControllTaskHandle);
				encoderTemp = controller->getEncoder(MotorPosition::left)->getTotalCounter();
				while (
					(controller->getEncoder(MotorPosition::left)->getTotalCounter() - encoderTemp <
					 (1056 * cmd.value))) {
					// vTaskDelay(pdMS_TO_TICKS(10));

					controller->drive(65, INT16_MAX);
				}

				controller->drive(0, 0);
				encoderTemp = 0;
				vTaskSuspend(laneControllTaskHandle);
				break;
			}
			default: break;
		}

		curCmd = NULL;

		// TODO: send this event when command is completed
		ESP_LOGI(tag, "cmd completed");
		xEventGroupSetBits(driver->eventHandle, DRIVE_EVT_COMPLETED_BIT);

		vTaskDelay(pdMS_TO_TICKS(navInterval));
	}
}

void computeTrajectories(void* arg) {
	RobotDriver* driver = (RobotDriver*)arg;
	Controller* controller = driver->controller;

	int vMax = 500;
	int64_t tickStart = controller->getEncoder(left)->getTotalCounter();
	int tickEnd = mmsToTicks(500);
	int vStart = controller->getSpeed();
	int vEnd = 50;
	TickType_t tStart = xTaskGetTickCount();
	TickType_t tEnd = pdMS_TO_TICKS(1000 / (vMax * 0.9));

	uint64_t time = xTaskGetTickCount() - tStart;

	float* resp = getMotionProfilePolynom(tickStart, tickEnd, vStart, vEnd, tStart, tEnd);
}

float* getMotionProfilePolynom(
	int64_t& tickStart, int tickEnd, int vStart, int vEnd, TickType_t tStart, TickType_t tEnd) {
	static float* resp = new float[4];
	int b0, b1, b2, b3;
	float ticksTime, tDiff, tickDiff;
	float tEnd2, tStart2, tEnd3, tStart3;

	tDiff = tEnd - tStart;
	tickDiff = tickEnd - tickStart;
	ticksTime = tickDiff / tDiff;

	b0 = tickStart;
	b1 = tickDiff;
	b2 = vStart - ticksTime;
	b3 = vEnd + vStart - 2 * ticksTime;

	tStart2 = pow(tStart, 2);
	tStart3 = pow(tStart, 3);
	tEnd2 = pow(tEnd, 2);
	tEnd3 = pow(tEnd, 3);

	resp[3] = b3 / (tEnd2 + tStart2 + 4 * tEnd * tStart);
	resp[2] = (resp[3] * (2 * tStart2 - tEnd2 + 2 * tEnd * tStart) - b2) / tDiff;
	resp[1] = (b1 - resp[2] * (tEnd2 - tStart2) - resp[3] * (tEnd3 - tStart3)) / tDiff;
	resp[0] = b0 - resp[1] * tStart + resp[2] * tStart2 + resp[3] * tStart3;

	return resp;
}
/*
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
*/
