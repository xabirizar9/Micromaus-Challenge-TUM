#pragma once
#include <string>

class SerialInterface
{
public:
    SerialInterface(uint8_t txPin, uint8_t rxPin);

    void begin(uint32_t baudrate, uint8_t mode);
    void println(std::string msg);
};

// setup serial one
extern SerialInterface Serial;