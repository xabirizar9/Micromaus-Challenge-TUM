#include "Controller.hpp"

#include <stdint.h>

#include "config.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "periph/Motor.hpp"

void motorPidTask(void *pvParameter) {
	uint16_t error = 0;
	Motor *motor = (Motor *)pvParameter;

	while (true) {
		// vTaskDelay(pdMS_TO_TICKS(10));
	}
}

Controller::Controller(): leftMotor(Motor(IO::MOTOR_L)),
	rightMotor(Motor(IO::MOTOR_R)), 
	leftEncoder(Encoder(IO::MOTOR_L.encoder)), 
	rightEncoder(Encoder(IO::MOTOR_R.encoder)) {

	// setup pids to control the motors
	xTaskCreate(
		motorPidTask, "pidLeftMotorTask", 256, &this->leftMotor, 1, &this->leftMotorPidTaskHandle);
	xTaskCreate(motorPidTask,
				"pidRightMotorTask",
				256,
				&this->rightMotor,
				1,
				&this->rightMotorPidTaskHandle);
}

void Controller::drive(int16_t speed, int16_t direction) {
	this->speedTarget = speed;
	this->directionTarget = direction;
}