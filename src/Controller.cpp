#include "Controller.hpp"

#include <cstdint>
#include <algorithm>
#include <stdint.h>

#include "config.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "periph/Motor.hpp"


struct PidTaskInitPayload {
	Controller *controller;
	MotorPosition position;
};

void motorPidTask(void *pvParameter) {
	uint16_t error = 0;
	PidTaskInitPayload *payload = (PidTaskInitPayload *)pvParameter;
	Controller *controller = payload->controller;
	Motor *m = controller->getMotor(payload->position);
	Encoder *enc = controller->getEncoder(payload->position);

	// current speed target in ticks
	int16_t target = 0;
	TickType_t lastTick = xTaskGetTickCount();
	TickType_t curTick = 0;

	int16_t curEncoderReading = 0;
	int16_t curSpeed = 0;

	int16_t lastError = 0;
	int16_t curError = 0;
	int16_t errorSum = 0;
	
	uint32_t timeInterval = 0;

	float kP = 0.02;
	float kD = 0.01;
	float kI = 0.001;
	float correction = 0;

	while (true) {
		// get speed target for selected motor
		target = controller->getSpeedInTicks(payload->position);
		curEncoderReading = enc->get();
		curTick = xTaskGetTickCount();

		// compute duration since this method was last called
		timeInterval = pdTICKS_TO_MS(curTick - lastTick );

		// compute speed in ticks
		// TODO: maybe omit division if this causes problems
		curSpeed = curEncoderReading / timeInterval;
		curError = target - curSpeed;

		// compute correction with momentum
		correction += (kP * error) + (kD * lastError) + (kI * errorSum);

		// copy step values for next step
		lastTick = curTick;
		lastError = curError;
		errorSum += curError;

		// apply adjustments and clamp them to 0-100%
		m->setPWM(std::clamp(correction, (float)0.0, (float)1.0));

		// reset encoder to avoid overflows
		enc->reset();

		// add short interval
		vTaskDelay(pdMS_TO_TICKS(20));
	}
}

Controller::Controller(): leftMotor(Motor(IO::MOTOR_L)),
	rightMotor(Motor(IO::MOTOR_R)), 
	leftEncoder(Encoder(IO::MOTOR_L.encoder)), 
	rightEncoder(Encoder(IO::MOTOR_R.encoder)) {

	PidTaskInitPayload leftPayload = {this, MotorPosition::left};
	PidTaskInitPayload rightPayload = {this, MotorPosition::left};

	// setup pids to control the motors
	xTaskCreate(
		motorPidTask, 
		"pidLeftMotorTask", 
		256, 
		&leftPayload, 
		1, 
		&this->leftMotorPidTaskHandle
	);

	xTaskCreate(
		motorPidTask,
		"pidRightMotorTask",
		256,
		&rightPayload, 
		1,
		&this->rightMotorPidTaskHandle
	);
}


/******************************************************************
 * Driving related methods
 ******************************************************************/

void Controller::setSpeed(int16_t speed) {
	// TODO: @wlad convert from mm/s to encoder ticks for now use some magic numbers
	this->leftSpeedTickTarget = 20;
	this->rightSpeedTickTarget = 20;
}

void Controller::setDirection(int16_t direction) {
	this->direction = direction;
	// TODO: implement
}

void Controller::drive(int16_t speed, int16_t direction) {
	this->setSpeed(speed);
	this->setDirection(direction);
}

int16_t Controller::getSpeedInTicks(MotorPosition position) {
	switch (position) {
		case MotorPosition::left:
			return this->leftSpeedTickTarget;
		case MotorPosition::right:
			return this->rightSpeedTickTarget;
		default:
			return 0;
	}
}

/******************************************************************
 * Utility Methods
 ******************************************************************/

Encoder* Controller::getEncoder(MotorPosition position) {
	switch (position) {
		case MotorPosition::left:
			return &this->leftEncoder;
		case MotorPosition::right:
			return &this->rightEncoder;
		default:
			// should be unreachable
			return NULL;
	}
}

Motor* Controller::getMotor(MotorPosition position) {
	switch (position) {
		case MotorPosition::left:
			return &this->leftMotor;
		case MotorPosition::right:
			return &this->rightMotor;
		default:
			// should be unreachable
			return NULL;
	}
}
