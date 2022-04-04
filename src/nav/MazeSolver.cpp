#include "nav/MazeSolver.hpp"

#include "drive/DriveTask.hpp"
#include "message.pb.h"
#include "nav/Maze.hpp"
#include "stdbool.h"

static const char* TAG = "[solver]";

MazeSolver::MazeSolver(Controller* controller) {
	this->controller = controller;
}

void MazeSolver::updateWalls() {
	// TODO: update maze here
}

/**
 * @brief find the next heading starting at x,y with the lowest cost
 *
 * @param x
 * @param y
 */
Maze::Heading MazeSolver::getNewHeading(uint8_t x, uint8_t y) {
	// costs for north, east, south, west
	static uint8_t costs[4];
	static Maze::Heading heading = Maze::Heading::North;
	// TODO: find more optimal solution
	costs[Maze::Heading::North] = this->maze.getCost(x, y + 1);
	costs[Maze::Heading::East] = this->maze.getCost(x + 1, y);
	costs[Maze::Heading::South] = this->maze.getCost(x, y - 1);
	costs[Maze::Heading::West] = this->maze.getCost(x - 1, y);

	for (uint i = 0; i < 4; i++) {
		heading = static_cast<Maze::Heading>(costs[i] < costs[heading] ? i : heading);
	}

	return heading;
}

void MazeSolver::startExploration() {
	uint8_t x = 1;
	uint8_t y = 1;

	Maze::Heading heading = Maze::Heading::North;
	Maze::Heading newHeading = Maze::Heading::North;
	uint16_t speed = 300;
	// TODO: split into task

	while (true) {
		this->updateWalls();

		// rerun flood fill
		this->maze.update();

		// find cell will lover cost/distance to center;
		newHeading = this->getNewHeading(x, y);

		// rotate based on optimal index
		if (heading != newHeading) {
			this->addCmdAndWait(heading - newHeading < 0
									? DriveCmdType::DriveCmdType_TurnLeftOnSpot
									: DriveCmdType::DriveCmdType_TurnRightOnSpot,
								std::abs(heading - newHeading),
								speed);
		}

		this->addCmdAndWait(DriveCmdType::DriveCmdType_Move, 1, speed);

		vTaskDelay(pdMS_TO_TICKS(200));
	}
}