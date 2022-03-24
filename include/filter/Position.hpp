#pragma once

#include "support/Linalg.hpp"

class RobotPosition {
   public:
	/**
	 * x: position in x direction in meters
	 * y: position in y direction in meters
	 * w: rotation in rad around global z axis; if w == 0, robot x
	 * axis(forward) is aligned with global x axis
	 */
	RobotPosition(float x, float y, float w): pos{x, y, 0}, w(w) {}

	const linalg::Vec<float>& getPosition() const { return pos; }
	float getOrientation() const { return w; }

	linalg::Vec<float> getOrientationVector() const;

   private:
	linalg::Vec<float> pos;
	float w;
};
