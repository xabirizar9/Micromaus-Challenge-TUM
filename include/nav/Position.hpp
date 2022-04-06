#pragma once

#include "support/Linalg.hpp"

namespace nav {
class CardinalDirection {
   public:
	enum the : int8_t { EAST = 0, NORTH = 1, WEST = 2, SOUTH = 3 };

	explicit constexpr CardinalDirection(int8_t x) : impl(x % 4) {}
	constexpr CardinalDirection(the x) : impl((int8_t)x) {}

	explicit constexpr operator char() const {
		return "ENWS"[impl];
	}

	constexpr operator int8_t() const {
		return impl;
	}

	friend inline constexpr int8_t operator-(const CardinalDirection, const CardinalDirection);

	friend inline constexpr int8_t operator-(const CardinalDirection, const CardinalDirection::the);

   private:
	int8_t impl;
};

inline constexpr int8_t operator-(const CardinalDirection a, const CardinalDirection b) {
	return (int8_t)a.impl - (int8_t)b.impl;
}
inline constexpr int8_t operator-(const CardinalDirection a, const CardinalDirection::the b) {
	return (int8_t)a.impl - (int8_t)b;
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

	const la::Vec2f& getPosition() const {
		return pos;
	}

	la::Vec2f& getPosition() {
		return pos;
	}

	const Heading& getHeading() const {
		return heading;
	}

	Heading& getHeading() {
		return heading;
	}

   private:
	la::Vec2f pos;
	Heading heading;
};

}  // namespace nav
