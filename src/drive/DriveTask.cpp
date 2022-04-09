
#include "drive/DriveTask.hpp"

#include <algorithm>
#include <cmath>

#include "Controller.hpp"
#include "drive/LaneTask.hpp"
#include "freertos/FreeRTOS.h"
#include "freertos/queue.h"
#include "message.pb.h"
#include "nav/MazeSolver.hpp"
#include "net/NetController.hpp"
#include "periph/Motor.hpp"
#include "utils/units.hpp"
static const char* tag = "[drive]";

float ticksPerRotation(float radius) {
	return mmsToTicks(0.5 * PI * radius);
}

void driveTask(void* arg) {
	ESP_LOGI(tag, "1");
	MausCommandStatus cmdStatus = MausCommandStatus_init_zero;
	ESP_LOGI(tag, "2");

	RobotDriver* driver = (RobotDriver*)arg;
	uint16_t navInterval = 100;
	NavigationPacket state;
	Controller* controller = driver->controller;
	NetController::Manager net = NetController::Manager::getInstance();

	float interval = 0;
	float distance = 0;
	float ticksPerOnSpotRotation = mmsToTicks(M_PI * wheelDistance / 4);

	ESP_LOGI(tag, "3");

	MsgDrive cmd;
	MsgDrive* curCmd = NULL;

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

		// set status cmd;
		cmdStatus.cmd = curCmd->type;

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

			case DriveCmdType::DriveCmdType_TurnRight: {
				int64_t curLeft = controller->getEncoder(MotorPosition::left)->getTotalCounter();
				int64_t curRight = controller->getEncoder(MotorPosition::right)->getTotalCounter();

				float targetRight = ticksPerRotation(InnercurveRadius);
				float targetLeft = ticksPerRotation(OutercurveRadius);
				float targetDiffRange = 20;

				controller->drive(cmd.speed, 90);
				cmdStatus.target = targetLeft;

				while (targetLeft - curLeft > targetDiffRange) {
					curLeft = controller->getEncoder(MotorPosition::left)->getTotalCounter();
					vTaskDelay(pdMS_TO_TICKS(1));
				}
				cmdStatus.actual = curLeft;

				controller->drive(0, 0);
			}
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

				cmdStatus.target = target;

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
				cmdStatus.actual = cur;
				controller->drive(0, 0);

				break;
			}
			default: break;
		}

		if (curCmd != NULL) {
			// stream command results to server
			net.writeCmdState(cmdStatus);

			// reset current command
			curCmd = NULL;
			ESP_LOGI(tag, "cmd completed");
			// notify driver about event completion
			xEventGroupSetBits(driver->eventHandle, DRIVE_EVT_COMPLETED_BIT);
		}
		vTaskDelay(pdMS_TO_TICKS(navInterval));
	}
}

// void computeTrajectories(void* arg) {
// 	RobotDriver* driver = (RobotDriver*)arg;
// 	Controller* controller = driver->controller;

// 	int vMax = 500;
// 	int64_t tickStart = controller->getEncoder(left)->getTotalCounter();
// 	int tickEnd = mmsToTicks(500);
// 	int vStart = controller->getSpeed();
// 	int vEnd = 50;
// 	TickType_t tStart = xTaskGetTickCount();
// 	TickType_t tEnd = pdMS_TO_TICKS(1000 / (vMax * 0.9));

// 	uint64_t time = xTaskGetTickCount() - tStart;

// 	float* resp = getMotionProfilePolynom(tickStart, tickEnd, vStart, vEnd, tStart, tEnd);

// 	float tickValues = resp[0] + resp[1] * time + resp[2] * pow(time, 2) + resp[3] * pow(time, 3);
// 	float tickValuesDer = resp[1] * time + 2 * resp[2] * time + 3 * resp[3] * pow(time, 2);
// }

// float* getMotionProfilePolynom(
// 	int64_t& tickStart, int tickEnd, int vStart, int vEnd, TickType_t tStart, TickType_t tEnd) {
// 	static float* resp = new float[4];
// 	int b0, b1, b2, b3;
// 	float ticksTime, tDiff, tickDiff;
// 	float tEnd2, tStart2, tEnd3, tStart3;

// 	tDiff = tEnd - tStart;
// 	tickDiff = tickEnd - tickStart;
// 	ticksTime = tickDiff / tDiff;

// 	b0 = tickStart;
// 	b1 = tickDiff;
// 	b2 = vStart - ticksTime;
// 	b3 = vEnd + vStart - 2 * ticksTime;

// 	tStart2 = pow(tStart, 2);
// 	tStart3 = pow(tStart, 3);
// 	tEnd2 = pow(tEnd, 2);
// 	tEnd3 = pow(tEnd, 3);

// 	resp[3] = b3 / (tEnd2 + tStart2 + 4 * tEnd * tStart);
// 	resp[2] = (resp[3] * (2 * tStart2 - tEnd2 + 2 * tEnd * tStart) - b2) / tDiff;
// 	resp[1] = (b1 - resp[2] * (tEnd2 - tStart2) - resp[3] * (tEnd3 - tStart3)) / tDiff;
// 	resp[0] = b0 - resp[1] * tStart + resp[2] * tStart2 + resp[3] * tStart3;

// 	return resp;
// }
