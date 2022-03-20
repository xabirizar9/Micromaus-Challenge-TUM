#pragma once

#include <cstdint>

#include "config.h"

class LEDCChannelResource;

class Motor {
   public:
	Motor(IO::Motor);
	Motor(uint8_t forwardPin, uint8_t backwardPin, uint8_t enPin);
	~Motor();

	void setPWM(float value);

   private:
	LEDCChannelResource* channel;
	uint8_t forwardPin;
	uint8_t backwardPin;
};
