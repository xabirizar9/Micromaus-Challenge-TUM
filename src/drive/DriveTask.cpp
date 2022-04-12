
#include "drive/DriveTask.hpp"

#include <math.h>

#include <algorithm>

#include "Controller.hpp"
#include "drive/LanePID.hpp"
#include "drive/LaneTask.hpp"
#include "drive/MotionProfile.hpp"
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

	// MotionProfile straightGridProfile((uint8_t)curCmd->value, 3.0, 0, 100);
	//  MotionProfile curveNinetyDegrees = MotionProfile((uint8_t)90, 1.0);

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
			case DriveCmdType::DriveCmdType_Move: {
				MotionProfile straightProfile((int)curCmd->value, 2.0);
				uint32_t timeInterval = 30;
				uint32_t numIntervals = straightProfile.duration / ((float)timeInterval / 1000);
				uint8_t counter = 0;
				ESP_LOGI(tag, "ti=%d ni=%d v=%d", timeInterval, numIntervals, (int)curCmd->value);
				while (counter <= numIntervals) {
					controller->drive(straightProfile.velocityProfile[counter], 0);
					ESP_LOGI(tag, "s=%f c=%d", straightProfile.velocityProfile[counter], counter);
					counter++;
					vTaskDelay(pdMS_TO_TICKS(timeInterval));
				}
				break;
			}

			case DriveCmdType::DriveCmdType_MoveCells: {
				// ESP_LOGI(tag, "DriveCell");
				// interval = 1;

				// double laneCorrection = 0.0;
				// LaneControlPID lanePid = LaneControlPID(&laneCorrection, interval * 5,
				// controller);

				// cmdStatus.actual = controller->getAverageEncoderTicks();

				// cmdStatus.target =
				// 	controller->getAverageEncoderTicks() + mmsToTicks(mazeCellSize) * curCmd->value;

				// uint32_t diff = cmdStatus.target - cmdStatus.actual;
				// uint8_t counter = 0;
				// // this value represents how often lane control will be called compared to
				// // distance checks: 5 means for every 5 distance checks the lane control routine
				// // will be called once this is usefull since lane control is computationally
				// heavy
				// // but we need regular checks to prevent overshooting
				// uint8_t laneControlChechInterval = 5;

				// while (diff > 20) {
				// 	controller->updatePosition();
				// 	controller->updateSensors();

				// 	// perform wall control at different rate to distance checks
				// 	if (counter % laneControlChechInterval == 0) {
				// 		lanePid.evaluate();
				// 		controller->drive(curCmd->speed, laneCorrection);
				// 	}

				// 	// STOP drive when wall in front
				// 	if ((state.sensors.front > 0.2) && (state.sensors.front < 30)) {
				// 		controller->setSpeed(0);
				// 		controller->drive(0, 0);
				// 		break;
				// 	}

				// 	cmdStatus.actual = controller->getAverageEncoderTicks();
				// 	diff = cmdStatus.target - cmdStatus.actual;
				// 	counter++;

				// 	vTaskDelay(pdMS_TO_TICKS(interval));
				// }

				laneControlTask(controller, curCmd);

				cmdStatus.actual = 0;

				controller->drive(0, 0);
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
				break;
			}
			// controller.drive(speed, 90);
			//  ToDo: time!!!
			case DriveCmdType::DriveCmdType_TurnLeftOnSpot:
			case DriveCmdType::DriveCmdType_TurnRightOnSpot: {
				MotorPosition pos = cmd.type == DriveCmdType::DriveCmdType_TurnLeftOnSpot
										? MotorPosition::right
										: MotorPosition::left;

				uint64_t cur = controller->getEncoder(pos)->getTotalCounter();
				uint64_t target = cur + (int64_t)(ticksPerOnSpotRotation * curCmd->value);

				// decrease target based on speed to prevent overshoot
				// target -= std::min((int)((double)std::abs(curCmd->speed) * 0.667), 200);

				// ESP_LOGI(tag,
				// 		 "t=%lld, cur=%lld v=%f tposr=%f",
				// 		 target,
				// 		 cur,
				// 		 curCmd->value,
				// 		 ticksPerOnSpotRotation);

				cmdStatus.target = target;

				int targetDiffRange = 10;
				// std::min(std::max(600 * curCmd->speed / 4000.0, 1.0), 600.0);

				// monitor encoder values
				// NOTE: values will only be updated during motor PID
				// decreasing vTaskDelay will not affect precission directly
				// but will increase the chance that the last update interval was more recent
				// to avoid overshooting we stop even when we are a couple of ticks away from
				// target

				float percentage = 0.0;
				int16_t actualSpeed = curCmd->speed;
				uint64_t progress = target - cur;
				// uint64_t totalDiff = target - cur;

				// uint counter = 0;

				// getMotionProfilePolynom(int64_t& tickStart, int tickEnd, int vStart, int vEnd,
				// TickType_t tStart, TickType_t tEnd))
				//  start driving
				controller->drive(curCmd->speed,
								  pos == MotorPosition::right ? INT16_MIN : INT16_MAX);

				while (progress > targetDiffRange) {
					cur = controller->getEncoder(pos)->getTotalCounter();
					// make sure progress can never exceed target
					progress = target - std::min(cur, target);

					// // start slowing down
					// percentage = std::abs((float)std::min(progress, totalDiff) /
					// (float)totalDiff); actualSpeed = (float)curCmd->speed * (float)(percentage);
					// // gradually reduce speed
					// controller->drive(std::max(actualSpeed, (int16_t)200),
					// 				  pos == MotorPosition::right ? INT16_MIN : INT16_MAX);
					// decrease speed while nearing curve end
					vTaskDelay(pdMS_TO_TICKS(1));
				}

				// add some breaking
				controller->drive(0, 0);

				vTaskDelay(pdMS_TO_TICKS(20));
				cmdStatus.actual = cur;

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
