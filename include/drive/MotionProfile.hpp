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

	void optimizeCoefficients();
	void getCurveProfile(uint8_t degrees, bool optimize);
	void getGridProfile(bool optimize);
	void getStraightProfile(bool optimize);
	void computeVelocityProfile(bool optimize);
	void getPolynomCoefficients();

	MotionProfile(uint16_t speed) : maxSpeed(speed){};
	~MotionProfile();
};

class StraightProfile : public MotionProfile {
   public:
	StraightProfile(int distance, float elapsedTime, uint16_t maxSpeed = 400)
		: MotionProfile(maxSpeed) {
		vStart = 0;
		vEnd = 0;
		tickEnd = mmsToTicks(distance);
		duration = elapsedTime;
		getStraightProfile(true);
	};
};

class CurveProfile : public MotionProfile {
   public:
	CurveProfile(uint8_t degrees,
				 float elapsedTime,
				 uint16_t startSpeed = 300,
				 uint16_t endSpeed = 300)
		: MotionProfile(400) {
		vStart = startSpeed;
		vEnd = endSpeed;
		duration = elapsedTime;
		getCurveProfile(degrees, true);
	};
};

class GridProfile : public MotionProfile {
   public:
	GridProfile(uint8_t numGrids, float elapsedTime, int startSpeed, int endSpeed)
		: MotionProfile(1700) {
		vStart = startSpeed;
		vEnd = endSpeed;
		tickEnd = mmsToTicks(numGrids * mazeCellSize);
		duration = elapsedTime;
		getGridProfile(true);
	};
};