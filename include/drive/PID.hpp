#pragma once
#include <stdint.h>

#include <algorithm>

#include "Controller.hpp"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "message.pb.h"

class PID {
   private:
	double kP;
	double kI;
	double kD;

	double *input;
	double *output;
	double *target;

	double error;
	double lastInput;
	double lastDerError;
	double sumError;

	double outMax;
	double outMin;

	uint32_t lastTime;
	uint32_t curTime;

	uint32_t sampleTimeInMs;
	uint32_t sampleRateInTicks;

   public:
	PID(double *input,
		double *output,
		double outMin,
		double outMax,
		uint32_t sampleTimeInMs,
		const MsgEncoderCallibration &config);

	void setCallibration(MsgEncoderCallibration *config);
	void setCallibration(double kP, double kD, double kI);

	void evaluate();
	void reset();

	void setTarget(double *target);
};
