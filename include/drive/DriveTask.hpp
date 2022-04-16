
#include <stdint.h>

#include "Controller.hpp"
#include "freertos/FreeRTOS.h"

float* getMotionProfilePolynom(
	int64_t& tickStart, int tickEnd, int vStart, int vEnd, TickType_t tStart, TickType_t tEnd);
void driveTask(void* arg);
