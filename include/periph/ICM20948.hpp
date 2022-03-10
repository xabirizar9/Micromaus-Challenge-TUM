#pragma once

#include <stdint.h>
#include "support/SPI.hpp"

class ICM20948
{
public:
	ICM20948(SPIBus& bus, uint8_t csPin);
	~ICM20948();

protected:
	void switchBank(uint8_t bank);

private:
	SPIDevice spi;
};

