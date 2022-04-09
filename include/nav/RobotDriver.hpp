#pragma once
#include "Controller.hpp"
#include "freertos/FreeRTOS.h"
#include "freertos/event_groups.h"
#include "freertos/queue.h"
#include "message.pb.h"
#include "nav/Maze.hpp"

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
	void addCmdAndWait(DriveCmdType type, float value, float speed);

	virtual void startExploration(float speed){};
	virtual void startGoHome(float speed){};
	virtual void startFastRun(float speed){};
	virtual Maze* getMaze() {
		return NULL;
	};

	EventGroupHandle_t eventHandle;
	xQueueHandle executionQueue;
	Controller* controller;
	// NetController::Manager* net;
};
