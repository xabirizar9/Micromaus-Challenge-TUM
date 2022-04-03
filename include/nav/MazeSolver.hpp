#pragma once
#include "Controller.hpp"
#include "freertos/FreeRTOS.h"
#include "freertos/event_groups.h"
#include "freertos/queue.h"
#include "message.pb.h"
#include "nav/Maze.hpp"
#include "nav/RobotDriver.hpp"
#include "net/NetController.hpp"

class MazeSolver : public RobotDriver {
   private:
	Maze maze;

	void updateFloodFill();

   public:
	MazeSolver(Controller *controller);

	void startExploration();
	void pause();
	void updateWalls();
	void updateCosts(uint8_t *costs, uint8_t x, uint8_t y);

	uint8_t getCost(uint8_t x, uint8_t y);
};