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
	RobotPosition(float x, float y, float w) : pos{x, y}, w(w) {}

	const la::Vec2f& getPosition() const {
		return pos;
	}
	float getOrientation() const {
		return w;
	}

	la::Vec2f getOrientationVector() const;

   private:
	la::Vec2f pos;
	float w;
};
