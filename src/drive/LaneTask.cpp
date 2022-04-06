#include "drive/LaneTask.hpp"

#include <math.h>

#include "Controller.hpp"
#include "drive/MotorPidTask.hpp"
#include "periph/Motor.hpp"
#include "utils/units.hpp"

static const char *TAG = "lane-ctrl";

#define OPTIMAL_WALL_DISTANCE 36

// minimal correction amount e.g. distance between walls
// below this threshold the robot will driver straight
#define MIN_CORRECTION_AMOUNT 5

// largest radius the robot will drive to correct error e.g. small corrections
#define CORRECTION_MIN_BOUND 2000

// smallest radius the robot will drive to correct error e.g. large corrections
#define CORRECTION_MAX_BOUND (float)1600.0

bool laneControlTask(Controller *controller, MsgDrive *cmd) {
	PIDErrors pErr;
	static uint32_t timeInterval = 10;
	float timeFactor = timeInterval / 1000;

	// declare variables for sensor distances
	NavigationPacket state;
	MsgEncoderCallibration config;

	int64_t curEncoderValue = controller->getAverageEncoderTicks();

	int64_t targetEncoderValue =
		controller->getAverageEncoderTicks() + mmsToTicks(mazeCellSize) * cmd->value;

	uint8_t counter = 0;
	// this value represents how often lane control will be called compared to
	// distance checks: 5 means for every 5 distance checks the lane control routine will be called
	// once
	// this is usefull since lane control is computationally heavy but we need regular checks to
	// prevent overshooting
	uint8_t laneControlChechInterval = 3;

	ESP_LOGI(TAG, "t=%lld, cur=%lld", targetEncoderValue, curEncoderValue);

	// get first encoder count to compare traveled distance
	while (targetEncoderValue - curEncoderValue > 20) {
		// perform wall control at different rate to distance checks
		if (counter % laneControlChechInterval == 0) {
			config = controller->getLanePidConfig();
			controller->updateSensors();
			state = controller->getState();

			bool leftWallgiven = isWallGiven(state.sensors.left);
			bool rightWallgiven = isWallGiven(state.sensors.right);
			bool leftSensorValid = isSensorValid(state.sensors.right);
			bool rightSensorValid = isSensorValid(state.sensors.left);

			// only left is valid
			if ((!rightWallgiven && leftWallgiven) || (!rightSensorValid && leftSensorValid)) {
				pErr.curError = state.sensors.left - OPTIMAL_WALL_DISTANCE;
				ESP_LOGD(TAG, "only left is valid");
			} else if ((!leftWallgiven && rightWallgiven) ||
					   (!leftSensorValid && rightSensorValid)) {
				// only right is valid
				pErr.curError = OPTIMAL_WALL_DISTANCE - state.sensors.right;
				ESP_LOGD(TAG, "only right is valid");
			} else if (leftWallgiven && rightWallgiven && leftSensorValid && rightSensorValid) {
				// both are valid
				ESP_LOGD(TAG, "both are valid");
				pErr.curError = state.sensors.left - state.sensors.right;
			} else {
				// pray that all is okay

				pErr.curError = 0;
			}

			// PID
			pErr.derError = (pErr.lastError - pErr.curError) * timeFactor;
			pErr.correction = (config.kP * pErr.curError) + (config.kD * pErr.derError) +
							  (config.kI * pErr.intError);
			pErr.lastError = pErr.curError;

			// if correction if small just drive straight
			if (abs(pErr.correction) < MIN_CORRECTION_AMOUNT) {
				controller->drive(cmd->speed, 0);
			} else {
				// make sure error is reasonable meaning:
				// lane correction is not too small or too large
				// too large is more problematic
				pErr.correction = copysign(
					(CORRECTION_MIN_BOUND - std::min(abs(pErr.correction), CORRECTION_MAX_BOUND)),
					pErr.correction);

				controller->drive(cmd->speed, pErr.correction);

				ESP_LOGI(TAG, "correction: %f", pErr.correction);
				pErr.intError += pErr.correction * timeFactor;
			}

			// STOP drive when wall in front
			if ((state.sensors.front > 0.2) && (state.sensors.front < 30)) {
				controller->setSpeed(0);
				controller->drive(0, 0);
				return false;
			}
		}
		// get second encoder count to compare traveled distance
		curEncoderValue = controller->getAverageEncoderTicks();
		counter++;
		vTaskDelay(pdMS_TO_TICKS(timeInterval));
	}

	ESP_LOGI(TAG, "reached target t=%lld, cur=%lld", targetEncoderValue, curEncoderValue);

	controller->drive(0, 0);
	return true;
}