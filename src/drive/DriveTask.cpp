
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
static const uint8_t driveInterval = 10;
static const uint8_t intervalFactor = controlInterval / driveInterval;

float ticksPerRotation(float radius) {
	return mmsToTicks(0.5 * PI * radius);
}

void motionProfileTask(void* arg) {
	RobotDriver* driver = (RobotDriver*)arg;
	uint16_t interval = pdMS_TO_TICKS(controlInterval);

	DriveCmdWithMotionProfile cmd;
	uint16_t lastSpeed = 0;
	uint16_t nextSpeed = 0;
	while (true) {
		if (!xQueueReceive(driver->executionQueue, &cmd.driveCmd, 0)) {
			vTaskDelay(interval);
			continue;
		}

		if (driver->isFastRun) {
			nextSpeed = cmd.driveCmd.speed;
		}

		switch (cmd.driveCmd.type) {
			case DriveCmdType::DriveCmdType_Move: {
				cmd.profile =
					new StraightProfile((int)cmd.driveCmd.value,  // distance to drive in mm
										lastSpeed,	// previous speed
										nextSpeed,	// speed after profile is finished
										cmd.driveCmd.speed	// average speed for entire profile
					);
				break;
			}
			case DriveCmdType::DriveCmdType_TurnAround: {
				break;
			}
			case DriveCmdType::DriveCmdType_TurnLeftOnSpot:
			case DriveCmdType::DriveCmdType_TurnRightOnSpot: {
				cmd.profile =
					new CurveProfile(90 * cmd.driveCmd.value,
									 wheelDistance / 2,
									 0.0,  // previous speed
									 0.0,  // speed after profile is finished
									 cmd.driveCmd.speed	 // average speed for entire profile
					);
				break;
			}
			case DriveCmdType::DriveCmdType_TurnRight:
			case DriveCmdType::DriveCmdType_TurnLeft: {
				cmd.profile = new CurveProfile(90 * cmd.driveCmd.value,
											   gridCurveRadius,
											   lastSpeed,
											   nextSpeed,
											   cmd.driveCmd.speed);
				break;
			}
			case DriveCmdType::DriveCmdType_MoveCells: {
				cmd.profile =
					new GridProfile(cmd.driveCmd.value, lastSpeed, nextSpeed, cmd.driveCmd.speed);
				break;
			}
			default:
				break;
				// TODO: handle this
		}

		if (driver->isFastRun) {
			lastSpeed = cmd.driveCmd.speed;
		}

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
	uint8_t counter = 0;
	uint16_t interval = pdMS_TO_TICKS(driveInterval);
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
				uint8_t turnIterator = 0;
				while (counter < curCmd->profile->numIntervals) {
					if (turnIterator % intervalFactor != 0) {
						turnIterator++;
						vTaskDelay(interval);
						continue;
					}
					controller->drive(curCmd->profile->velocityProfile[counter], 0);
					ESP_LOGI(
						tag, "c=%d speed=%d", counter, curCmd->profile->velocityProfile[counter]);
					counter++;
					vTaskDelay(interval);
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
				LaneControlPID lanePid = LaneControlPID(&laneCorrection, driveInterval, controller);
				double target = controller->getAverageEncoderTicks() +
								mmsToTicks(mazeCellSize) * curCmd->driveCmd.value;
				cmdStatus.target = target;

				double diff = target - controller->getAverageEncoderTicks();

				uint16_t maxVelocity = 0;
				for (size_t counter = 0; counter < curCmd->profile->numIntervals; counter++) {
					const uint16_t theVelocity = curCmd->profile->velocityProfile[counter];
					if (theVelocity > maxVelocity)
						maxVelocity = theVelocity;
				}

				PID thePID(-maxVelocity,
						   maxVelocity,
						   controlInterval,
						   MsgEncoderCalibration{1, 0, 0.1, false});
				thePID.setTarget(0);

				double envelope = 1;

				/*
				for (size_t counter = 0; counter < curCmd->profile->numIntervals; counter++) {
					controller->updatePosition();
					controller->updateSensors();
					// update lane task
					lanePid.evaluate();
					thePID.evaluate(-diff);
					ESP_LOGI(tag, "Correction=%f", laneCorrection);
					const uint16_t theVelocity = curCmd->profile->velocityProfile[counter];
					if (theVelocity == maxVelocity)
						break;

					controller->drive(theVelocity, (int16_t)round(laneCorrection));

					maxVelocity = theVelocity;
					// STOP drive when wall in front
					if ((state.sensors.front > 0.2) && (state.sensors.front < 30)) {
						ESP_LOGI(tag, "stop!");
						controller->setSpeed(0);
						controller->drive(0, 0);
						break;
					}
					counter++;

					vTaskDelay(pdMS_TO_TICKS(controlInterval));
					diff = cmdStatus.target - controller->getAverageEncoderTicks();
				}
				*/

				while (std::abs(diff) > 10) {
					controller->updatePosition();
					controller->updateSensors();
					lanePid.evaluate();
					thePID.evaluate(-diff);

					const float enveloped = thePID.getOutput() * (1 - envelope);

					ESP_LOGI(tag,
							 "correction: %f -> %f (%f) / %f",
							 diff,
							 thePID.getOutput(),
							 enveloped,
							 laneCorrection);

					controller->drive(enveloped, (int16_t)round(laneCorrection));

					if ((state.sensors.front > 0.2) && (state.sensors.front < 30)) {
						ESP_LOGI(tag, "stop!");
						controller->setSpeed(0);
						controller->drive(0, 0);
						break;
					}
					vTaskDelay(interval);
					diff = target - controller->getAverageEncoderTicks();
					envelope *= 0.95;
				}

				controller->drive(0, 0);
				// laneControlTask(controller, curCmd);
				cmdStatus.actual = controller->getAverageEncoderTicks();
				break;
			}
			case DriveCmdType::DriveCmdType_TurnAround: break;

			case DriveCmdType::DriveCmdType_TurnRight:
			case DriveCmdType::DriveCmdType_TurnLeft: {
				uint8_t counter = 0;
				uint8_t turnIterator = 0;
				int16_t heading = curCmd->driveCmd.type == DriveCmdType::DriveCmdType_TurnLeft
									  ? gridCurveRadius
									  : -gridCurveRadius;

				while (counter < curCmd->profile->numIntervals) {
					if (turnIterator % intervalFactor != 0) {
						turnIterator++;
						vTaskDelay(interval);
						continue;
					}
					controller->drive(curCmd->profile->velocityProfile[counter], heading);
					counter++;
					vTaskDelay(interval);
				}
				break;
			}
			case DriveCmdType::DriveCmdType_TurnRightOnSpot:
			case DriveCmdType::DriveCmdType_TurnLeftOnSpot: {
				int16_t heading = curCmd->driveCmd.type == DriveCmdType::DriveCmdType_TurnLeftOnSpot
									  ? INT16_MIN
									  : INT16_MAX;
				uint8_t counter = 0;
				uint8_t turnIterator = 0;

				while (counter < curCmd->profile->numIntervals) {
					if (turnIterator % intervalFactor != 0) {
						turnIterator++;
						vTaskDelay(interval);
						continue;
					}
					controller->drive(curCmd->profile->velocityProfile[counter], heading);
					counter++;
					vTaskDelay(interval);
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
			} break;
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
