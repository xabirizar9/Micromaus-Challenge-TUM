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
		.command_bits = 1,
		.address_bits = 7,
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

/*
 * this is a template. during compilation, the template will be
 * "instantiated" into a "specialization". this means that T will be
 * replaced by a type specified by the user of the function.
 * however, the code must be known at instantiation time.
 * this means the function must either be defined in the header file
 * or, like in this case, a limited number of specializations is put
 * at the bottom of the source file.
 * if you need a different specialization, like
 * SPIDevice::write<wchar_t>, you need to put an explicit specialization
 * for that at the bottom.
 *
 * c++ also supports template argument deduction. this means that if you
 * call write() with a uint16_t data argument, it will automatically use
 * write<uint16_t>(). note that in this case, this is super dangerous.
 * if you did some computations in the expression passed to write(), it
 * might have been widened to unsigned int, in which case
 * write<uint32_t>() will be used.
 * so to use this function, always explicitly specify the template
 * parameter
 */
template<typename T>
void SPIDevice::write(uint8_t reg, T data)
{
	/* this is an assert that happens at compile time so you get an
	 * error when you specialize with a type too large for the buffer */
	static_assert(sizeof(T) <= 4,
			"this function supports only types with max. 4 bytes");
	/* this is as constant that may be evaluated at compile time */
	constexpr uint8_t N = sizeof(T);

	spi_transaction_t trans {
		.flags = SPI_TRANS_USE_TXDATA | SPI_TRANS_USE_RXDATA,
		.cmd = 0b0, // write
		.addr = reg, // msb will be ignored
		.length = N * 8, // number of bits
		.rxlength = 0,
		.user = nullptr,
		.tx_data {
			/* the compiler will optimize this away even if you write
			 * it as a loop. i encourage everyone to put this into
			 * compiler explorer */
			(N > 0) ? (uint8_t) ((data >> ((N - 1) * 8)) & 0xff) : (uint8_t) 0,
			(N > 1) ? (uint8_t) ((data >> ((N - 2) * 8)) & 0xff) : (uint8_t) 0,
			(N > 2) ? (uint8_t) ((data >> ((N - 3) * 8)) & 0xff) : (uint8_t) 0,
			(N > 3) ? (uint8_t) (data & 0xff) : (uint8_t) 0,
		},
		.rx_data {}
	};
	ESP_ERROR_CHECK(spi_device_transmit(handle, &trans));
}

template<typename T>
T SPIDevice::read(uint8_t reg)
{
	static_assert(sizeof(T) <= 4,
			"this function supports only types with max. 4 bytes");
	constexpr uint8_t N = sizeof(T);
	spi_transaction_t trans {
		.flags = SPI_TRANS_USE_TXDATA | SPI_TRANS_USE_RXDATA,
		.cmd = 0b1, // read
		.addr = reg, // msb will be ignored
		.length = 0,
		.rxlength = N * 8,
		.user = nullptr,
		.tx_data {},
		.rx_data {},
	};
	ESP_ERROR_CHECK(spi_device_transmit(handle, &trans));
	return (
			((N > 0) ? trans.tx_data[0] << ((N - 1) * 8) : 0) +
			((N > 1) ? trans.tx_data[1] << ((N - 2) * 8) : 0) +
			((N > 2) ? trans.tx_data[2] << ((N - 3) * 8) : 0) +
			((N > 3) ? trans.tx_data[3] << ((N - 4) * 8) : 0)
		   );
}

/* i know i said dont use macros */
#define RW_INSTANTIATE(T) \
	template void SPIDevice::write<T>(uint8_t, T); \
	template T SPIDevice::read<T>(uint8_t);

RW_INSTANTIATE(uint8_t)
RW_INSTANTIATE(int8_t)
RW_INSTANTIATE(uint16_t)
RW_INSTANTIATE(int16_t)
RW_INSTANTIATE(uint32_t)
RW_INSTANTIATE(int32_t)

