#include "nav/Position.hpp"
#include "support/Linalg.hpp"

#include <cmath>

using namespace nav;
using namespace linalg;

Vec<float> Heading::toVector() const {
	return {std::cos(angle), std::sin(angle), 0.f};
}

Heading Heading::normalized() const {
	float f = std::fmod(angle, PI * 2);
	if (std::signbit(f))
		f += 2 * PI;
	return Heading(f);
}

Heading Heading::approximateCardinalDirection() const {
	const float f = normalized().angle;
	constexpr float dtr = PI / 180;
	if (f <= 45 * dtr || f > 315 * dtr) {
		return EAST;
	} else if (f <= 135 * dtr) {
		return NORTH;
	} else if (f <= 225 * dtr) {
		return WEST;
	} else if (f <= 315 * dtr) {
		return SOUTH;
	}
	return EAST;
}

