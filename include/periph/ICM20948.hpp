#pragma once

#include <stdint.h>
#include "support/SPI.hpp"
#include "support/Linalg.hpp"

class ICM20948
{
public:
	ICM20948(SPIBus& bus, uint8_t csPin);
	~ICM20948();

	/* passing true puts device to sleep
	 * the wake-up will take max. 40 ms according to datasheet
	 */
	void setSleep(bool sleep);

	linalg::Vec<int16_t> readAccelRaw();
	linalg::Vec<int16_t> readGyroRaw();
	int16_t readTempRaw();

	/// read temperature in celsius
	float readTemp(); 

private:
	static constexpr float ROOM_TEMP_OFFSET = 0; // LSB
	static constexpr float TEMP_SENSITIVITY = 333.87; // LSB/Kelvin

	void switchBank(uint8_t bank);
	void init();

	SPIDevice spi;
	uint8_t currentBank;
};

