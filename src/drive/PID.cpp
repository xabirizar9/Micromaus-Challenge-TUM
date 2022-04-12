#include "drive/PID.hpp"

#include <math.h>

#include <algorithm>

#include "esp_log.h"
#include "utils/units.hpp"

void clampAndIntegrate(float &correction,
					   float &intError,
					   uint32_t &timeInterval,
					   int16_t minValue = INT16_MIN,
					   int16_t maxValue = INT16_MAX) {
	if (correction < minValue) {
		correction = minValue;
	} else if (correction > maxValue) {
		correction = maxValue;
	} else {
		// safe to integrate
		intError += correction * timeInterval;
	}
}

PID::PID(double *input,
		 double *output,
		 double outMin,
		 double outMax,
		 uint32_t sampleTimeInMs,
		 const MsgEncoderCallibration &config) {
	this->input = input;
	this->output = output;
	this->outMax = outMax;
	this->outMin = outMin;
	sumError = 0;

	this->sampleTimeInMs = sampleTimeInMs;
	this->sampleRateInTicks = pdMS_TO_TICKS(this->sampleTimeInMs);

	this->setCallibration(config.kP, config.kI, config.kD);
	lastTime = xTaskGetTickCount();
}

void PID::setCallibration(MsgEncoderCallibration *config) {
	this->setCallibration(config->kP, config->kI, config->kD);
}

void PID::setCallibration(double kP, double kI, double kD) {
	this->kP = kP;
	this->kI = kI * ((double)this->sampleTimeInMs / 1000);
	this->kD = kD / ((double)this->sampleTimeInMs / 1000);

	sumError = 0;
}

void PID::setTarget(double *target) {
	this->target = target;
}

void PID::reset() {
	sumError = 0.0;
	error = 0.0;
}

void PID::evaluate() {
	this->curTime = xTaskGetTickCount();
	uint32_t timeDiff = this->curTime - this->lastTime;

	double input;
	double output;

	// errors
	double error;
	double derError;

	// make sure we check the sampling rate
	if (timeDiff < sampleRateInTicks) {
		return;
	}

	// copy values;
	input = *this->input;
	error = *this->target - input;

	derError = input - lastInput;

	// add smoothing
	if (kD != 0.0) {
		derError = 0.8 * lastDerError + 0.2 * derError;
		lastDerError = derError;
	}

	// compute output
	output = kP * error + sumError + kD * derError;

	if (output < outMin) {
		output = outMin;
	} else if (output > outMax) {
		output = outMax;
	} else {
		// safe to integrate
		sumError += kI * error;
	}

	// if (input != 0.0) {
	// 	// clamp output
	// 	ESP_LOGI("PID",
	// 			 "t=%lf i=%lf kP=%lf kI=%lf kD=%lf e=%lf de=%lf se=%lf o=%lf ",
	// 			 *target,
	// 			 input,
	// 			 kP,
	// 			 kI,
	// 			 kD,
	// 			 error,
	// 			 derError,
	// 			 sumError,
	// 			 output);
	// }

	*this->output = output;

	lastTime = curTime;
	lastInput = input;
};
