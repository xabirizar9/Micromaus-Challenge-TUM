#pragma once
#include <stdint.h>

#include <iostream>

#include "Controller.hpp"
#include "freertos/FreeRTOS.h"
#include "utils/units.hpp"

// interval in which driver will update command speed
static const uint8_t controlInterval = 5;

class MotionProfile {
   private:
	const int maxSpeed;
	void optimizePolynom();

   public:
	// float trajectories[numTrajectories];  // empty array with space for storing in each
	// trajectory the given profile parameters
	float a0, a1, a2, a3;
	int distance;
	int vStart;
	int vEnd;
	float duration;
	float* velocityProfile;

	float getSpeedAt(uint16_t index);

	int getMaxSpeed() {
		return maxSpeed;
	}

	// Constructor for straight lines (not grid distances)
	MotionProfile(int distance, float duration) : maxSpeed(400) {
		vStart = 0;
		vEnd = 0;
		distance = mmsToTicks(distance);
		MotionProfile::getStraightProfile(distance, duration, vStart, vEnd, true);
	};
	// Constructor for a grid in straight line
	MotionProfile(uint8_t numGrids, float duration, int vStart, int vEnd) : maxSpeed(1700) {
		vStart = vStart;
		vEnd = vEnd;
		distance = mmsToTicks(numGrids * 180);
		MotionProfile::getGridProfile(distance, duration, vStart, vEnd, true);
	};
	// Constructor for curves
	MotionProfile(uint8_t degrees, float duration) : maxSpeed(700) {
		vStart = 100;
		vEnd = 100;
		MotionProfile::getCurveProfile(90, 1.0, false);
	};

	void optimizeCoefficients();
	void getCurveProfile(uint8_t degrees, int duration, bool optimize);
	void getGridProfile(uint8_t numGrids, float duration, int vStart, int vEnd, bool optimize);
	void getStraightProfile(int distance, float duration, int vStart, int vEnd, bool optimize);
	void computeVelocityProfile(int tickEnd, float duration, int vStart, int vEnd, bool optimize);
	void getPolynomCoefficients(int distance, float tEnd, int vStart, int vEnd);

	~MotionProfile();
	// uint16_t* computeTurnProfile();
	// uint16_t* computeDriveProfile();
	// void computeProfiles(uint16_t speed, uint16_t interval = controlInterval);
};