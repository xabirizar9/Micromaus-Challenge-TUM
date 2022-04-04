#pragma once

#include <stdexcept>
#include <vector>

#ifdef MAPBELIEF_TEST
#include <iostream>
using namespace std;
#endif

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
	MapBelief(int width, int height, const float prior)
		: width(width),
		  height(height),
		  probabilities((width + 1) * (height + 1) * 2, prior),
		  fixed((width + 1) * (height + 1) * 2, false) {
		// set all border walls to fixed
		// at() performs bounds checking so we immediately see if i fucked up
		for (int x = 0; x <= width; ++x) {
			fixed.at(locate(x, 0, nav::CardinalDirection::SOUTH)) = true;
			fixed.at(locate(x, height, nav::CardinalDirection::SOUTH)) = true;
			fixed.at(locate(x, height, nav::CardinalDirection::WEST)) = true;
		}
		for (int y = 0; y <= height; ++y) {
			fixed.at(locate(0, y, nav::CardinalDirection::WEST)) = true;
			fixed.at(locate(width, y, nav::CardinalDirection::WEST)) = true;
			fixed.at(locate(width, y, nav::CardinalDirection::SOUTH)) = true;
		}
	}

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
	void set(int x, int y, nav::CardinalDirection d, float f) {
		if ((x < 0) || (x >= width) || (y < 0) || (y >= height)) {
			throw std::invalid_argument("MapBelief write access out of bounds");
		}

		int loc = locate(x, y, d);

		probabilities[loc] = f;
	}

	/**
	 * Get the probability that the wall at (x, y, d) is placed.
	 * Walls outside the field are always regarded as placed,
	 * so if accessing a coordinate outside the field, returns 1.0.
	 */
	float get(int x, int y, nav::CardinalDirection d) const {
		if ((x < 0) || (x >= width) || (y < 0) || (y >= height)) {
			return 1.0;	 // all walls outside the field are set
		}

		int loc = locate(x, y, d);

		if (fixed[loc])
			return 1.0;

		return probabilities[loc];
	}

	void setFixed(int x, int y, nav::CardinalDirection d, bool fix) {
		fixed.at(locate(x, y, d)) = fix;
	}

#ifdef MAPBELIEF_TEST
	void print() const {
		for (int y = height; y >= 0; y--) {
			// west walls
			for (int x = 0; x <= width; x++) {
				int loc = locate(x, y, nav::CardinalDirection::WEST);
				if (fixed[loc]) {
					cout << "\033[0;31m";
				} else {
					cout << "\033[0m";
				}
				cout << "|  ";
			}
			cout << endl;
			// south walls
			for (int x = 0; x <= width; x++) {
				int loc = locate(x, y, nav::CardinalDirection::SOUTH);
				if (fixed[loc])
					cout << "\033[0;31m";
				else
					cout << "\033[0m";
				cout << " --";
			}
			cout << endl;
		}
	}
#endif

   private:
	/// transform x/y/d coordinate to array index.
	int locate(int x, int y, nav::CardinalDirection d) const {
		if (d == nav::CardinalDirection::EAST) {
			return locate(x + 1, y, nav::CardinalDirection::WEST);
		}
		if (d == nav::CardinalDirection::NORTH) {
			return locate(x, y + 1, nav::CardinalDirection::SOUTH);
		}
		return x * (width + 1) + y + ((d == nav::CardinalDirection::WEST) ? (width + 1) * (height + 1) : 0);
	}

	const int width;
	const int height;
	std::vector<float> probabilities;
	std::vector<bool> fixed;
};

#ifdef MAPBELIEF_TEST
int main() {
	MapBelief bel(6, 6, 0.5);
	bel.print();
	return 0;
}
#endif
