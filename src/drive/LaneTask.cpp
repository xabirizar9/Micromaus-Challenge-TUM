#include "drive/LaneTask.hpp"

#include <math.h>

#include "Controller.hpp"
#include "drive/MotorPidTask.hpp"
#include "periph/Motor.hpp"
#include "utils/units.hpp"

static const char *TAG = "lane-ctrl";

void clampAndIntegrate(float &correction,
					   float &intError,
					   uint32_t &timeInterval,
					   int16_t minValue = INT16_MIN,
					   int16_t maxValue = INT16_MAX) {
	if (correction < minValue) {
		correction = minValue;
	} else if (correction > maxValue) {
		correction = maxValue;
	} else {
		// safe to integrate
		intError += correction * timeInterval;
	}
}

void laneControlTask(Controller *controller, MsgDrive *cmd) {
	// Controller *controller = (Controller *)args;
	// Motor *leftMotor = controller->getMotor(left);
	// Motor *rightMotor = controller->getMotor(right);

	PIDErrors pErr;
	static uint32_t timeInterval = 20;
	float timeFactor = timeInterval / 1000;

	// declare variables for sensor distances
	NavigationPacket state;

	// const float updateConst = 0.01;
	MsgEncoderCallibration config;

	float dif = 0;
	float averageEncoderValue1 = 0;
	float averageEncoderValue2 = 0;
	int16_t maxValue = INT16_MAX;
	int16_t minValue = INT16_MIN;
	bool flag = true;

	float curSpeedTicks;

	// get first encoder count to compare traveled distance
	averageEncoderValue1 = controller->averageEncoder();
	while ((dif < (1790 * cmd->value)) && flag) {
		config = controller->getLanePidConfig();
		/*
		Get left and right sensor readings + current speed
		d_left = get_left_sensor_distance()
		d_right = get_right_sensor_distance()
		cur_speed = get_current_speed()
		*/
		ESP_LOGI(TAG, "cmdSpeed: %f", cmd->speed);

		controller->updateSensors();
		state = controller->getState();

		// get second encoder count to compare traveled distance
		averageEncoderValue2 = controller->averageEncoder();
		// Check how fare bot has traveled
		dif = averageEncoderValue2 - averageEncoderValue1;

		curSpeedTicks = convertMMsToTPS(controller->getSpeed());
		if (!isSensorValid(state.sensors.left)) {
			pErr.curError = -20;
		}
		if (!isSensorValid(state.sensors.right)) {
			pErr.curError = 20;
		} else {
			pErr.curError = state.sensors.left - state.sensors.right;
		}
		pErr.derError = (pErr.lastError - pErr.curError) / timeInterval;
		pErr.correction += (kP * pErr.curError) + (kD * pErr.derError) + (kI * pErr.intError);

		pErr.lastError = pErr.curError;

		// TODO: since direction changes are inverse to the error e.g.
		// small adjustments are large values and large ones are little we need to remap/rescale
		// @xavier take a look at this

		// Update speed of right motor
		// clampAndIntegrate(pErr.correction, pErr.intError, timeInterval, -4000, 4000);
		if (pErr.correction < minValue) {
			pErr.correction = minValue;
		} else if (pErr.correction > maxValue) {
			pErr.correction = maxValue;
		} else {
			// safe to integrate
			pErr.intError += pErr.correction * timeInterval;
		}
		ESP_LOGI(TAG,
				 "dLeft=%f, dRight=%f, dFront= %f, c=%f",
				 state.sensors.left,
				 state.sensors.right,
				 state.sensors.front,
				 pErr.correction);

		// controller->setDirection(copysign((4000 - abs(pErr.correction)), pErr.correction));
		controller->drive(cmd->speed, copysign((4000 - abs(pErr.correction)), pErr.correction));
		ESP_LOGI(
			TAG, "lane Direction: %f", copysign((4000 - abs(pErr.correction)), pErr.correction));

		if (isSensorValid(state.sensors.front) && (state.sensors.front - frontSensorOffsetX) < 30) {
			controller->setSpeed(0);
			flag = false;
			controller->drive(0, 0);
		}

		vTaskDelay(pdMS_TO_TICKS(timeInterval));
	}
	dif = 0;
	controller->drive(0, 0);
}