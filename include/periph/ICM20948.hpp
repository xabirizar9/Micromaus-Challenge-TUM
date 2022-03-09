#pragma once

#include <stdint.h>
#include "support/I2C.hpp"

class ICM20948
{
public:
	ICM20948(uint8_t sclPin, uint8_t mosiPin, uint8_t misoPin);
	~ICM20948();

protected:
	void switchBank(uint8_t bank);

private:
	I2CMaster i2c;
};

