#pragma once
#include <stdint.h>

#include <iostream>

#include "Controller.hpp"
#include "freertos/FreeRTOS.h"
#include "utils/units.hpp"

// interval in which driver will update command speed
static const uint8_t controlInterval = 50;

const float gridCurveRadius = 90;
const float onSpotRadius = wheelDistance / 2;

class MotionProfile {
   private:
	const uint16_t maxSpeed;
	void optimizePolynom();

   public:
	float a0, a1, a2, a3;
	float distEnd;
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
	void getCurveProfile(uint8_t degrees, uint8_t radius, bool optimize = true);
	void getGridProfile(bool optimize);
	void getStraightProfile(bool optimize);
	void computeVelocityProfile(bool optimize);
	void getPolynomCoefficients();

	MotionProfile(uint16_t speed = 400) : maxSpeed(speed){};
	~MotionProfile();
};

class StraightProfile : public MotionProfile {
   public:
	StraightProfile(int distance, float elapsedTime, uint16_t maxSpeed = 400)
		: MotionProfile(maxSpeed) {
		vStart = 0;
		vEnd = 0;
		distEnd = distance;
		duration = elapsedTime;
		computeVelocityProfile(true);
	};
};

class CurveProfile : public MotionProfile {
   private:
	uint16_t degrees;

   public:
	/**
	 * @brief Construct a new Curve Profile object
	 *
	 * @param degrees degrees as deg
	 * @param radius radius of curve in mm
	 * @param elapsedTime time in seconds
	 * @param startSpeed speed in mm/s
	 * @param endSpeed speed in mm/s
	 */
	CurveProfile(uint16_t degrees,
				 uint16_t radius,
				 float elapsedTime,
				 uint16_t startSpeed = 300,
				 uint16_t endSpeed = 300)
		: MotionProfile(400) {
		this->degrees = degrees;
		this->distEnd = radius * ((float)(this->degrees) / 90.0);
		vStart = startSpeed;
		vEnd = endSpeed;
		duration = elapsedTime;

		getCurveProfile(degrees, radius);
	};
};

class GridProfile : public MotionProfile {
   public:
	GridProfile(uint8_t numGrids, float elapsedTime, int startSpeed, int endSpeed)
		: MotionProfile(1700) {
		vStart = startSpeed;
		vEnd = endSpeed;
		distEnd = (numGrids - 0.5) * mazeCellSize;
		duration = elapsedTime;
		computeVelocityProfile(true);
	};
};