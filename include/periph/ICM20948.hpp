#pragma once

#include <stdint.h>
#include "support/SPI.hpp"

class ICM20948
{
public:
	ICM20948(SPIBus& bus, uint8_t csPin);
	~ICM20948();

	/* passing true puts device to sleep
	 * the wake-up will take max. 40 ms according to datasheet
	 */
	void setSleep(bool sleep);

private:
	void switchBank(uint8_t bank);
	void init();

	SPIDevice spi;
};

