#include "periph/ICM20948.hpp"

#include "support/I2C.hpp"
#include <esp_log.h>

static const char* TAG = "icm";

ICM20948::ICM20948(SPIBus& bus, uint8_t csPin):
	// todo set higher freq
	spi(SPIDevice(bus, csPin, 100'000, 0b00))
{
}

ICM20948::~ICM20948()
{
	ESP_LOGI(TAG, "ICM object destroyed\n");
}

void ICM20948::switchBank(uint8_t bank)
{
}
