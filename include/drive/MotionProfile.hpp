#pragma once
#include <stdint.h>

#include <iostream>

#include "Controller.hpp"
#include "freertos/FreeRTOS.h"
#include "utils/units.hpp"

// interval in which driver will update command speed
static const uint8_t controlInterval = 50;

class MotionProfile {
   private:
	const uint16_t maxSpeed;
	void optimizePolynom();

   public:
	// float trajectories[numTrajectories];  // empty array with space for storing in each
	// trajectory the given profile parameters
	float a0, a1, a2, a3;
	float tickEnd;
	int vStart;
	int vEnd;
	float duration;
	uint16_t numIntervals;
	uint16_t* velocityProfile = NULL;

	float getSpeedAt(uint16_t index);

	int getMaxSpeed() {
		return maxSpeed;
	}

	// Constructor for straight lines (not grid distances)
	MotionProfile(int distance, float elapsedTime, uint16_t maxSpeed = 400) : maxSpeed(maxSpeed) {
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
	MotionProfile(uint8_t degrees,
				  float elapsedTime,
				  uint16_t startSpeed = 0,
				  uint16_t endSpeed = 0,
				  uint16_t maxSpeed = 400)
		: maxSpeed(maxSpeed) {
		vStart = startSpeed;
		vEnd = endSpeed;
		duration = elapsedTime;
		getCurveProfile(degrees, true);
	};

	void optimizeCoefficients();
	void getCurveProfile(uint8_t degrees, bool optimize);
	void getGridProfile(bool optimize);
	void getStraightProfile(bool optimize);
	void computeVelocityProfile(bool optimize);
	void getPolynomCoefficients();

	~MotionProfile();
};