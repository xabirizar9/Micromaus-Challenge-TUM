#pragma once
#include "Controller.hpp"
#include "freertos/FreeRTOS.h"
#include "freertos/event_groups.h"
#include "freertos/queue.h"
#include "message.pb.h"
#include "net/NetController.hpp"

#define MAZE_SIZE 6

#define DRIVE_EVT_STARTED_BIT (1 << 1)
#define DRIVE_EVT_COMPLETED_BIT (1 << 2)

class RobotDriver {
	TaskHandle_t driveTaskHandle;
	// queue of drive commands to be executed;

   public:
	RobotDriver();
	~RobotDriver();

	void addCmd(DriveCmdType type, float value, float speed);

	EventGroupHandle_t eventHandle;
	xQueueHandle executionQueue;
	Controller *controller;
	NetController *net;
};

class MazeExplorer : public RobotDriver {
	uint8_t state[MAZE_SIZE * MAZE_SIZE];

   public:
	MazeExplorer(Controller *controller);

	void start();
	void pause();

	uint8_t getCost(uint8_t x, uint8_t y);
};