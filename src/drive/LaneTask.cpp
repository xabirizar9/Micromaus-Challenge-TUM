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

// largest radius the robot will drive to correct error
#define CORRECTION_MIN_BOUND 2000

// smallest radius the robot will drive to correct error
#define CORRECTION_MAX_BOUND (float)1300.0

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
	bool flag = true;

	float speedFactor = 1790;

	// get first encoder count to compare traveled distance
	averageEncoderValue1 = controller->averageEncoder();
	while ((dif < (speedFactor * cmd->value)) && flag) {
		config = controller->getLanePidConfig();

		controller->updateSensors();
		state = controller->getState();

		// get second encoder count to compare traveled distance
		averageEncoderValue2 = controller->averageEncoder();
		// Check how far bot has traveled
		dif = averageEncoderValue2 - averageEncoderValue1;

		bool leftSensorValid = isSensorValid(state.sensors.left);
		bool rightSensorValid = isSensorValid(state.sensors.right);

		// only left is valid
		if (!rightSensorValid && leftSensorValid) {
			pErr.curError = state.sensors.left - OPTIMAL_WALL_DISTANCE;
		} else if (!leftSensorValid && rightSensorValid) {
			// only right is valid
			pErr.curError = OPTIMAL_WALL_DISTANCE - state.sensors.right;
		} else if (leftSensorValid && rightSensorValid) {
			// both are valid
			pErr.curError = state.sensors.left - state.sensors.right;
		} else {
			// pray that all is okay
			pErr.curError = 0;
		}

		// PID
		pErr.derError = (pErr.lastError - pErr.curError) * timeFactor;
		pErr.correction =
			(config.kP * pErr.curError) + (config.kD * pErr.derError) + (config.kI * pErr.intError);
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
		if (isSensorValid(state.sensors.front) && state.sensors.front < 30) {
			controller->setSpeed(0);
			flag = false;
			controller->drive(0, 0);
		}

		vTaskDelay(pdMS_TO_TICKS(timeInterval));
	}
	dif = 0;
	controller->drive(0, 0);
}