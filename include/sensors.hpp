#pragma once
#include <stdint.h>

namespace Sensors {
struct SensorPacket {
	uint16_t left;
	uint16_t front;
	uint16_t right;
};

extern struct SensorPacket currentInfo;

void someMethod();
}  // namespace Sensors