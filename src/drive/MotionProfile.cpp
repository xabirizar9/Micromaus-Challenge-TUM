#include "drive/MotionProfile.hpp"

#include <algorithm>
#include <cmath>

#include "Controller.hpp"
#include "drive/DriveTask.hpp"
#include "drive/LaneTask.hpp"
#include "freertos/FreeRTOS.h"
#include "freertos/queue.h"
#include "message.pb.h"
#include "nav/MazeSolver.hpp"
#include "periph/Motor.hpp"
#include "utils/units.hpp"
static const char* tag = "[drive]";

void computeTrajectories(void* arg, int numGridElements) {
	RobotDriver* driver = (RobotDriver*)arg;
	Controller* controller = driver->controller;

	int gridInTicks = mmsToTicks(numGridElements * 16);

	int vMax = 500;
	int64_t tickStart =
		controller->getEncoder(left)->getTotalCounter();  // total counter of encoder ticks

	int vStart = controller->getSpeed();
	int vEnd = 50;
	TickType_t tStart = xTaskGetTickCount();  // get processor tick count
	TickType_t tEnd = pdMS_TO_TICKS(1000 / (vMax * 0.9));

	uint64_t time = xTaskGetTickCount() - tStart;

	float* resp = getMotionProfilePolynom(tickStart, gridInTicks, vStart, vEnd, tStart, tEnd);

	float tickValues = resp[0] + resp[1] * time + resp[2] * pow(time, 2) + resp[3] * pow(time, 3);
	float tickValuesDer = resp[1] * time + 2 * resp[2] * time + 3 * resp[3] * pow(time, 2);
}

MotionProfile motionProfile;

float* getMotionProfilePolynom(
	int64_t& tickStart, int tickEnd, int vStart, int vEnd, TickType_t tStart, TickType_t tEnd) {
	static float* resp = new float[4];
	int b0, b1, b2, b3;
	float ticksTime, tDiff, tickDiff;
	float tEnd2, tStart2, tEnd3, tStart3;

	tDiff = tEnd - tStart;
	tickDiff = tickEnd - tickStart;
	ticksTime = tickDiff / tDiff;

	b0 = tickStart;
	b1 = tickDiff;
	b2 = vStart - ticksTime;
	b3 = vEnd + vStart - 2 * ticksTime;

	tStart2 = pow(tStart, 2);
	tStart3 = pow(tStart, 3);
	tEnd2 = pow(tEnd, 2);
	tEnd3 = pow(tEnd, 3);

	resp[3] = b3 / (tEnd2 + tStart2 + 4 * tEnd * tStart);
	resp[2] = (resp[3] * (2 * tStart2 - tEnd2 + 2 * tEnd * tStart) - b2) / tDiff;
	resp[1] = (b1 - resp[2] * (tEnd2 - tStart2) - resp[3] * (tEnd3 - tStart3)) / tDiff;
	resp[0] = b0 - resp[1] * tStart + resp[2] * tStart2 + resp[3] * tStart3;

	return resp;
}