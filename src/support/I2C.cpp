#include "support/I2C.hpp"

#include <driver/i2c.h>
#include <esp_log.h>

static const char* TAG = "I2C";

static const i2c_port_t defaultPort = I2C_NUM_0;

I2CMaster::I2CMaster(uint8_t sclPin, uint8_t sdaPin) {
	ESP_ERROR_CHECK(i2c_driver_install(defaultPort, I2C_MODE_MASTER, 0, 0, 0));

	i2c_config_t conf{.mode = I2C_MODE_MASTER,
					  .sda_io_num = sdaPin,
					  .scl_io_num = sclPin,
					  .sda_pullup_en = GPIO_PULLUP_ENABLE,
					  .scl_pullup_en = GPIO_PULLUP_ENABLE,
					  .master{
						  .clk_speed = 100'000,
					  },
					  .clk_flags = 0};
	ESP_ERROR_CHECK(i2c_param_config(defaultPort, &conf));
}

I2CMaster::~I2CMaster() {
	i2c_driver_delete(defaultPort);
}

void I2CMaster::selectRegister(uint8_t deviceAddr, uint8_t regNo) {
	i2c_cmd_handle_t link = i2c_cmd_link_create();
	ESP_ERROR_CHECK(i2c_master_start(link));
	ESP_ERROR_CHECK(i2c_master_write_byte(link, (deviceAddr << 1) | I2C_MASTER_WRITE, 1));
	i2c_master_write_byte(link, regNo, 1);
	ESP_ERROR_CHECK(i2c_master_stop(link));
	esp_err_t err = i2c_master_cmd_begin(defaultPort, link, 50 / portTICK_RATE_MS);
	i2c_cmd_link_delete(link);
	if (err != ESP_OK) {
		ESP_LOGE(TAG, "write err: 0x%02x\n", err);
		// TODO
	}
}

uint8_t I2CMaster::readByte(uint8_t deviceAddr) {
	uint8_t data;

	i2c_cmd_handle_t link = i2c_cmd_link_create();
	ESP_ERROR_CHECK(i2c_master_start(link));
	ESP_ERROR_CHECK(i2c_master_write_byte(link, (deviceAddr << 1) | I2C_MASTER_READ, 1));
	ESP_ERROR_CHECK(i2c_master_read_byte(link, &data, I2C_MASTER_LAST_NACK));
	ESP_ERROR_CHECK(i2c_master_stop(link));
	esp_err_t err = i2c_master_cmd_begin(defaultPort, link, 50 / portTICK_RATE_MS);
	i2c_cmd_link_delete(link);
	if (err != ESP_OK) {
		ESP_LOGE(TAG, "read err: 0x%02x\n", err);
		// TODO
	}
	return data;
}

uint8_t I2CMaster::readByteRegister(uint8_t deviceAddr, uint8_t regNo) {
	selectRegister(deviceAddr, regNo);
	return readByte(deviceAddr);
}

void I2CMaster::writeByteRegister(uint8_t deviceAddr, uint8_t regNo, uint8_t data) {
	i2c_cmd_handle_t link = i2c_cmd_link_create();
	ESP_ERROR_CHECK(i2c_master_start(link));
	ESP_ERROR_CHECK(i2c_master_write_byte(link, (deviceAddr << 1) | I2C_MASTER_WRITE, 1));
	ESP_ERROR_CHECK(i2c_master_write_byte(link, regNo, 1));
	ESP_ERROR_CHECK(i2c_master_write_byte(link, data, 1));
	ESP_ERROR_CHECK(i2c_master_stop(link));
	esp_err_t err = i2c_master_cmd_begin(defaultPort, link, 50 / portTICK_RATE_MS);
	i2c_cmd_link_delete(link);
	if (err != ESP_OK) {
		ESP_LOGE(TAG, "write err: 0x%02x\n", err);
		// TODO
	}
}
