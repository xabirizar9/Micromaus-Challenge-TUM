
#include "drive/DriveTask.hpp"

#include <algorithm>
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

void driveTask(void* arg) {
	RobotDriver* driver = (RobotDriver*)arg;
	uint16_t navInterval = 100;
	NavigationPacket state;
	Controller* controller = driver->controller;
	float interval = 0;
	float distance = 0;

	float ticksPerMazeCell = mmsToTicks(180.0);

	// (radius * 2 * PI) / 4(quarter circle eg 90deg rotation) * (mToTicks contant)
	float ticksPerOnSpotRotation = mmsToTicks(M_PI * wheelDistance / 4);

	MsgDrive cmd;
	MsgDrive* curCmd;

	while (true) {
		// update and get state
		// controller->updateSensors();
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

		switch (curCmd->type) {
			case DriveCmdType::DriveCmdType_Move: break;

			case DriveCmdType::DriveCmdType_MoveCells: {
				ESP_LOGI(tag, "DriveCell");
				laneControlTask(controller, curCmd);
				break;
			}
			case DriveCmdType::DriveCmdType_TurnAround: break;

			case DriveCmdType::DriveCmdType_TurnLeft:
				distance = ((M_PI_2)*cmd.value);
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
			case DriveCmdType::DriveCmdType_TurnLeftOnSpot:
			case DriveCmdType::DriveCmdType_TurnRightOnSpot: {
				MotorPosition pos = cmd.type == DriveCmdType::DriveCmdType_TurnLeftOnSpot
										? MotorPosition::right
										: MotorPosition::left;
				int64_t cur = controller->getEncoder(pos)->getTotalCounter();

				int64_t target = cur + (int64_t)(ticksPerOnSpotRotation * curCmd->value);
				// getMotionProfilePolynom(int64_t& tickStart, int tickEnd, int vStart, int vEnd,
				// TickType_t tStart, TickType_t tEnd))
				//  start driving
				controller->drive(curCmd->speed,
								  pos == MotorPosition::right ? INT16_MIN : INT16_MAX);

				ESP_LOGI(tag,
						 "t=%lld, cur=%lld v=%f tposr=%f",
						 target,
						 cur,
						 curCmd->value,
						 ticksPerOnSpotRotation);

				int targetDiffRange = 20;
				// std::min(std::max(600 * curCmd->speed / 4000.0, 1.0), 600.0);

				// monitor encoder values
				// NOTE: values will only be updated during motor PID
				// decreasing vTaskDelay will not affect precission directly
				// but will increase the chance that the last update interval was more recent
				// to avoid overshooting we stop even when we are a couple of ticks away from
				// target
				while (target - cur > targetDiffRange) {
					cur = controller->getEncoder(pos)->getTotalCounter();
					vTaskDelay(pdMS_TO_TICKS(1));
				}
				controller->drive(0, 0);
				ESP_LOGI(tag, "t=%lld, cur=%lld", target, cur);
				break;
			}
			default: break;
		}

		// reset current command
		curCmd = NULL;

		// notify driver about event completion

		ESP_LOGI(tag, "cmd completed");
		xEventGroupSetBits(driver->eventHandle, DRIVE_EVT_COMPLETED_BIT);

		vTaskDelay(pdMS_TO_TICKS(navInterval));
	}
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
