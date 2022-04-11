#include "drive/MotorPidTask.hpp"

#include "drive/PID.hpp"
#include "esp_log.h"

static const char *TAG = "PID";

#define DEBUG_PID

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
	uint16_t monitorInterval = 10;
	// fraction of interval to full second
	// needed to compute target speed for a given PID loop interval
	double secondFraction = (float)monitorInterval / 1000.0;
	float oneOverMaxSpeed = 1 / (5315.2 * secondFraction);

	ESP_LOGD(TAG, "started pid task %d", pos);

	// current speed target in ticks
	double target = 0;

	double input = 0.0;
	double output = 0.0;

	MsgEncoderCallibration config;
	PID pid = PID(&input, &output, -1.0, 1.0, monitorInterval * 5, config);
	pid.setCallibration(m->kP, m->kI, m->kD);
	pid.setTarget(&target);

	uint8_t counter = 0;

	while (true) {
		if (counter % 5 == 0) {
			target = (double)controller->getSpeedInTicks(pos) * secondFraction;
			if (target != 0.0) {
				m->brakeMotor(0);
				// get target speed for a given PID interval
				input = enc->get();
				if (m->wasPidChanged) {
					// update pid with latest motor settings
					pid.setCallibration(m->kP, m->kI, m->kD);
					m->wasPidChanged = false;
				}
				pid.evaluate();
				m->setPWM(output);
			} else {
				pid.reset();
				m->setPWM(0.0);
				m->brakeMotor(-1);
			}
		}
		counter++;
		// reset encoder to avoid overflows
		enc->reset();

		// add short interval
		vTaskDelay(pdMS_TO_TICKS(monitorInterval));
	}
}
