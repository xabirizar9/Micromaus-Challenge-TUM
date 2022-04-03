#include "drive/LaneTask.hpp"

#include "Controller.hpp"
#include "drive/MotorPidTask.hpp"
#include "periph/Motor.hpp"
#include "utils/units.hpp"

static const char *TAG = "lane-ctrl";

void clampAndIntegrate(float &correction,
					   float &intError,
					   uint32_t &timeInterval,
					   float minValue = -1.0,
					   float maxValue = 1.0) {
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
	static uint32_t timeInterval = 100;

	// declare variables for sensor distances
	int8_t dLeft;
	int8_t dRight;

	const float updateConst = 0.01;
	float kP = 0.5;
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

		ESP_LOGI(TAG, "dLeft=%d, dRight=%d", dLeft, dRight);

		wallDistance.curError = dLeft - dRight;
		wallDistance.derError = (wallDistance.lastError - wallDistance.curError) / timeInterval;
		wallDistance.correction = (kP * wallDistance.curError) + (kD * wallDistance.derError) +
								  (kI * wallDistance.intError);

		wallDistance.lastError = wallDistance.curError;

		// Update speed of right motor
		clampAndIntegrate(wallDistance.correction, wallDistance.intError, timeInterval);
		leftMotor->setPWM(curSpeedTicks + updateConst * mmsToTicks(wallDistance.correction));
		rightMotor->setPWM(curSpeedTicks - updateConst * mmsToTicks(wallDistance.correction));

		// direction = 0;	// Compute somehow direction from left/right speeds
		// controller->setDirection(direction);

		vTaskDelay(pdMS_TO_TICKS(timeInterval));
	}
};