#include "periph/ICM20948.hpp"

#include "support/I2C.hpp"
#include "periph/icm_registers.hpp"
#include <esp_log.h>
#include <freertos/task.h>

using namespace linalg;

static const char* TAG = "icm";

ICM20948::ICM20948(SPIBus& bus, uint8_t csPin):
	// todo set higher freq
	spi(SPIDevice(bus, csPin, 100'000, 0b00)),
	currentBank(0xff) // not a bank
{
	init();
}

ICM20948::~ICM20948()
{
	ESP_LOGI(TAG, "ICM object destroyed\n");
}

void ICM20948::switchBank(uint8_t bank)
{
	if (currentBank != bank) {
		spi.write<uint8_t>(0x7f, bank << 4);
		currentBank = bank;
	}
}

void ICM20948::setSleep(bool sleep)
{
	switchBank(0);
	// also sets clock to internal
	spi.write<uint8_t>(REG::PWR_MGMT_1, 0x01 | (sleep ? 0x40 : 0x00));
}

void ICM20948::init()
{
	switchBank(0);
	spi.write<uint8_t>(REG::PWR_MGMT_1, 0x80); // reset
	vTaskDelay(100 / portTICK_PERIOD_MS);

	uint8_t id = spi.read<uint8_t>(REG::WHO_AM_I);
	if (id != 0xea) {
		ESP_LOGW(TAG, "ICM module reports wrong id %02hhx", id);
	}

	spi.write<uint8_t>(REG::USER_CTRL, 0x30); // DMP disabled, fifo disabled, i2c master enabled, SPI mode.
	setSleep(false); // power up the sensors

}

Vec<int16_t> ICM20948::readAccelRaw()
{
	switchBank(0);
	return {
		spi.read<int16_t>(REG::ACCEL_XOUT_H),
		spi.read<int16_t>(REG::ACCEL_YOUT_H),
		spi.read<int16_t>(REG::ACCEL_ZOUT_H)
	};
}
