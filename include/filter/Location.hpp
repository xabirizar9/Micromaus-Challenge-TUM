#pragma once

#include "filter/RobotPositionDistribution.hpp"
/**
 * TODO: this must be replaced with a real struct containing the sensor data.
 */
class SensorState;

class Location {
	/**
	 * initializes the robot position to the center of the (0, 0) field,
	 * which is (9cm, 9cm, EAST) and a std-derivation of (9cm, 9cm, 45deg)
	 */
	Location();

	/**
	 * Initialize the distribution of the robot position to the given one.
	 */
	void setDistribution(const RobotPositionDistribution& n) {
		rdp = n;
	}

	/**
	 * Predicts the location of the robot given the desired wheel velocities
	 * in cm/s and the time delta in seconds.
	 */
	void predict(float leftVelocity, float rightVelocity, float delT);

	/**
	 * Updates the location of the robot given the Sensor data of the
	 * measurement
	 */
	void update(const SensorState&);

   private:
	RobotPositionDistribution rpd;
};
