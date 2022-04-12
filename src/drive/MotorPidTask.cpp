#include "drive/MotorPidTask.hpp"

#include "drive/PID.hpp"
#include "esp_log.h"

static const char *TAG = "PID";

#define DEBUG_PID

void motorPidTask(void *pvParameter) {
	// copy all relevant values
	Controller *controller = (Controller *)pvParameter;
	Motor *lMotor = controller->getMotor(MotorPosition::left);
	Motor *rMotor = controller->getMotor(MotorPosition::right);

	Encoder *lEnc = controller->getEncoder(MotorPosition::left);
	Encoder *rEnc = controller->getEncoder(MotorPosition::right);

	// PID interval in ms
	uint16_t monitorInterval = 50;
	uint8_t pidInterval = 3.0;
	// fraction of interval to full second
	// needed to compute target speed for a given PID loop interval
	double secondFraction = (float)monitorInterval / 100.0;

	float oneOverMaxSpeed = 1 / (5315.2 * secondFraction);

	// current speed target in ticks
	double lTarget = 0.0;
	double lInput = 0.0;
	double lOutput = 0.0;

	double rTarget = 0.0;
	double rInput = 0.0;
	double rOutput = 0.0;

	MsgEncoderCallibration config;

	PID lPid = PID(&lInput, &lOutput, -1000.0, 1000.0, monitorInterval, config);
	lPid.setCallibration(lMotor->kP, lMotor->kI, lMotor->kD);
	lPid.setTarget(&lTarget);

	PID rPid = PID(&rInput, &rOutput, -1000.0, 1000.0, monitorInterval, config);
	rPid.setCallibration(rMotor->kP, rMotor->kI, rMotor->kD);
	rPid.setTarget(&rTarget);

	uint8_t counter = 0;

	// initially reset encoder
	lEnc->reset();
	rEnc->reset();

	while (true) {
		lInput = lEnc->get();
		rInput = rEnc->get();
		if (counter % 3 == 0) {
			lTarget = (double)controller->getSpeedInTicks(MotorPosition::left) * secondFraction;
			rTarget = (double)controller->getSpeedInTicks(MotorPosition::right) * secondFraction;

			// ESP_LOGI(TAG, "le=%lf re=%lf", lInput, rInput);

			lPid.evaluate();
			rPid.evaluate();
			// reset encoder to avoid overflows

			// ESP_LOGI(TAG, "lo=%lf ro=%lf", lOutput, rOutput);
			lMotor->setPWM((float)lOutput * oneOverMaxSpeed);
			rMotor->setPWM((float)rOutput * oneOverMaxSpeed);

			// update PID config if needed
			if (lMotor->wasPidChanged) {
				// update pid with latest motor settings
				lPid.setCallibration(lMotor->kP, lMotor->kI, lMotor->kD);
				lMotor->wasPidChanged = false;
			}
			if (rMotor->wasPidChanged) {
				// update pid with latest motor settings
				rPid.setCallibration(rMotor->kP, rMotor->kI, rMotor->kD);
				rMotor->wasPidChanged = false;
			}
		}
		lEnc->reset();
		rEnc->reset();
		counter++;

		// add short interval
		vTaskDelay(pdMS_TO_TICKS(monitorInterval));
	}
}
