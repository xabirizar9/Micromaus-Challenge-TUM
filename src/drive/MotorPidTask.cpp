#include "drive/MotorPidTask.hpp"

#include "esp_log.h"

static const char *TAG = "PID";

// #define DEBUG_PID

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
	uint16_t monitorInterval = 50;
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

#ifdef DEBUG_PID
	uint32_t lastTicks = xTaskGetTickCount();
#endif

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
			m->brakeMotor(1);
			intError = 0;
			derError = 0;
			curEncoderReading = enc->get();
			// reset encoder to avoid overflows
			enc->reset();
			// add short interval
			vTaskDelay(pdMS_TO_TICKS(monitorInterval));
			continue;
		}
		// if speed has changed reset errors and correction
		if (target != lastSpeed) {
			correction = 0.0;
			intError = 0;
			derError = 0;
		}

		curEncoderReading = enc->get();
		// reset encoder to avoid overflows
		enc->reset();

		// compute speed in ticks
		error = target - (float)curEncoderReading;
		derError = lastError - error;

		// compute correction
		correction = (kP * error) + (kD * derError) + (kI * intError);
		// correction = 1;

#ifdef DEBUG_PID
		// if (pos == MotorPosition::left) {
		ESP_LOGI(TAG,
				 "%d t=%.3f errCur=%.3f. cor=%.3f pwm=%.3f enc=%d time=%d",
				 pos,
				 target,
				 error,
				 correction,
				 correction * oneOverMaxSpeed,
				 curEncoderReading,
				 pdTICKS_TO_MS(xTaskGetTickCount() - lastTicks));
		//}
		lastTicks = xTaskGetTickCount();
#endif

		// copy step values for next step
		lastError = error;
		lastSpeed = target;

		m->setPWM(correction * oneOverMaxSpeed);

		if (controller->getIsPidTuningEnabled()) {
			controller->appendPidTuningSample(error);
		}

		// add short interval
		vTaskDelay(pdMS_TO_TICKS(monitorInterval));
	}
}
