#include "drive/LanePID.hpp"

#include <math.h>

#include <algorithm>

#include "utils/units.hpp"

static const char *TAG = "lane-ctrl";

LaneControlPID::LaneControlPID(double *output, uint32_t sampleTimeInMs, Controller *controller)
	: PID(-2000, 2000, sampleTimeInMs, controller->getLanePidConfig()) {
	MsgEncoderCalibration cfg = controller->getLanePidConfig();
	this->controller = controller;
	this->setCalibration(&cfg);

	// the target is 0.0 since it means both wall are equally far away
	this->setTarget(0);
	this->laneOutput = output;
}

void LaneControlPID::evaluate() {
	controller->updateSensors();
	const NavigationPacket &state = controller->getState();

	bool leftWallgiven = isWallGiven(state.sensors.left);
	bool rightWallgiven = isWallGiven(state.sensors.right);
	bool leftSensorValid = isSensorValid(state.sensors.right);
	bool rightSensorValid = isSensorValid(state.sensors.left);

	// only left is valid
	if ((!rightWallgiven && leftWallgiven) || (!rightSensorValid && leftSensorValid)) {
		PID::evaluate(-(state.sensors.left - OPTIMAL_WALL_DISTANCE));
		ESP_LOGD(TAG, "only left is valid");
	} else if ((!leftWallgiven && rightWallgiven) || (!leftSensorValid && rightSensorValid)) {
		// only right is valid
		PID::evaluate(-(OPTIMAL_WALL_DISTANCE - state.sensors.right));
		ESP_LOGI(TAG, "only right is valid");
	} else if (leftWallgiven && rightWallgiven && leftSensorValid && rightSensorValid) {
		// both are valid
		ESP_LOGD(TAG, "both are valid");
		PID::evaluate(-(state.sensors.left - state.sensors.right));
	} else {
		// pray that all is okay

		PID::evaluate(0);
	}

	// adjust correction to Lane task constraints
	if (abs(getOutput()) < MIN_CORRECTION_AMOUNT) {
		*laneOutput = 0;
	} else {
		// make sure error is reasonable meaning:
		// lane correction is not too small or too large
		// too large is more problematic
		*laneOutput = copysign(
			(CORRECTION_MIN_BOUND - std::min(abs(getOutput()), CORRECTION_MAX_BOUND)), getOutput());
	}

	ESP_LOGI(TAG, "out=%f, laneOut=%f", getOutput(), *laneOutput);
}
