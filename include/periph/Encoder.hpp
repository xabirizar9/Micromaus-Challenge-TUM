#pragma once

#include <stdbool.h>

#include <cstdint>

#include "config.h"

class PulseCounterResource;

class Encoder {
   private:
	int64_t totalCounter = 0;

   public:
	Encoder(uint8_t pinA, uint8_t pinB);
	Encoder(IO::Encoder);
	~Encoder();

	int16_t get() const;

	int64_t getTotalCounter() const;
	/*
	 * @brief resets the current encoder counter
	 * the counter is to totalCounter
	 */
	void reset(bool resetTotalCounter = false);

   protected:
	void onOverflow();
	PulseCounterResource* unit;
};
