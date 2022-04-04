#pragma once

#include <stdexcept>
#include <vector>

#include "nav/Position.hpp"

/**
 * For each wall, represents the probability that the wall is placed.
 *
 * Walls are adressed by field coordinate and direction. For example,
 * in this 2x2 field,
 *
 *     ## --
 *    |  |  $
 *     -- --
 *    |  |  |
 *     -- --
 *
 * the wall marked with ## will be found by coordinates (0, 1, NORTH)
 * or (0, 2, SOUTH).
 * The wall marked with $ is at (1, 1, EAST) or (2, 1, WEST).
 *
 * Walls can be 'fixed', and get() will always return a probability
 * of 1.0 for fixed walls.
 * By default, the walls at the boundary of the field are fixed.
 */
class MapBelief {
   public:
	/**
	 * prior: prior probability that a wall is set
	 */
	MapBelief(int width, int height, const float prior);
	~MapBelief() = default;

	/// I forbid copying for performance reasons, hoping that i will
	// never need it
	MapBelief(const MapBelief&) = delete;

	/// efficient move construction operations
	MapBelief(MapBelief&& rhs) = default;

	/**
	 * Set the probability that the wall at (x, y, d) is placed to f.
	 * Throws std::invalid_argument when a wall outside the field is
	 * accessed.
	 */
	void set(int x, int y, nav::CardinalDirection d, float f);

	/**
	 * Get the probability that the wall at (x, y, d) is placed.
	 * Walls outside the field are always regarded as placed,
	 * so if accessing a coordinate outside the field, returns 1.0.
	 */
	float get(int x, int y, nav::CardinalDirection d) const;

	void setFixed(int x, int y, nav::CardinalDirection d, bool fix) {
		fixed.at(locate(x, y, d)) = fix;
	}

	/// not implemented for ESP
	void print() const;

   private:
	/// transform x/y/d coordinate to array index.
	int locate(int x, int y, nav::CardinalDirection d) const {
		if (d == nav::CardinalDirection::EAST) {
			return locate(x + 1, y, nav::CardinalDirection::WEST);
		}
		if (d == nav::CardinalDirection::NORTH) {
			return locate(x, y + 1, nav::CardinalDirection::SOUTH);
		}
		return x * (width + 1) + y +
			   ((d == nav::CardinalDirection::WEST) ? (width + 1) * (height + 1) : 0);
	}

	const int width;
	const int height;
	std::vector<float> probabilities;
	std::vector<bool> fixed;
};
