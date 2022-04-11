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

static const char* tag = "[motion]";

MotionProfile::~MotionProfile() {
	ESP_LOGI(tag, "Movement completed");
}

void MotionProfile::getPolynomCoefficients(int distance, float tEnd, int vStart, int vEnd) {
	vStart = convertMMsToTPS(vStart);
	vEnd = convertMMsToTPS(vEnd);

	MotionProfile::a0 = 0;
	MotionProfile::a1 = vStart;
	MotionProfile::a2 = 3 / pow(tEnd, 2) * distance - vStart * 2 / tEnd - vEnd * 1 / tEnd;
	MotionProfile::a3 = -2 * distance * 1 / pow(tEnd, 3) + (vEnd + vStart) / pow(tEnd, 2);
}

float* runStraight(int distance, float duration) {
	int counter = 0;
	int time = 0;
	int numIntervals = duration / controlInterval;

	MotionProfile straightProfile(distance, duration);

	return straightProfile.velocityProfile;
	// TBD: iterate over velocityProfile array and set motor speeds accordingly
}

float MotionProfile::getSpeedAt(uint16_t index) {
	return MotionProfile::velocityProfile[index];
}

// We get coefficients as pointers, so they should be modified at adress
void MotionProfile::optimizeCoefficients() {
	int16_t tempVmax = 0;
	uint8_t counter = 0;
	int speedLowerBound = 0.98 * MotionProfile::maxSpeed;
	while (!(tempVmax >= speedLowerBound and tempVmax <= MotionProfile::maxSpeed)) {
		if (tempVmax <= speedLowerBound)
			duration -= 0.01;
		else if (tempVmax <= MotionProfile::maxSpeed)
			duration += 0.01;
		MotionProfile::getPolynomCoefficients(MotionProfile::distance,
											  MotionProfile::duration,
											  MotionProfile::vStart,
											  MotionProfile::vEnd);
		tempVmax = encoderTicksToMm *
				   (MotionProfile::a1 - 0.33333 * pow(MotionProfile::a2, 2) / MotionProfile::a3);
		if (counter == 100)
			break;
	}
}

void MotionProfile::getCurveProfile(uint8_t degrees, int duration, bool optimize = false) {
	int tickEnd = mmsToTicks(141.37);  // a curve of pi/2 with r=90mm is 141.37mm long
	float* coefficients;
	if (degrees == 180) {
		tickEnd *= 2;
	}

	MotionProfile::computeVelocityProfile(
		tickEnd, duration, MotionProfile::vStart, MotionProfile::vEnd, false);
}

void MotionProfile::getStraightProfile(int distance,
									   float duration = 2.0,
									   int initialSpeed = 0,
									   int finalSpeed = 0,
									   bool optimize = true) {
	int tickEnd = mmsToTicks(distance);

	MotionProfile::computeVelocityProfile(tickEnd, initialSpeed, finalSpeed, duration, true);
}

void MotionProfile::getGridProfile(uint8_t numGrids,
								   float duration = 2.0,
								   int initialSpeed = 0,
								   int finalSpeed = 100,
								   bool optimize = true) {
	int tickEnd = mmsToTicks(numGrids * 160);

	MotionProfile::computeVelocityProfile(tickEnd, initialSpeed, finalSpeed, duration, true);
}

void MotionProfile::computeVelocityProfile(
	int tickEnd, float duration, int vStart, int vEnd, bool optimize) {
	MotionProfile::getPolynomCoefficients(tickEnd, vStart, vEnd, duration);
	if (optimize) {
		MotionProfile::optimizeCoefficients();
	}
	float tickSpeed = 0;
	int counter = 0;
	int time = 0;

	int numIntervals = duration / controlInterval;
	MotionProfile::velocityProfile = new float[numIntervals];

	while (counter <= numIntervals) {
		time = counter * controlInterval;
		// need to solve type conversion error
		tickSpeed = ((float)MotionProfile::a1 * time + 2 * MotionProfile::a2 * time +
					 3 * MotionProfile::a3 * pow(time, 2));
		MotionProfile::velocityProfile[counter] =
			encoderTicksToMm * tickSpeed;  // check if pointer assignment is corre t
		counter++;
	}
}