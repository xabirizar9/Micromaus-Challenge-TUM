#include "filter/MapBelief.hpp"

using nav::CardinalDirection;

MapBelief::MapBelief(int width, int height, const float prior)
	: width(width),
	  height(height),
	  probabilities((width + 1) * (height + 1) * 2, prior),
	  fixed((width + 1) * (height + 1) * 2, false) {
	// set all border walls to fixed
	// at() performs bounds checking so we immediately see if i fucked up
	for (int x = 0; x <= width; ++x) {
		fixed.at(locate(x, 0, CardinalDirection::SOUTH)) = true;
		fixed.at(locate(x, height, CardinalDirection::SOUTH)) = true;
		fixed.at(locate(x, height, CardinalDirection::WEST)) = true;
	}
	for (int y = 0; y <= height; ++y) {
		fixed.at(locate(0, y, CardinalDirection::WEST)) = true;
		fixed.at(locate(width, y, CardinalDirection::WEST)) = true;
		fixed.at(locate(width, y, CardinalDirection::SOUTH)) = true;
	}
}

void MapBelief::set(int x, int y, CardinalDirection d, float f) {
	if ((x < 0) || (x >= width) || (y < 0) || (y >= height)) {
		throw std::invalid_argument("MapBelief write access out of bounds");
	}

	int loc = locate(x, y, d);

	probabilities[loc] = f;
}

float MapBelief::get(int x, int y, CardinalDirection d) const {
	if ((x < 0) || (x >= width) || (y < 0) || (y >= height)) {
		return 1.0;	 // all walls outside the field are set
	}

	int loc = locate(x, y, d);

	if (fixed[loc])
		return 1.0;

	return probabilities[loc];
}

#ifdef MAPBELIEF_TEST
#include <iostream>
using namespace std;

void MapBelief::print() const {
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

int main() {
	MapBelief bel(6, 6, 0.5);
	bel.print();
	return 0;
}
#endif
