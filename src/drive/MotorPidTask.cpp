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
	uint16_t monitorInterval = 10;
	uint8_t pidInterval = 2.0;
	// fraction of interval to full second
	// needed to compute target speed for a given PID loop interval
	double secondFraction = (float)monitorInterval / 100.0;

	float oneOverMaxSpeed = 1 / (5315.2 * (secondFraction * pidInterval));

	// current speed target in ticks
	double lTarget = 0.0;
	double lInput = 0.0;
	double lOutput = 0.0;

	double rTarget = 0.0;
	double rInput = 0.0;
	double rOutput = 0.0;

	MsgEncoderCallibration config;

	PID lPid = PID(&lInput, &lOutput, -1000.0, 1000.0, monitorInterval * pidInterval, config);
	lPid.setCallibration(lMotor->kP, lMotor->kI, lMotor->kD);
	lPid.setTarget(&lTarget);

	PID rPid = PID(&rInput, &rOutput, -1000.0, 1000.0, monitorInterval * pidInterval, config);
	rPid.setCallibration(rMotor->kP, rMotor->kI, rMotor->kD);
	rPid.setTarget(&rTarget);

	uint8_t counter = 0;

	// initially reset encoder
	lEnc->reset();
	rEnc->reset();

	while (true) {
		if (counter % 2 == 0) {
			lInput = lEnc->get();
			rInput = rEnc->get();
			lTarget = (double)controller->getSpeedInTicks(MotorPosition::left) * secondFraction /
					  pidInterval;
			rTarget = (double)controller->getSpeedInTicks(MotorPosition::right) * secondFraction /
					  pidInterval;

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
			lEnc->reset();
			rEnc->reset();
		}
		counter++;

		// add short interval
		vTaskDelay(pdMS_TO_TICKS(monitorInterval));
	}
}
