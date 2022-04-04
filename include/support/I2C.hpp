#pragma once

#include <cstdint>

class I2CMaster {
   public:
	I2CMaster(uint8_t sclPin, uint8_t sdaPin);
	~I2CMaster();

	uint8_t readByteRegister(uint8_t deviceAddr, uint8_t regNo);
	void writeByteRegister(uint8_t deviceAddr, uint8_t regNo, uint8_t data);
	void selectRegister(uint8_t deviceAddr, uint8_t regNo);
	uint8_t readByte(uint8_t deviceAddr);
};
