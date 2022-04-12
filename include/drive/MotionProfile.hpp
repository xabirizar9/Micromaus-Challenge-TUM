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
	float tickEnd;
	int vStart;
	int vEnd;
	float duration;
	float* velocityProfile;

	float getSpeedAt(uint16_t index);

	int getMaxSpeed() {
		return maxSpeed;
	}

	// Constructor for straight lines (not grid distances)
	MotionProfile(int distance, float elapsedTime) : maxSpeed(400) {
		vStart = 0;
		vEnd = 0;
		tickEnd = mmsToTicks(distance);
		duration = elapsedTime;
		getStraightProfile(true);
	};
	// Constructor for a grid in straight line
	MotionProfile(uint8_t numGrids, float elapsedTime, int startSpeed, int endSpeed)
		: maxSpeed(1700) {
		vStart = startSpeed;
		vEnd = endSpeed;
		tickEnd = mmsToTicks(numGrids * 180);
		duration = elapsedTime;
		getGridProfile(true);
	};
	// Constructor for curves
	MotionProfile(uint8_t degrees, float elapsedTime) : maxSpeed(700) {
		vStart = 100;
		vEnd = 100;
		duration = elapsedTime;
		getCurveProfile(90, false);
	};

	void optimizeCoefficients();
	void getCurveProfile(uint8_t degrees, bool optimize);
	void getGridProfile(bool optimize);
	void getStraightProfile(bool optimize);
	void computeVelocityProfile(bool optimize);
	void getPolynomCoefficients();

	~MotionProfile();
	// uint16_t* computeTurnProfile();
	// uint16_t* computeDriveProfile();
	// void computeProfiles(uint16_t speed, uint16_t interval = controlInterval);
};