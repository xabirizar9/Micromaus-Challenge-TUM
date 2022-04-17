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

#define MAX_SPEED 500

class MotionProfile {
   private:
	const uint16_t maxSpeed;
	void optimizePolynom();

   public:
	float a0, a1, a2, a3;
	float distance;
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
	void computeVelocityProfile(bool optimize);
	void getPolynomCoefficients();

	MotionProfile(uint16_t speed = 400) : maxSpeed(speed){};
	~MotionProfile();
};

class StraightProfile : public MotionProfile {
   public:
	StraightProfile(int distance,
					uint16_t startSpeed = 0,
					uint16_t endSpeed = 0,
					uint16_t targetSpeed = 300,
					uint16_t maxSpeed = MAX_SPEED)
		: MotionProfile(maxSpeed) {
		vStart = startSpeed;
		vEnd = endSpeed;
		this->distance = distance;
		duration = (float)distance / (float)targetSpeed;
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
	 * @param startSpeed speed in mm/s
	 * @param endSpeed speed in mm/s
	 */
	CurveProfile(uint16_t degrees,
				 uint16_t radius,
				 uint16_t startSpeed = 0,
				 uint16_t endSpeed = 0,
				 uint16_t targetSpeed = 300,
				 uint16_t maxSpeed = MAX_SPEED)
		: MotionProfile(maxSpeed) {
		this->degrees = degrees;

		vStart = startSpeed;
		vEnd = endSpeed;

		float radians = degrees * (PI / 180);
		distance = radians * radius;
		duration = distance / (float)targetSpeed;

		computeVelocityProfile(true);
	};
};

class GridProfile : public MotionProfile {
   public:
	GridProfile(uint8_t numGrids,
				uint16_t startSpeed = 0,
				uint16_t endSpeed = 0,
				uint16_t targetSpeed = 300,
				uint16_t maxSpeed = MAX_SPEED)
		: MotionProfile(maxSpeed) {
		vStart = startSpeed;
		vEnd = endSpeed;

		distance = numGrids * mazeCellSize;
		duration = (float)distance / (float)targetSpeed;

		computeVelocityProfile(true);
	};
};