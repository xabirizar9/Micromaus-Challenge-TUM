#include "support/SPI.hpp"

#include <stdexcept>
#include <esp_log.h>

static const char* TAG = "SPI";

SPIBus::SPIBus(uint8_t misoPin, uint8_t mosiPin, uint8_t clkPin)
{
	spi_bus_config_t conf {
		.mosi_io_num = mosiPin,
		.miso_io_num = misoPin,
		.sclk_io_num = clkPin,
		.quadwp_io_num = -1,
		.quadhd_io_num = -1,
		.max_transfer_sz = 32,
		.flags = 0,
		.intr_flags = 0
	};
	ESP_ERROR_CHECK(spi_bus_initialize(VSPI_HOST, &conf, SPI_DMA_CH_AUTO));
}

SPIBus::~SPIBus()
{
	if (references > 0) {
		ESP_LOGE(TAG, "destroying SPIBus with reference count %i", references);
	}
	ESP_ERROR_CHECK(spi_bus_free(VSPI_HOST));
}

spi_device_handle_t SPIBus::addDevice(uint8_t csPin, int clockFreqHz, uint8_t mode)
{
	spi_device_interface_config_t conf {
		.command_bits = 0,
		.address_bits = 0,
		.dummy_bits = 0,
		.mode = mode,
		.duty_cycle_pos = 128,
		.cs_ena_pretrans = 0,
		.cs_ena_posttrans = 0,
		.clock_speed_hz = clockFreqHz,
		.input_delay_ns = 0,
		.spics_io_num = csPin,
		.flags = 0,
		.queue_size = 7,
		.pre_cb = nullptr,
		.post_cb = nullptr
	};
	spi_device_handle_t hnd;
	ESP_ERROR_CHECK(spi_bus_add_device(VSPI_HOST, &conf, &hnd));
	references++;
	return hnd;
}

void SPIBus::removeDevice(spi_device_handle_t hnd)
{
	ESP_ERROR_CHECK(spi_bus_remove_device(hnd));
	references--;
}

SPIDevice::SPIDevice(SPIBus& bus, uint8_t csPin, int clockFreqHz, uint8_t mode):
	bus(bus), handle(bus.addDevice(csPin, clockFreqHz, mode))
{}

SPIDevice::~SPIDevice()
{
	bus.removeDevice(handle);
}

