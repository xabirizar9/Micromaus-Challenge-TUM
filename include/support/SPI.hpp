#pragma once

#include <cstdint>
#include <driver/spi_master.h>

class SPIDevice;

class SPIBus
{
public:
	SPIBus(uint8_t misoPin, uint8_t mosiPin, uint8_t clkPin);
	~SPIBus();

	spi_device_handle_t addDevice(uint8_t csPin, int clockFreqHz, uint8_t mode);
	void removeDevice(spi_device_handle_t hnd);

private:
	unsigned int references;
};

class SPIDevice
{
public:
	SPIDevice(SPIBus& bus, uint8_t csPin, int clockFreqHz, uint8_t mode = 0b00);
	~SPIDevice();

	operator spi_device_handle_t() const { return handle; }

	/* write for int types */
	template<typename T>
	void write(uint8_t reg, T data);

	/* read for int types */
	template<typename T>
	T read(uint8_t reg);

private:
	SPIBus& bus;
	spi_device_handle_t handle;
};
