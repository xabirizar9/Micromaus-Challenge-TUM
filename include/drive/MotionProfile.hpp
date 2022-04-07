#pragma once
#include <stdint.h>

#include <iostream>

#include "Controller.hpp"
#include "freertos/FreeRTOS.h"
#include "utils/units.hpp"
static const char* tag = "[drive]";

// interval in which driver will update command speed
static const uint8_t controlInterval = 5;

class MotionProfile {
   private:
	const int maxSpeed;

   public:
	// float trajectories[numTrajectories];  // empty array with space for storing in each
	// trajectory the given profile parameters
	float a0, a1, a2, a3;
	int grid;

	int getMaxSpeed() {
		return maxSpeed;
	}

	MotionProfile(int numBoxes) : maxSpeed(500) {
		grid = numBoxes;
	};

	~MotionProfile() {
		ESP_LOGI(tag, "Movement completed");
	};

	// uint16_t* computeTurnProfile();
	// uint16_t* computeDriveProfile();
	// void computeProfiles(uint16_t speed, uint16_t interval = controlInterval);
};