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
	if (velocityProfile != NULL) {
		delete velocityProfile;
	}
}

void MotionProfile::getPolynomCoefficients() {
	a0 = 0;
	a1 = vStart;
	a2 = (3 / pow(duration, 2)) * distEnd - vStart * 2 / duration - vEnd / duration;
	a3 = -2 * distEnd / pow(duration, 3) + (vEnd + vStart) / pow(duration, 2);
}

float MotionProfile::getSpeedAt(uint16_t index) {
	return velocityProfile[index];
}

// We get coefficients as pointers, so they should be modified at adress
void MotionProfile::optimizeCoefficients() {
	double tempVmax = 0;
	uint8_t counter = 0;
	double speedLowerBound = 0.98 * maxSpeed;
	while (!(tempVmax >= speedLowerBound and tempVmax <= MotionProfile::maxSpeed)) {
		if (tempVmax <= speedLowerBound)
			duration -= 0.01;
		else if (tempVmax <= maxSpeed)
			duration += 0.01;
		getPolynomCoefficients();
		tempVmax = a1 - 0.33333 * pow(a2, 2) / a3;
		if (counter == 200)
			break;
		counter++;
		vTaskDelay(pdMS_TO_TICKS(1));
	}
}

void MotionProfile::getCurveProfile(uint8_t degrees, uint8_t radius, bool optimize) {
	float radians = degrees * (PI / 180);
	distEnd = radians * radius;	 // a curve of pi/2 with r=90mm is 141.37mm long
	computeVelocityProfile(optimize);
}

void MotionProfile::getStraightProfile(bool optimize = true) {
	computeVelocityProfile(true);
}

void MotionProfile::getGridProfile(bool optimize = true) {
	computeVelocityProfile(true);
}

void MotionProfile::computeVelocityProfile(bool optimize) {
	getPolynomCoefficients();
	if (optimize) {
		optimizeCoefficients();
	}
	int counter = 0;
	float time = 0;
	numIntervals = (uint16_t)ceil(duration / ((float)controlInterval / 1000.0)) + 1;

	if (velocityProfile != NULL) {
		delete velocityProfile;
	}
	velocityProfile = new uint16_t[numIntervals];

	uint32_t stepInterval = pdMS_TO_TICKS(3);

	while (counter < numIntervals) {
		if (counter == numIntervals - 1) {
			time = duration;
		} else {
			time = (float)counter * ((float)controlInterval / 1000);
		}
		velocityProfile[counter] = (a1 * time + 2 * a2 * time + 3 * a3 * pow(time, 2));
		counter++;
		vTaskDelay(stepInterval);
	}
}