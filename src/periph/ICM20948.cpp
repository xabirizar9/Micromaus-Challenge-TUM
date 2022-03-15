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
	initMagnetometer();
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

void ICM20948::setAccelSensitivity(AccelSensitivity s)
{
	switchBank(2);
	// keep low pass enabled
	spi.write<uint8_t>(REG::ACCEL_CONFIG, 0x01 | (0x06 & (s << 1)));
	switch (s) {
		case ACCEL_RANGE_2G:
			accelScale = 16384.f;
			break;
		case ACCEL_RANGE_4G:
			accelScale = 8192.f;
			break;
		case ACCEL_RANGE_8G:
			accelScale = 4096.f;
			break;
		case ACCEL_RANGE_16G:
			accelScale = 2048.f;
			break;
	}
}

void ICM20948::setGyroSensitivity(GyroSensitivity s)
{
	switchBank(2);
	// keep low pass enabled
	spi.write<uint8_t>(REG::GYRO_CONFIG_1, 0x01 | (0x06 & (s << 1)));
	switch (s) {
		case GYRO_RANGE_250DPS:
			gyroScale = 131.f;
			break;
		case GYRO_RANGE_500DPS:
			gyroScale = 65.5;
			break;
		case GYRO_RANGE_1000DPS:
			gyroScale = 32.8;
			break;
		case GYRO_RANGE_2000DPS:
			gyroScale = 16.4;
			break;
	}
}

void ICM20948::init()
{
	switchBank(0);
	spi.write<uint8_t>(REG::PWR_MGMT_1, 0x80); // reset
	vTaskDelay(100 / portTICK_PERIOD_MS);

	setSleep(false);

	uint8_t id = spi.read<uint8_t>(REG::WHO_AM_I);
	if (id != 0xea) {
		ESP_LOGW(TAG, "ICM module reports wrong id %02hhx", id);
	}

	switchBank(3);
	// i2c master: STOP between reads, default frequency of 370kHz
	spi.write<uint8_t>(REG::I2C_MST_CTRL, 0x10);
	switchBank(0);
	spi.write<uint8_t>(REG::USER_CTRL, 0x30); // DMP disabled, fifo disabled, i2c master enabled, SPI mode.

	setAccelSensitivity(ACCEL_RANGE_2G);
	setGyroSensitivity(GYRO_RANGE_250DPS);
}

void ICM20948::initMagnetometer()
{
	magnetometerWrite(MAG::REG::CONTROL3, 0x01); // soft reset
	vTaskDelay(10 / portTICK_PERIOD_MS);

	uint8_t id = magnetometerRead(MAG::REG::WHO_AM_I);
	if (id != MAG::DEVICE_ID) {
		ESP_LOGW(TAG, "magnetometer reports ID %02hhx", id);
	}

	// set measurement mode 4
	magnetometerWrite(MAG::REG::CONTROL2, 0x08);

	switchBank(3);
	// enable reading 9 bytes per shot starting at address 0x10
	spi.write<uint8_t>(REG::I2C_SLV0_ADDR, 0x0C);
	spi.write<uint8_t>(REG::I2C_SLV0_REG, MAG::REG::STATUS1);
	spi.write<uint8_t>(REG::I2C_SLV0_CTRL, 0x89);

	// i2c master ODR cycle mode
	switchBank(0);
	spi.write<uint8_t>(REG::LP_CONFIG, 0x40);
}

void ICM20948::resetI2CMaster()
{
	switchBank(0);
	const uint8_t ctrl = spi.read<uint8_t>(REG::USER_CTRL);
	spi.write<uint8_t>(REG::USER_CTRL, ctrl | 0x02);
}

void ICM20948::externalI2CStartTransaction(uint8_t addr, uint8_t reg,
		bool isRead)
{
	switchBank(3);
	const uint8_t readFlag = isRead ? 0x80 : 0x00;
	spi.write<uint8_t>(REG::I2C_SLV4_ADDR, readFlag | (0x7f & addr));
	spi.write<uint8_t>(REG::I2C_SLV4_REG, reg);
	spi.write<uint8_t>(REG::I2C_SLV4_CTRL, 0x80); // enable transaction
}

bool ICM20948::externalI2CWaitComplete(unsigned int timeoutMs)
{
	switchBank(0);
	unsigned long long timeoutEnd = esp_timer_get_time() + timeoutMs * 1000UL;
	while (timeoutEnd >= esp_timer_get_time()) {
		uint8_t r = spi.read<uint8_t>(REG::I2C_MST_STATUS);
		if (r & (1 << 6)) { // bit 6 is I2C_SLV4_DONE
			return !(r & (1 << 4)); // bit 4 is I2C_SLV4_NACK
		}
		vPortYield(); // go do something else
	}

	throw ICMTimeout();
}

uint8_t ICM20948::magnetometerRead(uint8_t reg)
{
	externalI2CStartTransaction(MAG::ADDR, reg, true);

	bool ok = externalI2CWaitComplete(100); // todo do something with status
	if (!ok) {
		ESP_LOGE(TAG, "magnetometer read NACKed: %02hhx", reg);
	}

	switchBank(3);
	return spi.read<uint8_t>(REG::I2C_SLV4_DI);
}

void ICM20948::magnetometerWrite(uint8_t reg, uint8_t data)
{
	switchBank(3);
	spi.write<uint8_t>(REG::I2C_SLV4_DO, data);

	externalI2CStartTransaction(MAG::ADDR, reg, false);

	bool ok = externalI2CWaitComplete(100); // todo do something with status
	if (!ok) {
		ESP_LOGE(TAG, "magnetometer write NACKed: %02hhx %02hhx",
				reg, data);
	}
}


Vec<int16_t> ICM20948::readAccelRaw()
{
	switchBank(0);
	Vec<int16_t> out;
	spi.read<int16_t>(REG::ACCEL_XOUT_H, out.buffer.data(),
			out.buffer.size());
	return out;
}

Vec<int16_t> ICM20948::readGyroRaw()
{
	switchBank(0);
	Vec<int16_t> out;
	spi.read<int16_t>(REG::GYRO_XOUT_H, out.buffer.data(),
			out.buffer.size());
	return out;
}

Vec<int16_t> ICM20948::readMagRaw()
{
	switchBank(0);
	Vec<int16_t> d;
	uint8_t status = spi.read<uint8_t>(REG::EXT_SLV_SENS_DATA_00);
	spi.read<int16_t>(REG::EXT_SLV_SENS_DATA_01, d.buffer.data(),
			d.buffer.size());
	ESP_LOGI("mag", "st = %02hhx", status);
	ESP_LOGI("mag", "mx = % 8hi my = % 8hi mz = % 8hi", d.x, d.y, d.z);

	return d;
}

int16_t ICM20948::readTempRaw()
{
	switchBank(0);
	return spi.read<int16_t>(REG::TEMP_OUT_H);
}

Vec<float> ICM20948::readAccel()
{
	auto v = readAccelRaw();
	return v / accelScale;
}

Vec<float> ICM20948::readGyro()
{
	auto v = readGyroRaw();
	return v / gyroScale;
}

float ICM20948::readTemp()
{
	return ((readTempRaw() - ROOM_TEMP_OFFSET) / TEMP_SENSITIVITY) + 21.f;
}
