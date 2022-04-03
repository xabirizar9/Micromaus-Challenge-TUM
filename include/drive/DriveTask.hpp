#pragma once
#include <stdint.h>

#include "freertos/FreeRTOS.h"
#include "freertos/task.h"

float* getMotionProfilePolynom(
	int64_t& tickStart, int tickEnd, int vStart, int vEnd, TickType_t tStart, TickType_t tEnd);
void driveTask(void* arg);