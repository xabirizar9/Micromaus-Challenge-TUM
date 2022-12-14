#include "drive/MotorPidTask.hpp"

#include <math.h>

#include "drive/PID.hpp"
#include "esp_log.h"
#include "utils/units.hpp"

static const char *TAG = "PID";

#define DEBUG_PID

// performs Ziegler-Nichols PID tuning method
void tuneMotorPID(Motor *motor, Encoder *enc, PID *pid, uint32_t intervalMS) {
	ESP_LOGI(TAG, "0.");
	// compute target
	uint16_t targetInMmS = 120;
	// compute target in ticks per interval
	float target = (targetInMmS * mmToRp * ticksPerRevolution) * ((float)intervalMS / 1000.0);

	float min = -1000000000;
	float max = 1000000000;

	int i = 0;
	int cycles = 100;
	bool output = true;
	uint32_t interval = pdMS_TO_TICKS(intervalMS);
	int64_t lastEncoderValue = enc->getTotalCounter();
	int64_t curEncoderValue = enc->getTotalCounter();
	float outputValue = 1.0;
	float pAverage = 0, iAverage = 0, dAverage = 0;

	float kP, kI, kD;

	float minOutput = -1, maxOutput = 1;

	uint32_t curTime, lastTime, t1, t2, tHigh, tLow;
	t1 = t2 = lastTime = xTaskGetTickCount();
	curTime = tHigh = tLow = 0;

	float kpConstant = 0.33;
	float tiConstant = 0.5;
	float tdConstant = 0.33;
	ESP_LOGI(TAG, "0.5");
	while (i <= cycles) {
		curTime = xTaskGetTickCount();
		curEncoderValue = enc->getTotalCounter();
		float inputValue = curEncoderValue - lastEncoderValue;
		lastEncoderValue = curEncoderValue;

		// Calculate max and min
		max = (max > inputValue) ? max : inputValue;
		min = (min < inputValue) ? min : inputValue;

		if (output && inputValue > target) {
			ESP_LOGI(TAG, "output is over target");

			output = false;
			outputValue = minOutput;
			t1 = curTime;
			tHigh = t1 - t2;
			max = target;
		}

		if (!output && inputValue < target) {
			output = true;
			outputValue = maxOutput;
			t2 = curTime;
			tLow = t2 - t1;

			// Calculate Ku (ultimate gain)
			// Formula given is Ku = 4d / πa
			// d is the amplitude of the output signal
			// a is the amplitude of the input signal
			float ku = (4.0 * ((maxOutput - minOutput) / 2.0)) / (M_PI * (max - min) / 2.0);

			// Calculate Tu (period of output oscillations)
			float tu = tLow + tHigh;

			// Calculate gains
			kP = kpConstant * ku;
			kI = (kP / (tiConstant * tu)) * interval;
			kD = (tdConstant * kP * tu) / interval;

			// ESP_LOGI(TAG, "tu=%f, kP=%f kI=%f kD=%f", tu, kP, kI, kD);

			// Average all gains after the first two cycles
			if (i > 1) {
				pAverage += kP;
				iAverage += kI;
				dAverage += kD;
			}

			// Reset minimum
			min = target;

			// Increment cycle count
			i++;
		}

		// If loop is done, disable output and calculate averages
		if (i >= cycles) {
			output = false;
			outputValue = minOutput;
			kP = pAverage / (i - 1);
			kI = iAverage / (i - 1);
			kD = dAverage / (i - 1);
		}
		ESP_LOGI(TAG, "(%d/%d) I=%f T=%f", i, cycles, inputValue, target);

		motor->setPWM(outputValue);
		vTaskDelay(interval);
	}

	motor->setPWM(0.0);

	ESP_LOGI(TAG, "PID tuned: kP=%f kI=%f kD=%f", kP, kI, kD);
}

void motorPidTask(void *pvParameter) {
	// copy all relevant values
	Controller *controller = (Controller *)pvParameter;
	Motor *lMotor = controller->getMotor(MotorPosition::MotorPosition_left);
	Motor *rMotor = controller->getMotor(MotorPosition::MotorPosition_right);

	Encoder *lEnc = controller->getEncoder(MotorPosition::MotorPosition_left);
	Encoder *rEnc = controller->getEncoder(MotorPosition::MotorPosition_right);

	// PID interval in ms
	uint16_t monitorInterval = 30;
	uint32_t tickInterval = pdMS_TO_TICKS(monitorInterval);
	// fraction of interval to full second
	// needed to compute target speed for a given PID loop interval
	double targetScaleFactor = (double)monitorInterval / 1000.0;
	// current speed target in ticks
	long lLastCounter = 0;

	long rLastCounter = 0;

	MsgEncoderCalibration config;

	config.kP = 0.003898;
	config.kI = 0.001688;
	config.kD = 0.011194;
	PID lPid = PID(-1.0, 1.0, monitorInterval, config);
	lPid.setCalibration(lMotor->kP, lMotor->kI, lMotor->kD);

	config.kP = 0.003317;
	config.kI = 0.001665;
	config.kD = 0.004370;
	PID rPid = PID(-1.0, 1.0, monitorInterval, config);
	rPid.setCalibration(rMotor->kP, rMotor->kI, rMotor->kD);

	// tune motor
	// tuneMotorPID(lMotor, lEnc, &lPid, monitorInterval);
	// tuneMotorPID(rMotor, rEnc, &rPid, monitorInterval);

	while (true) {
		lPid.setTarget(controller->getSpeedInTicks(MotorPosition::MotorPosition_left) *
					   targetScaleFactor);
		rPid.setTarget(controller->getSpeedInTicks(MotorPosition::MotorPosition_right) *
					   targetScaleFactor);

		// ESP_LOGI(TAG, "le=%lf re=%lf", lInput, rInput);

		lPid.evaluate(lEnc->getTotalCounter() - lLastCounter);
		rPid.evaluate(rEnc->getTotalCounter() - rLastCounter);
		// reset encoder to avoid overflows

		// ESP_LOGI(TAG, "lo=%lf ro=%lf", lOutput, rOutput);
		lMotor->setPWM((float)lPid.getOutput());
		rMotor->setPWM((float)rPid.getOutput());

		// update PID config if needed
		if (lMotor->wasPidChanged) {
			// update pid with latest motor settings
			lPid.setCalibration(lMotor->kP, lMotor->kI, lMotor->kD);
			lMotor->wasPidChanged = false;
		}
		if (rMotor->wasPidChanged) {
			// update pid with latest motor settings
			rPid.setCalibration(rMotor->kP, rMotor->kI, rMotor->kD);
			rMotor->wasPidChanged = false;
		}

		lLastCounter = lEnc->getTotalCounter();
		rLastCounter = rEnc->getTotalCounter();

		// add short interval
		vTaskDelay(tickInterval);
	}
}
