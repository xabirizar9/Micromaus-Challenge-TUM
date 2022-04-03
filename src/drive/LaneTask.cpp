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

	PIDErrors wallDistance;
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

		wallDistance.curError = dLeft - dRight;
		wallDistance.derError = (wallDistance.lastError - wallDistance.curError) / timeInterval;
		wallDistance.correction += (kP * wallDistance.curError) + (kD * wallDistance.derError) +
								   (kI * wallDistance.intError);

		wallDistance.lastError = wallDistance.curError;
		ESP_LOGI(TAG, "dLeft=%d, dRight=%d c=%f", dLeft, dRight, wallDistance.correction);

		// Update speed of right motor
		clampAndIntegrate(wallDistance.correction, wallDistance.intError, timeInterval);
		// direction = 0;	// Compute somehow direction from left/right speeds
		// controller->setDirection(wallDistance.correction);

		vTaskDelay(pdMS_TO_TICKS(timeInterval));
	}
};