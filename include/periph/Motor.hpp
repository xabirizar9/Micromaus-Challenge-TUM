#pragma once

#include <cstdint>

#include "config.h"
#include "message.pb.h"

enum MotorPosition { left, right };

class LEDCChannelResource;

class Motor {
   public:
	// PID tuning for motors
	// float kP = 0.2;
	float kP = 0.02;
	float kD = 0.0000175;
	float kI = 0.00000000;

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
