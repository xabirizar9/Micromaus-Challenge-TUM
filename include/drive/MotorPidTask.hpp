#pragma once
#include "Controller.hpp"
#include "periph/Motor.hpp"

struct PIDErrors {
	float correction;
	float curError;
	float derError;
	float intError;
	float lastError;
};

struct PidTaskInitPayload {
	Controller *controller;
	MotorPosition position;
};

void motorPidTask(void *args);