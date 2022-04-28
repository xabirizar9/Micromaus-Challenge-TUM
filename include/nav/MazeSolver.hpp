#pragma once
#include "Controller.hpp"
#include "freertos/FreeRTOS.h"
#include "freertos/event_groups.h"
#include "freertos/queue.h"
#include "nav/Maze.hpp"
#include "nav/Position.hpp"
#include "nav/RobotDriver.hpp"

using nav::CardinalDirection;

struct MazeDriveCmdNode {
	MazeDriveCmdNode* prev;
	MazeDriveCmdNode* next;
	MsgDrive cur;
};

class MazeSolver : public RobotDriver {
   private:
	Maze maze;
	// position in maze coordinates
	float x = 0;
	float y = 0;
	CardinalDirection heading = CardinalDirection::NORTH;

	void driveToNextCell(float speed);
	MsgDrive getNextDriveCmd(float speed);
	void sendSolverState();

   public:
	MazeSolver(Controller* controller);

	void startExploration(float speed) override;
	void startGoHome(float speed) override;
	void startFastRun(float speed) override;
	void setPosition(float x, float y) override;
	Maze* getMaze() override;
	void start();
	void pause();
	void updateWalls(uint8_t x, uint8_t y, nav::CardinalDirection dir);

	nav::CardinalDirection getNewHeading(uint8_t x, uint8_t y);
};
