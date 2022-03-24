#include "filter/Position.hpp"

#include <cmath>

linalg::Vec Position::getOrientationVector() const {
	return {cos(w), sin(w), 0.f};
}
