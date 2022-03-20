#pragma once

#include <cstdint>
#include "config.h"

class PulseCounterResource;

class Encoder
{
public:
	Encoder(uint8_t pinA, uint8_t pinB);
	Encoder(IO::Encoder);
	~Encoder();

	int16_t get() const;
	void reset();

protected:
	void onOverflow();

	PulseCounterResource* unit;
};
