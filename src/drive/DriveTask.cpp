
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

	DriveCmdWithMotionProfile cmd;
	uint16_t lastSpeed = 0;
	while (true) {
		if (!xQueueReceive(driver->executionQueue, &cmd.driveCmd, 0)) {
			vTaskDelay(interval);
			continue;
		}

		switch (cmd.driveCmd.type) {
			case DriveCmdType::DriveCmdType_Move: {
				cmd.profile = new StraightProfile((int)cmd.driveCmd.value, 1.5, cmd.driveCmd.speed);
				break;
			}
			case DriveCmdType::DriveCmdType_TurnAround: {
			}
			case DriveCmdType::DriveCmdType_TurnLeftOnSpot:
			case DriveCmdType::DriveCmdType_TurnRightOnSpot: {
				cmd.profile =
					new CurveProfile(90 * cmd.driveCmd.value, wheelDistance / 2, 1.0, 0, 0, true);
				break;
			}
			case DriveCmdType::DriveCmdType_TurnRight:
			case DriveCmdType::DriveCmdType_TurnLeft: {
				cmd.profile = new CurveProfile(
					90 * cmd.driveCmd.value, gridCurveRadius, 1.0, lastSpeed, cmd.driveCmd.speed);
				break;
			}
			case DriveCmdType::DriveCmdType_MoveCells: {
				cmd.profile =
					new GridProfile(cmd.driveCmd.value, 1.5, lastSpeed, cmd.driveCmd.speed);
				break;
			}
			default:
				break;
				// TODO: handle this
		}
		lastSpeed = cmd.driveCmd.speed;
		ESP_LOGI(tag, "motion profile computed");
		// pass command to drive task
		xQueueSend(driver->motionProfileQueue, &cmd, 0);
		vTaskDelay(interval);
	}
}

void driveTask(void* arg) {
	MausCommandStatus cmdStatus = MausCommandStatus_init_zero;
	RobotDriver* driver = (RobotDriver*)arg;
	uint16_t navInterval = 100;
	NavigationPacket state;
	Controller* controller = driver->controller;

	NetController::Manager net = NetController::Manager::getInstance();

	bool isFirstCmd = true;

	DriveCmdWithMotionProfile cmd;
	DriveCmdWithMotionProfile lastCmd;
	DriveCmdWithMotionProfile* curCmd = NULL;

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
		ESP_LOGI(tag, "cmd type:%d", curCmd->driveCmd.type);

		// set status cmd;
		cmdStatus.cmd = curCmd->driveCmd.type;

		switch (curCmd->driveCmd.type) {
			case DriveCmdType::DriveCmdType_Move: {
				ESP_LOGI(tag, "intervals=%d", curCmd->profile->numIntervals);
				uint8_t counter = 0;

				while (counter < curCmd->profile->numIntervals) {
					controller->drive(curCmd->profile->velocityProfile[counter], 0);
					ESP_LOGI(
						tag, "c=%d speed=%d", counter, curCmd->profile->velocityProfile[counter]);
					counter++;
					vTaskDelay(pdMS_TO_TICKS(controlInterval));
				}
				break;
			}

			case DriveCmdType::DriveCmdType_MoveCells: {
				// NOTE: enable if needed
				// this value represents how often lane control will be called compared to
				// distance checks: 5 means for every 5 distance checks the lane control routine
				// will be called once this is usefull since lane control is computationally
				// heavy
				// but we need regular checks to prevent overshooting
				// uint8_t motionProfileInterval = 5;

				ESP_LOGI(tag, "DriveCell");

				double laneCorrection = 0.0;
				LaneControlPID lanePid =
					LaneControlPID(&laneCorrection, controlInterval, controller);

				cmdStatus.target = controller->getAverageEncoderTicks() +
								   mmsToTicks(mazeCellSize) * curCmd->driveCmd.value;

				uint8_t counter = 0;

				while (counter < curCmd->profile->numIntervals) {
					controller->updatePosition();
					controller->updateSensors();
					// update lane task
					lanePid.evaluate();
					controller->drive(curCmd->profile->velocityProfile[counter],
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
				break;
			}
			case DriveCmdType::DriveCmdType_TurnAround: break;

			case DriveCmdType::DriveCmdType_TurnRight:
			case DriveCmdType::DriveCmdType_TurnLeft: {
				uint8_t counter = 0;

				int16_t heading = curCmd->driveCmd.type == DriveCmdType::DriveCmdType_TurnLeft
									  ? -curCmd->driveCmd.value
									  : curCmd->driveCmd.value;

				while (counter < curCmd->profile->numIntervals) {
					controller->drive(curCmd->profile->velocityProfile[counter], heading);
					counter++;
					vTaskDelay(pdMS_TO_TICKS(controlInterval));
				}
				break;
			}
			case DriveCmdType::DriveCmdType_TurnRightOnSpot:
			case DriveCmdType::DriveCmdType_TurnLeftOnSpot: {
				int16_t heading = curCmd->driveCmd.type == DriveCmdType::DriveCmdType_TurnLeftOnSpot
									  ? INT16_MIN
									  : INT16_MAX;
				uint8_t counter = 0;

				while (counter < curCmd->profile->numIntervals) {
					controller->drive(curCmd->profile->velocityProfile[counter], heading);
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

			if (!isFirstCmd) {
				delete lastCmd.profile;
			}

			// clear last last command
			// and store current cmd as last
			lastCmd = cmd;

			// reset current command
			curCmd = NULL;

			isFirstCmd = false;

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
