#pragma once

#include <cstdint>

class PulseCounterResource;

class Encoder
{
public:
	Encoder(uint8_t pinA, uint8_t pinB);
	~Encoder();

	int16_t get() const;

protected:
	void onOverflow();

	PulseCounterResource* unit;
};
