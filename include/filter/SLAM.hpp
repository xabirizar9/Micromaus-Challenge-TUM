#pragma once

#include "filter/Location.hpp"
#include "filter/Mapping.hpp"

struct SLAM {
	Location location;
	Mapping mapping;

	void update();
};
