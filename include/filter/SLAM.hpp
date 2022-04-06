#pragma once

#include "filter/Location.hpp"
#include "filter/Mapping.hpp"

class SLAM {
   public:
	SLAM();

	/**
	 * Predicts the location of the robot given the desired wheel velocities
	 * in cm/s.
	 */
	void predict(float leftVelocity, float rightVelocity);
	void update();

	const RobotPositionDistribution& getPositionDistribution() const {
		return location.getDistribution();
	}

	void pinPosition() {
		location.pin();
	}

   private:
	// last update precision time in microseconds
	unsigned long long lastUpdateTime;
	Location location;
	Mapping mapping;
};
