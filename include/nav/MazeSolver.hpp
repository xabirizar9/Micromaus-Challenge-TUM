#pragma once
#include "Controller.hpp"
#include "freertos/FreeRTOS.h"
#include "freertos/event_groups.h"
#include "freertos/queue.h"
#include "nav/Maze.hpp"
#include "nav/RobotDriver.hpp"

class MazeSolver : public RobotDriver {
   private:
	Maze maze;

   public:
	MazeSolver(Controller* controller);

	void startExploration() override;
	void startGoHome() override;
	void startFastRun() override;
	Maze* getMaze() override;
	void start();
	void pause();
	void updateWalls();

	Maze::Heading getNewHeading(uint8_t x, uint8_t y);
};