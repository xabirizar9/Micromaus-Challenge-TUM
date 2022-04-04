#include "drive/LaneTask.hpp"

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

void laneControlTask(void *args) {
	Controller *controller = (Controller *)args;
	Motor *leftMotor = controller->getMotor(left);
	Motor *rightMotor = controller->getMotor(right);

	PIDErrors pErr;
	static uint32_t timeInterval = 50;

	// declare variables for sensor distances
	int8_t dLeft;
	int8_t dRight;

	const float updateConst = 0.01;
	float kP = 0.1;
	float kD = 0;
	float kI = 0;

	float curSpeedTicks;

	while (true) {
		/*
		Get left and right sensor readings + current speed
		d_left = get_left_sensor_distance()
		d_right = get_right_sensor_distance()
		cur_speed = get_current_speed()
		*/
		dLeft = controller->getState().sensors.left;
		dRight = controller->getState().sensors.right;
		curSpeedTicks = convertMMsToTPS(controller->getSpeed());

		pErr.curError = dLeft - dRight;
		pErr.derError = (pErr.lastError - pErr.curError) / timeInterval;
		pErr.correction += (kP * pErr.curError) + (kD * pErr.derError) + (kI * pErr.intError);

		pErr.lastError = pErr.curError;

		// TODO: since direction changes are inverse to the error e.g.
		// small adjustments are large values and large ones are little we need to remap/rescale
		// @xavier take a look at this

		// Update speed of right motor
		clampAndIntegrate(pErr.correction, pErr.intError, timeInterval, -4000, 4000);
		ESP_LOGI(TAG, "dLeft=%d, dRight=%d c=%f", dLeft, dRight, pErr.correction);

		// controller->setDirection(4000 - pErr.correction);

		vTaskDelay(pdMS_TO_TICKS(timeInterval));
	}
};