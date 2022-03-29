#pragma once
#include "Controller.hpp"
#include "freertos/FreeRTOS.h"
#include "freertos/queue.h"
#include "message.pb.h"

#define MAZE_SIZE 6

class RobotDriver {
	TaskHandle_t driveTaskHandle;
	// queue of drive commands to be executed;

   public:
	RobotDriver();
	~RobotDriver();

	void addCmd(DriveCmdType type, float value, float speed);

	xQueueHandle executionQueue;
	Controller *controller;
};

class MazeExplorer : public RobotDriver {
	uint8_t state[MAZE_SIZE * MAZE_SIZE];

   public:
	MazeExplorer(Controller *controller);

	void start();
	void pause();

	uint8_t getCost(uint8_t x, uint8_t y);
};