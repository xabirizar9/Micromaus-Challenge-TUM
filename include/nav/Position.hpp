#pragma once

#include "support/Linalg.hpp"

namespace nav {
	enum class CardinalDirection {
		EAST = 0,
		NORTH = 1,
		WEST = 2,
		SOUTH = 3
	};

	class Heading
	{
		static constexpr float PI = 3.141592653589793238462643383279502884;

	public:
		constexpr Heading(float angleRad): angle(angleRad) {}
		constexpr Heading(CardinalDirection cd): angle((int) cd * PI / 2) {}

		float toRad() const { return angle; }
		float toDeg() const { return angle / PI * 180.f; }

		linalg::Vec<float> toVector() const;

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
		float angle; // hading in radians, between global X and robot X axis
	};

}
