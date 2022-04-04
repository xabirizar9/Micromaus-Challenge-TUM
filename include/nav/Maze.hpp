#pragma once
#include <stdint.h>
#include <stdio.h>

// _____________
// |_|_|_|_|_|_|
// |_|_|_|_|_|_|
// |_|_|x|x|_|_|
// |_|_|x|x|_|_|
// |_|_|_|_|_|_|
// |_|_|_|_|_|_|

struct Maze {
	// TODO: unify with @alex types
	enum Heading { North, East, South, West };

	size_t size;
	uint8_t* wallState;
	uint8_t* state;
	bool* visited;

	void setWall(uint8_t x, uint8_t y, Heading dir, bool setOpposing);
	bool getWall(uint8_t x, uint8_t y, Heading dir);

	void setCost(uint8_t x, uint8_t y, uint8_t value);
	uint8_t getCost(uint8_t x, uint8_t y);

	void resetVisited();
	void resetCosts();

	void fill(uint8_t x, uint8_t y, uint8_t distance);
	void update();

	Maze();
	~Maze();
};