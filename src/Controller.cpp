#include "Controller.hpp"

#include <cstdint>
#include <algorithm>
#include <stdint.h>

#include "config.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "periph/Motor.hpp"
#include "esp_log.h"
#include "IRSensor.hpp"

static const char* TAG = "ctrl";
struct PidTaskInitPayload {
	Controller *controller;
	MotorPosition position;
};

struct PIDErrors{
	int16_t lastError;
	int16_t curError;
	int16_t derError;
	int16_t errorSum;

	float correction;
};


void motorPidTask(void *pvParameter) {
	PidTaskInitPayload *payload = (PidTaskInitPayload *)pvParameter;

	ESP_LOGI(TAG, "in %p, %d", payload, (*payload).position);

	Controller *controller = payload->controller;
	Motor *m = controller->getMotor(payload->position);
	Encoder *enc = controller->getEncoder(payload->position);
	IRSensor *

	ESP_LOGI(TAG, "pid task %d", payload->position);

	// current speed target in ticks
	int16_t target = 0;
	uint32_t tick_diff = 0;
	TickType_t lastTick = xTaskGetTickCount();
	TickType_t curTick = 0;

	int16_t curEncoderReading = 0;
	int16_t curSpeed = 0;

	PIDErrors straightLine;
	PIDErrors wallDistance;
	
	uint32_t timeInterval = 0;

	float kP = 0.01;
	float kD = 0.000;
	float kI = 0.000;
	float speed = 0;

	vTaskDelay(pdMS_TO_TICKS(200));
	while (true) {
		// get speed target for selected motor
		target = controller->getSpeedInTicks(payload->position);
		curEncoderReading = enc->get();
		curTick = xTaskGetTickCount();
		tick_diff = curTick - lastTick;
		if (tick_diff == 0){
			vTaskDelay(pdMS_TO_TICKS(50));
			continue;
		}
		
		// compute duration since this method was last called
		timeInterval = pdTICKS_TO_MS(curTick - lastTick );

		// compute speed in ticks
		// TODO: maybe omit division if this causes problems
		curSpeed = curEncoderReading / timeInterval;
		// Calculate errors for driving in a straight line

		straightLine.curError = target - curSpeed;
		straightLine.derError = (straightLine.lastError - straightLine.curError) / timeInterval;

		
		// compute correction with momentum
		straightLine.correction = (kP * straightLine.curError) + (kD * straightLine.derError) + (kI * straightLine.errorSum);

		speed = std::clamp(speed + straightLine.correction + wallDistance.correction, (float)0.0, (float)1.0);

		// copy step values for next step
		lastTick = curTick;
		straightLine.lastError = straightLine.curError;
		straightLine.errorSum += straightLine.curError * timeInterval;

		ESP_LOGI(TAG, "m=%d s=%f i=%d e=%d", payload->position, speed, timeInterval, curEncoderReading);

		// apply adjustments and clamp them to 0-100%
		m->setPWM(speed);

		// reset encoder to avoid overflows
		enc->reset();

		// add short interval
		vTaskDelay(pdMS_TO_TICKS(50));
	}
}

void laneControlTask(void* args){
	Controller *controller = (Controller* )args;
	while (true){
		wallDistance.curError = d_left - d_right;
		wallDistance.derError = (wallDistance.lastError - wallDistance.curError) / timeInterval;
		wallDistance.correction = (kP * wallDistance.curError) + (kD * wallDistance.derError) + (kI * wallDistance.errorSum);

		wallDistance.lastError = wallDistance.curError;
		wallDistance.errorSum += wallDistance.curError * timeInterval;

	}
};

Controller::Controller(): leftMotor(Motor(IO::MOTOR_L)),
	rightMotor(Motor(IO::MOTOR_R)), 
	leftEncoder(Encoder(IO::MOTOR_L.encoder)), 
	rightEncoder(Encoder(IO::MOTOR_R.encoder)) {

	PidTaskInitPayload *leftPayload = new PidTaskInitPayload();
	leftPayload->controller = this;
	leftPayload->position = MotorPosition::left;
	PidTaskInitPayload *rightPayload = new PidTaskInitPayload();
	rightPayload->controller = this;
	rightPayload->position = MotorPosition::right;

	ESP_LOGI(TAG, "out %p", &leftPayload);

	// setup pids to control the motors
	xTaskCreate(
		motorPidTask, 
		"pidLeftMotorTask", 
		4096, 
		leftPayload, 
		1, 
		&this->leftMotorPidTaskHandle
	);

	xTaskCreate(
		motorPidTask,
		"pidRightMotorTask",
		4096,
		rightPayload, 
		1,
		&this->rightMotorPidTaskHandle
	);

	xTaskCreate(
		laneControlTask,
		"laneControlTask",
		4096,
		this, 
		1,
		&this->rightMotorPidTaskHandle
	);
}


/******************************************************************
 * Driving related methods
 ******************************************************************/

void Controller::setSpeed(int16_t speed) {
	// TODO: @wlad convert from mm/s to encoder ticks for now use some magic numbers
	this->leftSpeedTickTarget = 2;
	this->rightSpeedTickTarget = 2;
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
