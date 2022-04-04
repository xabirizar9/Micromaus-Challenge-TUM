#include "nav/Maze.hpp"

#include <math.h>
#include <stdint.h>

#include "esp_log.h"

static const char* TAG = "[maze]";

Maze::Maze() {
	this->size = 6;
	this->state = new uint8_t[size * size];
	this->wallState = new uint8_t[size * size];
	this->visited = new bool[size * size];

	this->resetCosts();
}

void Maze::resetVisited() {
	for (uint8_t i = 0; i < size * size; i++) {
		this->visited[i] = false;
	}
}

void Maze::resetCosts() {
	// init labyrinth with distances from center
	for (uint8_t i = 0; i < size * size; i++) {
		this->state[i] = UINT8_MAX;
	}
}

void Maze::fill(uint8_t x, uint8_t y, uint8_t distance) {
	if (x < 0 || x >= size || y < 0 || y >= size) {
		return;
	}

	if (distance == UINT8_MAX) {
		ESP_LOGE(TAG, "distance too long for uint8_t based model");
		return;
	}

	if ((getCost(x, y) == 0 && distance == 0) || getCost(x, y) == UINT8_MAX ||
		getCost(x, y) > distance) {
		setCost(x, y, distance);

		if (!getWall(x, y, Maze::East)) {
			fill(x + 1, y, distance + 1);
		}
		if (!getWall(x, y, Maze::West)) {
			fill(x - 1, y, distance + 1);
		}
		if (!getWall(x, y, Maze::North)) {
			fill(x, y + 1, distance + 1);
		}
		if (!getWall(x, y, Maze::South)) {
			fill(x, y - 1, distance + 1);
		}
	}
}

void Maze::update() {
	this->resetCosts();
	this->resetVisited();

	int center = size / 2 - 1;
	bool isEven = size % 2 == 0;

	// set start points
	setCost(center, center, 0);
	setCost(center, center + 1, 0);
	setCost(center + 1, center, 0);
	setCost(center + 1, center + 1, 0);

	fill(center, center, 0);
	if (isEven) {
		fill(center, center + 1, 0);
		fill(center + 1, center, 0);
		fill(center + 1, center + 1, 0);
	}
}

void Maze::setCost(uint8_t x, uint8_t y, uint8_t value) {
	// assuming MAZE_SIZE < UINT8_MAX
	if (x >= this->size || y >= this->size) {
		ESP_LOGE(TAG, "required coordinates outside the bounds of maze [1..%d]", this->size);
		return;
	}
	this->state[x + y * this->size] = value;
}

uint8_t Maze::getCost(uint8_t x, uint8_t y) {
	// assuming MAZE_SIZE < UINT8_MAX
	if (x >= this->size || y >= this->size) {
		ESP_LOGE(TAG, "required coordinates outside the bounds of maze [1..%d]", this->size);
		return UINT8_MAX;
	}
	return this->state[x + y * this->size];
}

void Maze::setWall(uint8_t x, uint8_t y, Heading dir, bool setOpposing = true) {
	// assuming MAZE_SIZE < UINT8_MAX
	if (x >= this->size || y >= this->size) {
		ESP_LOGE(TAG, "required coordinates outside the bounds of maze [1..%d]", this->size);
		return;
	}
	this->wallState[x + y * this->size] |= 1 << dir;

	if (setOpposing) {
		switch (dir) {
			case Heading::North: setWall(x, y + 1, Heading::South, false); break;
			case Heading::East: setWall(x + 1, y, Heading::West, false); break;
			case Heading::South: setWall(x, y - 1, Heading::North, false); break;
			case Heading::West: setWall(x - 1, y, Heading::East, false); break;
		}
	}
}

bool Maze::getWall(uint8_t x, uint8_t y, Heading dir) {
	// assuming MAZE_SIZE < UINT8_MAX
	if (x >= this->size || y >= this->size) {
		ESP_LOGE(TAG, "required coordinates outside the bounds of maze [1..%d]", this->size);
		return true;
	}
	// 1 << dir is masking walue
	return 1 << dir & this->wallState[x + y * this->size];
}

Maze::~Maze() {
	delete this->state;
	delete this->wallState;
	delete this->visited;
}