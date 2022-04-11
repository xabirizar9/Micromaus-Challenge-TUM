#pragma once

#include <cstdint>

#include "config.h"
#include "message.pb.h"

enum MotorPosition { left, right };

class LEDCChannelResource;

class Motor {
   public:
	// PID tuning for motors
	float kP = 0.4;
	float kD = 0.0000;
	float kI = 0.000075;

	Motor(IO::Motor);
	Motor(uint8_t forwardPin, uint8_t backwardPin, uint8_t enPin);
	~Motor();

	void setPWM(float value);
	void updatePidConfig(MsgEncoderCallibration config);
	void brakeMotor(float val);

   private:
	LEDCChannelResource* channel;
	uint8_t forwardPin;
	uint8_t backwardPin;
};
