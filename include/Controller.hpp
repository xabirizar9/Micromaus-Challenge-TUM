#pragma once
#include <stdint.h>

#include "config.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "periph/Motor.hpp"
#include "periph/Encoder.hpp"

class Controller {
   private:
	int16_t speedTarget = 0;
	int16_t directionTarget = 0;
	TaskHandle_t leftMotorPidTaskHandle;
	TaskHandle_t rightMotorPidTaskHandle;

	Motor leftMotor;
	Motor rightMotor;
	Encoder leftEncoder;
	Encoder rightEncoder;

   public:
	Controller();
	~Controller();

	void drive(int16_t speed, int16_t direction);
};