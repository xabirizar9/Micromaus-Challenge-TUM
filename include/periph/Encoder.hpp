#pragma once

#include <cstdint>

class Encoder
{
public:
	Encoder(uint8_t pinA, uint8_t pinB);

	int16_t get() const;

protected:
	void onOverflow();
};
