#include "nav/Maze.hpp"

#include <math.h>
#include <stdint.h>

#include "esp_log.h"
#include "message.pb.h"
#include "pb_encode.h"
#include "periph/Serial.hpp"

static const char *TAG = "[maze]";

// #define PRINT_MAZE

HardwareSerial ser(1, 3);

Maze::Maze() {
	this->size = 6;
	this->state = new uint8_t[size * size];
	this->wallState = new uint8_t[size * size];
	this->visited = new bool[size * size];

	this->resetVisited();
	this->resetCosts();

	for (uint8_t i = 0; i < size * size; i++) {
		this->wallState[i] = 0;
	}

	this->setWall(0, 0, Maze::Heading::East, true);
	// this->setWall(0, 0, Maze::Heading::North, true);
	this->setWall(0, 2, Maze::Heading::East, true);
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
	if (x >= size || y >= size) {
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

void Maze::printMaze(uint8_t robotX, uint8_t robotY) {
	char str[10];
	for (uint8_t y = size - 1; y != UINT8_MAX; y--) {
		for (uint8_t x = 0; x < size; x++) {
			ser.write(getWall(x, y, Heading::West) ? "|" : " ");
			if (getCost(x, y) == UINT8_MAX) {
				ser.write(" . ");
			} else {
				sprintf(str, " %d%c", getCost(x, y), robotX == x && robotY == y ? '*' : ' ');
				ser.write(str);
			}
		}
		ser.write("\n");

		for (uint8_t x = 0; x < size; x++) {
			ser.write(getWall(x, y, Heading::South) ? "___" : "   ");
		}
		ser.write("\n");
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

#ifdef PRINT_MAZE
	this->printMaze(UINT8_MAX, UINT8_MAX);
#endif
}

void Maze::setCost(uint8_t x, uint8_t y, uint8_t value) {
	// assuming MAZE_SIZE < UINT8_MAX
	if (x >= this->size || y >= this->size) {
		ESP_LOGE(TAG, "out of bounds [1..%d]: %d, %d", this->size, x, y);
		return;
	}
	this->state[x + y * this->size] = value;
}

uint8_t Maze::getCost(uint8_t x, uint8_t y) {
	// assuming MAZE_SIZE < UINT8_MAX
	if (x >= this->size || y >= this->size) {
		ESP_LOGE(TAG, "out of bounds [1..%d]: %d, %d", this->size, x, y);
		return UINT8_MAX;
	}
	return this->state[x + y * this->size];
}

void Maze::setWall(uint8_t x, uint8_t y, Heading dir, bool setOpposing = true) {
	// assuming MAZE_SIZE < UINT8_MAX
	if (x >= this->size || y >= this->size) {
		ESP_LOGE(TAG, "out of bounds [1..%d]: %d, %d", this->size, x, y);
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
		ESP_LOGE(TAG, "out of bounds [1..%d]: %d, %d", this->size, x, y);
		return true;
	}
	// 1 << dir is masking value
	return 1 << dir & this->wallState[x + y * this->size];
}

bool encodeMaze(pb_ostream_t *ostream, const pb_field_t *field, void *const *arg) {
	Maze *maze = (Maze *)(*arg);

	// ESP_LOGI(TAG, "tag=%d", field->tag);

	// encode all numbers
	if (!pb_encode_tag_for_field(ostream, field)) {
		const char *error = PB_GET_ERROR(ostream);
		ESP_LOGI(TAG, "pb_err=%s", error);
		return false;
	}

	size_t len = maze->size * maze->size;

	if (!pb_encode_string(ostream, maze->state, len)) {
		const char *error = PB_GET_ERROR(ostream);
		ESP_LOGI(TAG, "pb_err=%s", error);
		return false;
	}

	return true;
}

bool encodeWalls(pb_ostream_t *ostream, const pb_field_t *field, void *const *arg) {
	Maze *maze = (Maze *)(*arg);

	// ESP_LOGI(TAG, "tag=%d", field->tag);

	// encode all numbers
	if (!pb_encode_tag_for_field(ostream, field)) {
		const char *error = PB_GET_ERROR(ostream);
		ESP_LOGI(TAG, "pb_err=%s", error);
		return false;
	}

	size_t len = maze->size * maze->size;

	if (!pb_encode_string(ostream, maze->wallState, len)) {
		const char *error = PB_GET_ERROR(ostream);
		ESP_LOGI(TAG, "pb_err=%s", error);
		return false;
	}

	return true;
}

MazeStatePacket Maze::getEncodedValue() {
	static MazeStatePacket state = MazeStatePacket_init_zero;
	state.has_position = true;
	state.has_target = true;
	state.position = Position_init_zero;
	state.target = Position_init_zero;

	state.walls.arg = this;
	state.walls.funcs.encode = encodeWalls;

	state.state.arg = this;
	state.state.funcs.encode = encodeMaze;

	return state;
}

Maze::~Maze() {
	delete this->state;
	delete this->wallState;
	delete this->visited;
}