#pragma once

/**
 * TODO: this must be replaced with a real struct containing the sensor data.
 */
class SensorState;

class RobotPositionDistribution;

class Location {
	/**
	 * Initialize the distribution of the robot position to the given one.
	 */
	void setDistribution(const RobotPositionDistribution&);

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
