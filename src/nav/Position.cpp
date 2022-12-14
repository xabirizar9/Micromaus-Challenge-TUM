#include "nav/Position.hpp"

#include <cmath>

#include "support/Linalg.hpp"

using namespace nav;
using namespace la;

Vec2f Heading::toVector() const {
	return {std::cos(angle), std::sin(angle)};
}

Heading Heading::normalized() const {
	float f = std::fmod(angle, PI * 2);
	if (std::signbit(f))
		f += 2 * PI;
	return Heading(f);
}

CardinalDirection Heading::approximateCardinalDirection() const {
	const float f = normalized().angle;
	constexpr float dtr = PI / 180;
	if (f <= 45 * dtr || f > 315 * dtr) {
		return CardinalDirection::EAST;
	} else if (f <= 135 * dtr) {
		return CardinalDirection::NORTH;
	} else if (f <= 225 * dtr) {
		return CardinalDirection::WEST;
	} else if (f <= 315 * dtr) {
		return CardinalDirection::SOUTH;
	}
	return CardinalDirection::EAST;
}
