#pragma once
#include <stdint.h>
#include <stdio.h>

#include "message.pb.h"
#include "nav/Position.hpp"

// _____________
// |_|_|_|_|_|_|
// |_|_|_|_|_|_|
// |_|_|x|x|_|_|
// |_|_|x|x|_|_|
// |_|_|_|_|_|_|
// |_|_|_|_|_|_|

struct Maze {
	size_t size;
	uint8_t* wallState;
	uint8_t* state;
	bool* visited;

	void setWall(uint8_t x, uint8_t y, nav::CardinalDirection dir, bool setOpposing);
	bool getWall(uint8_t x, uint8_t y, nav::CardinalDirection dir);

	void setCost(uint8_t x, uint8_t y, uint8_t value);
	uint8_t getCost(uint8_t x, uint8_t y);

	void printMaze(uint8_t robotX, uint8_t robotY);

	void resetVisited();
	void resetCosts();

	void fill(uint8_t x, uint8_t y, uint8_t distance);
	void update();

	MazeStatePacket getEncodedValue();

	Maze();
	~Maze();
};
