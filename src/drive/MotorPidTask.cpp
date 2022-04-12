#include "drive/MotorPidTask.hpp"

#include "drive/PID.hpp"
#include "esp_log.h"

static const char *TAG = "PID";

#define DEBUG_PID

void motorPidTask(void *pvParameter) {
	// copy all relevant values
	Controller *controller = (Controller *)pvParameter;
	Motor *lMotor = controller->getMotor(MotorPosition::MotorPosition_left);
	Motor *rMotor = controller->getMotor(MotorPosition::MotorPosition_right);

	Encoder *lEnc = controller->getEncoder(MotorPosition::MotorPosition_left);
	Encoder *rEnc = controller->getEncoder(MotorPosition::MotorPosition_right);

	// PID interval in ms
	uint16_t monitorInterval = 10;
	uint8_t pidInterval = 3;
	// fraction of interval to full second
	// needed to compute target speed for a given PID loop interval
	double secondFraction = (double)monitorInterval / 1000.0;
	double pidTimeInterval = (secondFraction * pidInterval);
	double oneOverMaxSpeed = (1.0 / 1000.0);
	double targetScaleFactor = pidTimeInterval;
	// current speed target in ticks
	double lTarget = 0.0;
	double lInput = 0.0;
	double lOutput = 0.0;

	double rTarget = 0.0;
	double rInput = 0.0;
	double rOutput = 0.0;

	MsgEncoderCallibration config;

	PID lPid = PID(&lInput, &lOutput, -1.0, 1.0, monitorInterval * pidInterval, config);
	lPid.setCallibration(lMotor->kP, lMotor->kI, lMotor->kD);
	lPid.setTarget(&lTarget);

	PID rPid = PID(&rInput, &rOutput, -1.0, 1.0, monitorInterval * pidInterval, config);
	rPid.setCallibration(rMotor->kP, rMotor->kI, rMotor->kD);
	rPid.setTarget(&rTarget);

	uint8_t counter = 0;

	// initially reset encoder

	while (true) {
		if (counter % pidInterval == 0) {
			lInput = lEnc->get();
			rInput = rEnc->get();
			lTarget = (double)controller->getSpeedInTicks(MotorPosition::MotorPosition_left) *
					  targetScaleFactor;
			rTarget = (double)controller->getSpeedInTicks(MotorPosition::MotorPosition_right) *
					  targetScaleFactor;

			// ESP_LOGI(TAG, "le=%lf re=%lf", lInput, rInput);

			lPid.evaluate();
			rPid.evaluate();
			// reset encoder to avoid overflows

			// ESP_LOGI(TAG, "lo=%lf ro=%lf", lOutput, rOutput);
			lMotor->setPWM((float)lOutput);
			rMotor->setPWM((float)rOutput);

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
