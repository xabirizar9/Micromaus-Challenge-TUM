#include "drive/MotorPidTask.hpp"

#include "esp_log.h"

static const char *TAG = "PID";

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
	float oneOverMaxSpeed = 1 / (5315.2 * secondFraction);

	ESP_LOGD(TAG, "started pid task %d", pos);

	// current speed target in ticks
	float target = 0;
	int16_t curEncoderReading = 0;

	float lastSpeed = (float)controller->getSpeedInTicks(pos) * secondFraction;

	float error = 0.0;
	float lastError = 0.0;
	float intError = 0.0;
	float derError = 0.0;

	float kP;
	float kD;
	float kI;

	float correction = 0;

	while (true) {
		// update values
		kP = m->kP;
		kD = m->kD;
		kI = m->kI;

		// get target speed for a given PID interval
		target = controller->getSpeedInTicks(pos) * secondFraction;

		// if speed target changed set it directly and let PID fine tune
		if (target == 0.0) {
			// stop motor if target changed
			m->setPWM(0);
			intError = 0;
			derError = 0;
			// reset encoder to avoid overflows
			enc->reset();
			// add short interval
			vTaskDelay(pdMS_TO_TICKS(monitorInterval));
			continue;
		}

		curEncoderReading = enc->get();

		// compute speed in ticks
		error = target - (float)curEncoderReading;
		derError = lastError - error;

		// compute correction
		correction = (kP * error) + (kD * derError) + (kI * intError);

		// ESP_LOGI(TAG,
		// 		 "PID: t=%.3f errCur=%.3f. cor=%.3f pwm=% .3f enc=%d",
		// 		 target,
		// 		 error,
		// 		 correction,
		// 		 correction * maxEncoderTicks,
		// 		 curEncoderReading);

		// copy step values for next step
		lastError = error;

		m->setPWM(correction * oneOverMaxSpeed);

		// reset encoder to avoid overflows
		enc->reset();

		// add short interval
		vTaskDelay(pdMS_TO_TICKS(monitorInterval));
	}
}
