#include "filter/Position.hpp"

#include <cmath>

linalg::Vec<float> RobotPosition::getOrientationVector() const {
	return {std::cos(w), std::sin(w), 0.f};
}
