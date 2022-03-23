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

void motorPidTask(void *pvParameter) {
	PidTaskInitPayload *payload = (PidTaskInitPayload *)pvParameter;
	Controller *controller = payload->controller;
	MotorPosition pos = payload->position;
	Motor *m = controller->getMotor(pos);
	Encoder *enc = controller->getEncoder(pos);

	// delete payload after we have read everything
	delete payload;

	ESP_LOGD(TAG, "started pid task %d", pos);

	// current speed target in ticks
	int16_t target = 0;
	uint32_t tick_diff = 0;
	TickType_t lastTick = xTaskGetTickCount();
	TickType_t curTick = 0;

	int16_t curEncoderReading = 0;
	int16_t curSpeed = 0;

	int16_t lastError = 0;
	int16_t curError = 0;
	int16_t derError = 0;
	int16_t errorSum = 0;

	uint32_t timeInterval = 0;

	float kP;
	float kD;
	float kI;

	float correction = 0;
	float speed = 0;

	while (true) {
		// update values
		kP = m->kP;
		kD = m->kD;
		kI = m->kI;

		// get speed target for selected motor
		target = controller->getSpeedInTicks(pos);
		curEncoderReading = enc->get();
		curTick = xTaskGetTickCount();
		tick_diff = curTick - lastTick;
		if (tick_diff == 0) {
			vTaskDelay(pdMS_TO_TICKS(50));
			continue;
		}

		// compute duration since this method was last called
		timeInterval = pdTICKS_TO_MS(curTick - lastTick);

		// compute speed in ticks
		// TODO: maybe omit division if this causes problems
		curSpeed = curEncoderReading / timeInterval;
		curError = target - curSpeed;
		derError = (lastError - curError) / timeInterval;
		// compute correction with momentum
		correction = (kP * curError) + (kD * derError) + (kI * errorSum);
		speed = std::clamp(speed + correction, (float)0.0, (float)1.0);

		// copy step values for next step
		lastError = curError;
		lastTick = curTick;
		errorSum += curError * timeInterval;

		ESP_LOGD(
			TAG, "m=%d s=%f i=%d e=%d", payload->position, speed, timeInterval, curEncoderReading);

		// apply adjustments and clamp them to 0-100%
		m->setPWM(speed);

		// reset encoder to avoid overflows
		enc->reset();

		// add short interval
		vTaskDelay(pdMS_TO_TICKS(50));
	}
}

/* void laneControlTask(void* args){
	Controller *controller = (Controller* )args;
	PIDErrors wallDistance;
	uint32_t timeInterval = 0;

	kP
	kD
	kI

	while (true){
		timeInterval = pdTICKS_TO_MS(curTick - lastTick );
		wallDistance.curError = d_left - d_right;
		wallDistance.derError = (wallDistance.lastError - wallDistance.curError) / timeInterval;
		wallDistance.correction = (kP * wallDistance.curError) + (kD * wallDistance.derError) + (kI
* wallDistance.errorSum);

		wallDistance.lastError = wallDistance.curError;
		wallDistance.errorSum += wallDistance.curError * timeInterval;

		speed = std::clamp(speed + straightLine.correction + wallDistance.correction, (float)0.0,
(float)1.0);
	}
};*/

Controller::Controller()
	: leftMotor(Motor(IO::MOTOR_L)),
	  rightMotor(Motor(IO::MOTOR_R)),
	  leftEncoder(Encoder(IO::MOTOR_L.encoder)),
	  rightEncoder(Encoder(IO::MOTOR_R.encoder)) {
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

	/*xTaskCreate(
		laneControlTask,
		"laneControlTask",
		4096,
		this,
		1,
		&this->rightMotorPidTaskHandle
	);*/
}

/******************************************************************
 * Driving related methods
 ******************************************************************/

void Controller::setSpeed(int16_t speed) {
	this->state.leftMotorSpeed = (float)speed;
	this->state.rightMotorSpeed = (float)speed;

	// TODO: @wlad convert from mm/s to encoder ticks for now use some magic numbers
	this->leftSpeedTickTarget = 2;
	this->rightSpeedTickTarget = 2;
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

int16_t Controller::getSpeedInTicks(MotorPosition position) {
	switch (position) {
		case MotorPosition::left: return this->leftSpeedTickTarget;
		case MotorPosition::right: return this->rightSpeedTickTarget;
		default: return 0;
	}
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
