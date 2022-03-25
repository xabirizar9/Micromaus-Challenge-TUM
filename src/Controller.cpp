#include "Controller.hpp"

#include <stdint.h>

#include <algorithm>
#include <cstdint>

#include "IRSensor.hpp"
#include "config.h"
#include "esp_log.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "periph/Motor.hpp"

static const char *TAG = "ctrl";
struct PidTaskInitPayload {
	Controller *controller;
	MotorPosition position;
};

// conversion from mm -> to wheel rotation
static const float mmToRp = 0.0053051648;  // 1 / (2 * PI * 30)

// number of ticks in a full wheel rotation
static const float ticksPerRevolution = 2112.0;

template <typename T = float>
void clamp(T &correction, T &intError, uint32_t &timeInterval, T minValue, T maxValue) {
	if (correction < minValue) {
		correction = minValue;
	} else if (correction > maxValue) {
		correction = maxValue;
	} else {
		// safe to integrate
		intError += correction * timeInterval;
	}
}

float convertMillimetersToRevolutions(int16_t millis) {
	// this depends on wheel size
	return (float)millis * mmToRp;
}

inline float mmsToTicks(float millis) {
	return millis * mmToRp * ticksPerRevolution;
}

inline float convertMMsToTPS(float millis) {
	return convertMillimetersToRevolutions(millis) * ticksPerRevolution;
}

void motorPidTask(void *pvParameter) {
	PidTaskInitPayload *payload = (PidTaskInitPayload *)pvParameter;

	// copy all relevant values
	Controller *controller = payload->controller;
	MotorPosition pos = payload->position;
	Motor *m = controller->getMotor(pos);
	Encoder *enc = controller->getEncoder(pos);

	// delete payload after we have read everything
	delete payload;

	// PID interval in ms
	uint16_t monitorInterval = 100;
	// fraction of interval to full second
	// needed to compute target speed for a given PID loop interval
	float secondFraction = (float)monitorInterval / 1000.0;
	float maxEncoderTicks = 1 / (5315.2 * secondFraction);

	ESP_LOGD(TAG, "started pid task %d", pos);

	// current speed target in ticks
	float target = 0;
	uint32_t tick_diff = 0;
	TickType_t lastTick = xTaskGetTickCount();
	TickType_t curTick = 0;

	int16_t curEncoderReading = 0;
	int16_t curSpeed = 0;

	float lastError = 0.0;
	float curError = 0.0;
	float derError = 0.0;
	float intError = 0.0;

	uint32_t timeInterval = 0;

	float kP;
	float kD;
	float kI;

	float correction = 0;
	float speed = 0;
	float newPwm;

	while (true) {
		// update values
		kP = m->kP;
		kD = m->kD;
		kI = m->kI;

		// get target speed for a given PID interval
		target = (float)controller->getSpeedInTicks(pos) * secondFraction;

		// m->setPWM(std::clamp((float)(target /), (float)-1.0, (float)1.0));
		// ESP_LOGI(TAG, "speed %f, t=%f", target / (5315.2 * secondFraction), target);
		// vTaskDelay(pdMS_TO_TICKS(monitorInterval));

		// continue;

		curTick = xTaskGetTickCount();
		tick_diff = curTick - lastTick;
		if (tick_diff == 0) {
			ESP_LOGD(TAG, "no time passed %d %d", curTick, lastTick);
			vTaskDelay(pdMS_TO_TICKS(monitorInterval));
			continue;
		}

		curEncoderReading = enc->get();

		// compute duration since this method was last called
		timeInterval = pdTICKS_TO_MS(curTick - lastTick);

		// compute speed in ticks
		curError = target - curEncoderReading;
		derError = (lastError - curError) / timeInterval;

		// compute correction
		correction = (kP * curError) + (kD * derError) + (kI * intError);

		// ESP_LOGI(TAG, "PID: ce=%f de=%f es=%f c=%f", curError, derError, errorSum, correction);
		// ESP_LOGI(TAG,
		// 		 "PID: t=%.3f errCur=%.3f. cor=%.3f sp=%.3f enc=%d",
		// 		 target,
		// 		 curError,
		// 		 correction,
		// 		 speed,
		// 		 curEncoderReading);
		// ESP_LOGI(TAG, "PID: ce=%f de=%f es=%f c=%f", curError, derError, errorSum,
		// correction);
		ESP_LOGI(TAG,
				 "PID: t=%.3f errCur=%.3f. cor=%.3f sp=%.3f enc=%d",
				 target,
				 curError,
				 correction,
				 speed,
				 curEncoderReading);

		// copy step values for next step
		lastError = curError;

		ESP_LOGD(
			TAG, "m=%d s=%f i=%d e=%d", payload->position, speed, timeInterval, curEncoderReading);

		// apply adjustments and clamp them to 0-100%
		newPwm = (speed + correction) * maxEncoderTicks;
		clamp(newPwm, intError, timeInterval);
		m->setPWM(newPwm);

		// reset encoder to avoid overflows
		enc->reset();

		// add short interval
		vTaskDelay(pdMS_TO_TICKS(monitorInterval));
	}
}

void stateTask(void *arg) {
	Controller *controller = (Controller *)arg;
	controller->sensorUpdates();

	vTaskDelay(pdMS_TO_TICKS(500));
}
void laneControlTask(void *args) {
	Controller *controller = (Controller *)args;
	Motor *leftMotor = controller->getMotor(left);
	Motor *rightMotor = controller->getMotor(right);

	PIDErrors wallDistance;
	uint32_t timeInterval = 100;

	// declare variables for sensor distances
	int8_t dLeft;
	int8_t dRight;

	const float updateConst = 0.01;
	float kP = 0.5;
	float kD = 0;
	float kI = 0;

	float curSpeedTicks;
	float leftSpeed;
	float rightSpeed;
	float direction;

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
		clamp(wallDistance.correction, wallDistance.intError, timeInterval);
		leftMotor->setPWM(curSpeedTicks + updateConst * mmsToTicks(wallDistance.correction));
		rightMotor->setPWM(curSpeedTicks - updateConst * mmsToTicks(wallDistance.correction));

		// direction = 0;	// Compute somehow direction from left/right speeds
		// controller->setDirection(direction);

		vTaskDelay(pdMS_TO_TICKS(timeInterval));
	}
};

Controller::Controller()
	: leftMotor(Motor(IO::MOTOR_L)),
	  rightMotor(Motor(IO::MOTOR_R)),
	  leftEncoder(Encoder(IO::MOTOR_L.encoder)),
	  rightEncoder(Encoder(IO::MOTOR_R.encoder)),
	  leftSensor(IO::IR_SENSOR_LEFT),
	  rightSensor(IO::IR_SENSOR_RIGHT),
	  frontSensor(IO::IR_SENSOR_FRONT) {
	// battery(power::Battery(IO::VSENSE)) {
	// init state stream object
	this->state.has_position = true;
	this->state.has_sensors = true;
	this->state.position = Position_init_zero;
	this->state.sensors = SensorPacket_init_zero;

	// init pid payload
	PidTaskInitPayload *leftPayload = new PidTaskInitPayload();
	leftPayload->controller = this;
	leftPayload->position = MotorPosition::left;
	PidTaskInitPayload *rightPayload = new PidTaskInitPayload();
	rightPayload->controller = this;
	rightPayload->position = MotorPosition::right;

	// setup pids to control the motors
	xTaskCreate(
		motorPidTask, "pidLeftMotorTask", 2048, leftPayload, 1, &this->leftMotorPidTaskHandle);

	xTaskCreate(
		motorPidTask, "pidRightMotorTask", 2048, rightPayload, 1, &this->rightMotorPidTaskHandle);

	xTaskCreate(stateTask, "stateTask", 2048, this, 1, &this->sensorRead);
}

/******************************************************************
 * Driving related methods
 ******************************************************************/

void Controller::setSpeed(int16_t speed) {
	this->state.leftMotorSpeed = (float)speed;
	this->state.rightMotorSpeed = (float)speed;

	// since speed is given in mm/s and our PID is using ticks/s
	// we have to convert them

	// TODO: @wlad convert from mm/s to encoder ticks for now use some magic numbers
	this->leftSpeedTickTarget = this->rightSpeedTickTarget =
		convertMillimetersToRevolutions((float)speed) * ticksPerRevolution;
	// TODO: @wlad convert from mm/s to encoder ticks for now use some magic numbers
	this->leftSpeedTickTarget = 2;
	this->rightSpeedTickTarget = 2;
}

void Controller::sensorUpdates() {
	while (true) {
		this->state.sensors.left = leftSensor.measuredistance();
		this->state.sensors.right = rightSensor.measuredistance();
		this->state.sensors.front = frontSensor.measuredistance();
		// ESP_LOGI(TAG,
		// 		 "PID: left:%.3f right=%.3f front=%.3f",
		// 		 this->state.sensors.left,
		// 		 this->state.sensors.right,
		// 		 this->state.sensors.front);
		// vTaskDelay(pdMS_TO_TICKS(500));
	}
}

void Controller::setDirection(int16_t direction) {
	this->state.position.heading = (float)direction;
	this->direction = direction;
	// TODO: implement
}

void Controller::drive(int16_t speed, int16_t direction) {
	this->setSpeed(speed);
	this->setDirection(direction);
}

float Controller::getSpeedInTicks(MotorPosition position) {
	switch (position) {
		case MotorPosition::left: return this->leftSpeedTickTarget;
		case MotorPosition::right: return this->rightSpeedTickTarget;
		default: return 0;
	}
}

void Controller::turnright() {
	// vTaskDelay(pdMS_TO_TICKS(5000));
	this->leftSpeedTickTarget = 2;
	this->rightSpeedTickTarget = 2;
	vTaskDelay(pdMS_TO_TICKS(5000));
	this->leftSpeedTickTarget = 0;
	this->rightSpeedTickTarget = 0;
}

/******************************************************************
 * Utility Methods
 ******************************************************************/

Encoder *Controller::getEncoder(MotorPosition position) {
	switch (position) {
		case MotorPosition::left: return &this->leftEncoder;
		case MotorPosition::right: return &this->rightEncoder;
		default:
			// should be unreachable
			return NULL;
	}
}

Motor *Controller::getMotor(MotorPosition position) {
	switch (position) {
		case MotorPosition::left: return &this->leftMotor;
		case MotorPosition::right: return &this->rightMotor;
		default:
			// should be unreachable
			return NULL;
	}
}

NavigationPacket Controller::getState() {
	this->state.timestamp = xTaskGetTickCount();
	this->state.leftEncoderTotal = this->getEncoder(MotorPosition::left)->getTotalCounter();
	this->state.rightEncoderTotal = this->getEncoder(MotorPosition::right)->getTotalCounter();
	// TODO: @alex enable this after it works
	// this->state.batPercentage = this->battery.getPercentage();
	// this->state.voltage = this->battery.getVoltage();
	return this->state;
}
