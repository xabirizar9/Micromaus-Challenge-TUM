
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

void motionProfileTask(void* arg) {
	RobotDriver* driver = (RobotDriver*)arg;
	uint16_t interval = pdMS_TO_TICKS(30);

	MotionProfile* profile;
	MsgDrive cmd;
	DriveCmdWithMotionProfile output;

	while (true) {
		if (!xQueueReceive(driver->motionProfileQueue, &cmd, 0)) {
			vTaskDelay(interval);
			continue;
		}

		switch (cmd.type) {
			case DriveCmdType::DriveCmdType_Move: {
				profile = new MotionProfile((int)cmd.value, 2.0, cmd.speed);
				break;
			}
			case DriveCmdType::DriveCmdType_TurnAround: {
				break;
			}
		}
		vTaskDelay(interval);
	}

	// pass command to drive task
	xQueueSend(driver->executionQueue, &cmd, 0);
}

void driveTask(void* arg) {
	MausCommandStatus cmdStatus = MausCommandStatus_init_zero;
	RobotDriver* driver = (RobotDriver*)arg;
	uint16_t navInterval = 100;
	NavigationPacket state;
	Controller* controller = driver->controller;

	NetController::Manager net = NetController::Manager::getInstance();

	float interval = 0;
	float distance = 0;
	float ticksPerOnSpotRotation = mmsToTicks(M_PI * wheelDistance / 4);

	DriveCmdWithMotionProfile cmd;
	DriveCmdWithMotionProfile* lastCmd = NULL;
	DriveCmdWithMotionProfile* curCmd = NULL;

	// MotionProfile straightGridProfile((uint8_t)curCmd->value, 3.0, 0, 100);
	//  MotionProfile curveNinetyDegrees = MotionProfile((uint8_t)90, 1.0);

	while (true) {
		// update and get state
		// controller->updateSensors();
		controller->updatePosition();
		state = controller->getState();

		if (curCmd == NULL) {
			if (xQueueReceive(driver->motionProfileQueue, &cmd, 0)) {
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
		cmdStatus.cmd = curCmd->driveCmd.type;

		switch (curCmd->driveCmd.type) {
			case DriveCmdType::DriveCmdType_Move: {
				// MotionProfile straightProfile(200, 2.0);
				uint8_t counter = 0;

				while (counter < curCmd->profile->numIntervals) {
					controller->drive(curCmd->profile->velocityProfile[counter], 0);
					// ESP_LOGI(tag,
					// 		 "intervals=%d s=%d c=%d",
					// 		 straightProfile.numIntervals,
					// 		 straightProfile.velocityProfile[counter],
					// 		 counter);
					counter++;
					vTaskDelay(pdMS_TO_TICKS(controlInterval));
				}

				break;
			}

			case DriveCmdType::DriveCmdType_MoveCells: {
				ESP_LOGI(tag, "DriveCell");
				interval = 5;

				StraightProfile straightProfile((int)(curCmd->driveCmd.value * mazeCellSize),
												2.0 * curCmd->driveCmd.value,
												curCmd->driveCmd.speed);

				double laneCorrection = 0.0;
				uint16_t curSpeed = 0;
				LaneControlPID lanePid = LaneControlPID(&laneCorrection, 50, controller);

				cmdStatus.target = controller->getAverageEncoderTicks() +
								   mmsToTicks(mazeCellSize) * curCmd->driveCmd.value;

				uint8_t counter = 0;

				// NOTE: enable if needed
				// this value represents how often lane control will be called compared to
				// distance checks: 5 means for every 5 distance checks the lane control routine
				// will be called once this is usefull since lane control is computationally
				// heavy
				// but we need regular checks to prevent overshooting
				// uint8_t motionProfileInterval = 5;

				while (counter < straightProfile.numIntervals) {
					controller->updatePosition();
					controller->updateSensors();

					// update lane task
					lanePid.evaluate();
					controller->drive(straightProfile.velocityProfile[counter],
									  (int16_t)round(laneCorrection));

					// STOP drive when wall in front
					if ((state.sensors.front > 0.2) && (state.sensors.front < 30)) {
						controller->setSpeed(0);
						controller->drive(0, 0);
						break;
					}

					counter++;

					vTaskDelay(pdMS_TO_TICKS(controlInterval));
				}

				// laneControlTask(controller, curCmd);
				cmdStatus.actual = controller->getAverageEncoderTicks();

				controller->drive(0, 0);
				break;
			}
			case DriveCmdType::DriveCmdType_TurnAround: break;

			case DriveCmdType::DriveCmdType_TurnRight:
			case DriveCmdType::DriveCmdType_TurnLeft: {
				uint32_t start = xTaskGetTickCount();
				MotionProfile curveProfile(
					curCmd->driveCmd.value, 2.0, 0, 0, curCmd->driveCmd.speed);
				uint32_t end = xTaskGetTickCount();

				ESP_LOGI(tag, "end: time=%d", xTaskGetTickCount());
				// MotionProfile straightProfile(200, 2.0);
				uint8_t counter = 0;

				int16_t heading = curCmd->driveCmd.type == DriveCmdType::DriveCmdType_TurnLeft
									  ? -curCmd->driveCmd.value
									  : curCmd->driveCmd.value;

				while (counter < curveProfile.numIntervals) {
					controller->drive(curveProfile.velocityProfile[counter], heading);
					ESP_LOGI(tag,
							 "intervals=%d s=%d c=%d",
							 curveProfile.numIntervals,
							 curveProfile.velocityProfile[counter],
							 counter);
					counter++;
					vTaskDelay(pdMS_TO_TICKS(controlInterval));
				}
				break;
			}
			case DriveCmdType::DriveCmdType_TurnLeftOnSpot:
			case DriveCmdType::DriveCmdType_TurnRightOnSpot: {
				MotionProfile curveProfile(
					90, 0.5 * curCmd->driveCmd.value, 0, 0, curCmd->driveCmd.speed);
				int16_t heading =
					cmd.type == DriveCmdType::DriveCmdType_TurnLeftOnSpot ? INT16_MIN : INT16_MAX;
				uint8_t counter = 0;

				while (counter < curveProfile.numIntervals) {
					controller->drive(curveProfile.velocityProfile[counter], heading);
					ESP_LOGI(tag,
							 "intervals=%d s=%d c=%d",
							 curveProfile.numIntervals,
							 curveProfile.velocityProfile[counter],
							 counter);
					counter++;
					vTaskDelay(pdMS_TO_TICKS(controlInterval));
				}
				// MotorPosition pos = cmd.type == DriveCmdType::DriveCmdType_TurnLeftOnSpot
				// 						? MotorPosition::MotorPosition_left
				// 						: MotorPosition::MotorPosition_right;
				// uint64_t cur = controller->getEncoder(pos)->getTotalCounter();

				// uint64_t target = cur + (int64_t)(ticksPerOnSpotRotation * curCmd->value);

				// // decrease target based on speed to prevent overshoot
				// // target -= std::min((int)((double)std::abs(curCmd->speed) * 0.667), 200);

				// // ESP_LOGI(tag,
				// // 		 "t=%lld, cur=%lld v=%f tposr=%f",
				// // 		 target,
				// // 		 cur,
				// // 		 curCmd->value,
				// // 		 ticksPerOnSpotRotation);

				// cmdStatus.target = target;

				// int targetDiffRange = 10;
				// // std::min(std::max(600 * curCmd->speed / 4000.0, 1.0), 600.0);

				// // monitor encoder values
				// // NOTE: values will only be updated during motor PID
				// // decreasing vTaskDelay will not affect precission directly
				// // but will increase the chance that the last update interval was more recent
				// // to avoid overshooting we stop even when we are a couple of ticks away from
				// // target

				// float percentage = 0.0;
				// int16_t actualSpeed = curCmd->speed;
				// uint64_t progress = target - cur;
				// // uint64_t totalDiff = target - cur;

				// // uint counter = 0;

				// // getMotionProfilePolynom(int64_t& tickStart, int tickEnd, int vStart, int
				// // vEnd, TickType_t tStart, TickType_t tEnd))
				// //  start driving
				// controller->drive(
				// 	curCmd->speed,
				// 	pos == MotorPosition::MotorPosition_right ? INT16_MIN : INT16_MAX);

				// while (progress > targetDiffRange) {
				// 	cur = controller->getEncoder(pos)->getTotalCounter();
				// 	// make sure progress can never exceed target
				// 	progress = target - std::min(cur, target);

				// 	// // start slowing down
				// 	// percentage = std::abs((float)std::min(progress, totalDiff) /
				// 	// (float)totalDiff); actualSpeed = (float)curCmd->speed *
				// 	// (float)(percentage);
				// 	// // gradually reduce speed
				// 	// controller->drive(std::max(actualSpeed, (int16_t)200),
				// 	// 				  pos == MotorPosition::MotorPosition_right ? INT16_MIN :
				// 	// INT16_MAX); decrease speed while nearing curve end
				// 	vTaskDelay(pdMS_TO_TICKS(1));
				// }

				// // add some breaking
				// controller->drive(0, 0);

				// vTaskDelay(pdMS_TO_TICKS(20));
				// cmdStatus.actual = cur;

				// break;
			}
			default: break;
		}

		if (curCmd != NULL) {
			// stream command results to server
			net.writeCmdState(cmdStatus);

			// clear last last command
			// and store current cmd as last
			delete lastCmd->profile;
			delete lastCmd;
			lastCmd = curCmd;

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
