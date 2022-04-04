#pragma once

#include "support/Linalg.hpp"

namespace nav {
	class Heading
	{
	private:
		static constexpr float PI = 3.141592653589793238462643383279502884;
	public:
		constexpr Heading(float angleRad): angle(angleRad) {}

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
		Heading approximateCardinalDirection() const;

		static constexpr Heading EAST(0.0);
		static constexpr Heading NORTH(0.5 * PI);
		static constexpr Heading WEST(1.0 * PI);
		static constexpr Heading SOUTH(1.5 * PI);
		
	private:
		float angle; // hading in radians, between global X and robot X axis
	};
}
