#pragma once

#include "support/Linalg.hpp"

namespace nav {
class CardinalDirection {
   public:
	enum the : uint8_t { EAST = 0, NORTH = 1, WEST = 2, SOUTH = 3 };

	explicit constexpr CardinalDirection(int x) : impl(x % 4) {}
	constexpr CardinalDirection(the x) : impl((uint8_t)x) {}

	explicit constexpr operator char() const {
		return "ENWS"[impl];
	}

	constexpr operator uint8_t() const {
		return impl;
	}

	friend inline constexpr int operator-(const CardinalDirection, const CardinalDirection);

   private:
	uint8_t impl;
};

inline constexpr int operator-(const CardinalDirection a, const CardinalDirection b) {
	return (int)a.impl - (int)b.impl;
}

class Heading {
	static constexpr float PI = 3.141592653589793238462643383279502884;

   public:
	constexpr Heading(float angleRad) : angle(angleRad) {}
	constexpr Heading(CardinalDirection cd) : angle((uint8_t)cd * PI / 2) {}

	float toRad() const {
		return angle;
	}
	float toDeg() const {
		return angle / PI * 180.f;
	}

	la::Vec2f toVector() const;

	/**
	 * returns Heading with its angle normalized to the interval
	 * [0; 2 pi)
	 */
	Heading normalized() const;

	/**
	 * Returns the nearest value of EAST, NORTH, WEST, SOUTH
	 */
	CardinalDirection approximateCardinalDirection() const;

   private:
	float angle;  // hading in radians, between global X and robot X axis
};

class RobotPosition {
   public:
	/**
	 * x: position in x direction in centimeters
	 * y: position in y direction in centimeters
	 * w: rotation in rad around global z axis; if w == 0, robot x
	 * axis(forward) is aligned with global x axis
	 */
	constexpr RobotPosition(float x, float y, Heading h) : pos{x, y, 0}, heading(h) {}

	const linalg::Vec<float>& getPosition() const {
		return pos;
	}

	linalg::Vec<float>& getPosition() {
		return pos;
	}

	const Heading& getHeading() const {
		return heading;
	}

	Heading& getHeading() {
		return heading;
	}

   private:
	linalg::Vec<float> pos;
	Heading heading;
};

}  // namespace nav
