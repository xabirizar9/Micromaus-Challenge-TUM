#pragma once

#include <cstdint>
#include <exception>
#include "support/SPI.hpp"
#include "support/Linalg.hpp"

class ICMTimeout: public std::exception
{
	const char* what() const noexcept override {
		return "timeout occured in ICM module";
	}
};

class ICM20948
{
public:
	enum AccelSensitivity: uint8_t {
		ACCEL_RANGE_2G = 0,
		ACCEL_RANGE_4G = 1,
		ACCEL_RANGE_8G = 2,
		ACCEL_RANGE_16G = 3,
	};

	enum GyroSensitivity: uint8_t {
		GYRO_RANGE_250DPS = 0,
		GYRO_RANGE_500DPS = 1,
		GYRO_RANGE_1000DPS = 2,
		GYRO_RANGE_2000DPS = 3
	};

	ICM20948(SPIBus& bus, uint8_t csPin);
	~ICM20948();

	/* passing true puts device to sleep
	 * the wake-up will take max. 40 ms according to datasheet
	 */
	void setSleep(bool sleep);

	/* set accelerometer sensitivity */
	void setAccelSensitivity(AccelSensitivity);

	/* set gyroscope sensitivity */
	void setGyroSensitivity(GyroSensitivity);

	linalg::Vec<int16_t> readAccelRaw();
	linalg::Vec<int16_t> readGyroRaw();
	linalg::Vec<int16_t> readMagRaw();
	int16_t readTempRaw();

	/// read temperature in celsius
	float readTemp(); 

	/// read acceleration in units of g
	linalg::Vec<float> readAccel();

	/// read gyroscope in units of degrees per second
	linalg::Vec<float> readGyro();

	/// read magnetometer data in microtesla
	linalg::Vec<float> readMag();

private:
	static constexpr float ROOM_TEMP_OFFSET = 0; // LSB
	static constexpr float TEMP_SENSITIVITY = 333.87; // LSB/Kelvin
	static constexpr float MAGNETOMETER_SCALE = 0.15; // microtesla / LSB

	void switchBank(uint8_t bank);
	void init();
	void initMagnetometer();

	void resetI2CMaster();

	void externalI2CStartTransaction(uint8_t addr, uint8_t reg, bool isRead);
	/// returns true if the transaction was answered with an ACK.
	bool externalI2CWaitComplete(unsigned int timeoutMs);
	uint8_t magnetometerRead(uint8_t reg);
	void magnetometerWrite(uint8_t reg, uint8_t data);

	SPIDevice spi;
	uint8_t currentBank;
	float accelScale; // LSB / g
	float gyroScale; // LSB / dps
};

