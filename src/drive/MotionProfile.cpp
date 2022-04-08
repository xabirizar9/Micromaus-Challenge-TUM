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
	float tickValuesDer = resp[1] + 2 * resp[2] * time + 3 * resp[3] * pow(time, 2);
}

MotionProfile motionProfile;

void runStraight(int distance, float duration) {
	int tickStart = 0;
	int tickEnd = mmsToTicks(distance);
	int vstart = 0;
	int vEnd = 0;
	float tStart = 0.0;
	float tEnd = 2.0;

	float* coefficients = getMotionProfilePolynom(0, tickEnd, 0, 0, 0, tEnd);
	float tickSpeed;

	int numIntervals = (tEnd - tStart) / controlInterval;
	float* velocityProfile[numIntervals];

	int counter = 0;
	int time = 0;

	while (counter <= numIntervals) {
		time = counter * controlInterval;
		// need to solve type conversion error
		tickSpeed = (float)coefficients[1] * time + 2 * coefficients[2] * time +
					3 * coefficients[3] * pow(time, 2);
		*velocityProfile[counter] =
			encoderTicksToMm * tickSpeed;  // check if pointer assignment is corre t
		counter++;
	}
	// TBD: iterate over velocityProfile array and set motor speeds accordingly
}

float* MotionProfile::computeProfile(
	int tickStart, int tickEnd, int vStart, int vEnd, float duration) {
	float* coefficients = getMotionProfilePolynom(tickStart, tickEnd, vStart, vEnd, 0, duration);

	float tickSpeed = 0;
	int counter = 0;
	int time = 0;

	int numIntervals = duration / controlInterval;
	float* velocityProfile;

	while (counter <= numIntervals) {
		time = counter * controlInterval;
		// need to solve type conversion error
		tickSpeed = (float)coefficients[1] * time + 2 * coefficients[2] * time +
					3 * coefficients[3] * pow(time, 2);
		velocityProfile[counter] =
			encoderTicksToMm * tickSpeed;  // check if pointer assignment is corre t
		counter++;
	}
	return velocityProfile;
}

float* MotionProfile::getCurveProfile(int degrees, int duration) {
	int tickEnd = mmsToTicks(141.37);  // a curve of pi/2 with r=90mm is 141.37mm
	float* coefficients;
	if (degrees == 180) {
		tickEnd *= 2;
	}

	return MotionProfile::computeProfile(0, tickEnd, 100, 100, duration);
}

float* MotionProfile::getStraightProfile(int numGrids,
										 int duration,
										 int initialSpeed,
										 int finalSpeed) {
	int tickEnd = mmsToTicks(numGrids * 16);

	return MotionProfile::computeProfile(0, tickEnd, initialSpeed, finalSpeed, duration);
}

float* getMotionProfilePolynom(int distance, int vStart, int vEnd, float tEnd) {
	static float* resp = new float[4];

	vStart = convertMMsToTPS(vStart);
	vEnd = convertMMsToTPS(vEnd);

	resp[0] = 0;
	resp[1] = vStart;
	resp[2] = 3 / pow(tEnd, 2) * distance - vStart * 2 / tEnd - vEnd * 1 / tEnd;
	resp[3] = -2 * distance * 1 / pow(tEnd, 3) + (vEnd + vStart) / pow(tEnd, 2);

	return resp;
}