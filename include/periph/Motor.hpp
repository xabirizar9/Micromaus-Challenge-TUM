#pragma once

#include <cstdint>

#include "config.h"
#include "message.pb.h"

class LEDCChannelResource;

class Motor {
   public:
	bool wasPidChanged = false;
	// PID tuning for motors
	float kP = 0.010;
	float kD = 0.0007;
	float kI = 0.0061;

	Motor(IO::Motor);
	Motor(uint8_t forwardPin, uint8_t backwardPin, uint8_t enPin);
	~Motor();

	void setPWM(float value);
	void updatePidConfig(MsgEncoderCalibration config);
	void brakeMotor(float val);

   private:
	LEDCChannelResource* channel;
	uint8_t forwardPin;
	uint8_t backwardPin;
};
