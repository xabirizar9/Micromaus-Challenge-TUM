#pragma once
#include <stdint.h>
#include <stdio.h>

struct Maze {
	enum Heading { North, East, South, West };

	size_t size;
	uint8_t *wallState;
	uint8_t *state;

	void setWall(uint8_t x, uint8_t y, Heading dir);
	bool getWall(uint8_t x, uint8_t y, Heading dir);

	void setCost(uint8_t x, uint8_t y, uint8_t value);
	uint8_t getCost(uint8_t x, uint8_t y);

	void update();

	Maze();
	~Maze();
};