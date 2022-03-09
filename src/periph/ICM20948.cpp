#include "periph/ICM20948.hpp"

#include "support/I2C.hpp"
#include <esp_log.h>

static const char* TAG = "icm";

static const uint8_t ADDR = 0x69;

ICM20948::ICM20948(uint8_t sclPin, uint8_t mosiPin, uint8_t misoPin):
	i2c(sclPin, mosiPin)
{
	uint8_t who = i2c.readByteRegister(ADDR, 0x00);
	if (who != 0xea)
		ESP_LOGE(TAG, "whoami register of icm at 0x69 should read 0xea, reads 0x%02x", who);

}

ICM20948::~ICM20948()
{
	ESP_LOGI(TAG, "ICM object destroyed\n");
}

void ICM20948::switchBank(uint8_t bank)
{
	i2c.writeByteRegister(ADDR, 0x7f, bank);
}
