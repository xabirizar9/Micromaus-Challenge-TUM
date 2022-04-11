#include "drive/PID.hpp"

#include "esp_log.h"

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
	sumError += kI * error;

	// compute output
	output = kP * error + sumError - kD * derError;

	// clamp output
	output = std::clamp(output, outMin, outMax);
	// ESP_LOGI("PID",
	// 		 "t=%lf i=%lf kP=%lf kI=%lf kD=%lf e=%lf de=%lf se=%lf o=%lf ",
	// 		 *target,
	// 		 input,
	// 		 kP,
	// 		 kI,
	// 		 kD,
	// 		 error,
	// 		 derError,
	// 		 sumError,
	// 		 output);

	*this->output = output;

	lastTime = curTime;
	lastInput = input;
}