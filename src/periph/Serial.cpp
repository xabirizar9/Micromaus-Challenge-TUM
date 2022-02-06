#include "periph/Serial.hpp"
#include "config.h"

SerialInterface::SerialInterface(uint8_t txPin, uint8_t rxPin)
{
    // TODO: configute pings for serial com here
}

void SerialInterface::begin(uint32_t baudrate, uint8_t mode)
{
    // TODO: needs to be implemented
    return;
};

void SerialInterface::println(std::string msg){
    // TODO: send one line of chars here
};

SerialInterface Serial = SerialInterface(SERIAL_1_TX, SERIAL_1_RX);