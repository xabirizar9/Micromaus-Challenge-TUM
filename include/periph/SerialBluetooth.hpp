#pragma once
#include <string>

namespace SerialBluetooth
{
    void begin(std::string name);

    void write(uint32_t test);

    static char *bda2str(uint8_t *bda, char *str, size_t size);
};