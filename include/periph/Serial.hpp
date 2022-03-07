#pragma once
#include <string_view>

class SerialInterface
{
public:
	virtual ~SerialInterface() = default;

    virtual void write(std::string_view msg) = 0;
    virtual void println(std::string_view msg) = 0;
};

class HardwareSerial: public SerialInterface
{
public:
	/* 
	 * currently we only support uart 0
	 * these defaults are for ESP32, so maybe need to be changed on S2
	 */
    HardwareSerial(uint8_t txPin = 1, uint8_t rxPin = 3);
	virtual ~HardwareSerial() override = default;

    void setBaudrate(uint32_t baudrate);

    virtual void write(std::string_view msg) override;
    virtual void println(std::string_view msg) override;
};

