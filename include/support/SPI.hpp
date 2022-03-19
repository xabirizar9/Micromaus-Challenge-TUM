#pragma once

#include <cstdint>
#include <type_traits>
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

	/* r/w for buffers */
	template<typename T,
		std::enable_if_t<(std::is_integral_v<T>
				&& sizeof(T) <= 4), bool> = true>
	void write(uint8_t reg, const T* buffer, size_t numItems);

	template<typename T,
		std::enable_if_t<(std::is_integral_v<T>
				&& sizeof(T) <= 4), bool> = true>
	void read(uint8_t reg, T* buffer, size_t numItems);

	void write(uint8_t reg, const void* buffer, size_t numBytes);
	void read(uint8_t reg, void* buffer, size_t numBytes);

private:
	SPIBus& bus;
	spi_device_handle_t handle;
};
