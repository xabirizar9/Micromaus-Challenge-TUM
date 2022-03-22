#pragma once

#include "Controller.hpp"
// Check if there's a wall on the left
void check_left(uint16_t leftDistance);
void check_right(uint16_t rightDistance);
void check_front(uint16_t frontDistance);

/* Function should return an empty grid, where each
grid element has an occupancy value.  */
void generate_grid(int& width, int& height);

class PathNavigation;