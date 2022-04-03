#include "nav/Maze.hpp"

#include <math.h>
#include <stdint.h>

#include "esp_log.h"

static const char* TAG = "[maze]";

Maze::Maze() {
	this->size = 6;
	this->state = new uint8_t[size * size];
	this->wallState = new uint8_t[size * size];

	int center = size / 2 - 1;
	bool isEven = size % 2 == 0;

	// init labyrinth with distances from center
	for (uint8_t i = 0; i < size; i++) {
		for (uint8_t j = 0; j < size; j++) {
			this->state[i * size + j] =
				(uint8_t)(std::min(std::abs(center - i), std::abs(center + isEven - i)) +
						  std::min<uint8_t>(std::abs(center - j), std::abs(center + isEven - j)));
		};
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

void Maze::setWall(uint8_t x, uint8_t y, Heading dir) {
	// assuming MAZE_SIZE < UINT8_MAX
	if (x >= this->size || y >= this->size) {
		ESP_LOGE(TAG, "required coordinates outside the bounds of maze [1..%d]", this->size);
		return;
	}
	this->wallState[x + y * this->size] |= 1 << dir;
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
}