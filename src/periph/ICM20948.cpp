#include "periph/ICM20948.hpp"

#include "support/I2C.hpp"
#include <esp_log.h>

static const char* TAG = "icm";

ICM20948::ICM20948(uint8_t sclPin, uint8_t mosiPin, uint8_t misoPin):
	i2c(sclPin, mosiPin)
{
	uint8_t who = i2c.readByteRegister(0x69, 0x00);
	if (who != 0xea)
		ESP_LOGE(TAG, "whoami register of icm at 0x69 should read 0xea, reads 0x%02x", who);

}

ICM20948::~ICM20948()
{
	ESP_LOGI(TAG, "ICM object destroyed\n");
}
