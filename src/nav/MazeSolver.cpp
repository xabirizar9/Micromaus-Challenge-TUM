#include "nav/MazeSolver.hpp"

#include "drive/DriveTask.hpp"
#include "message.pb.h"
#include "nav/Maze.hpp"
#include "stdbool.h"

static const char* TAG = "[solver]";

void waitForDriveCompletion(EventGroupHandle_t handle) {
	EventBits_t event;
	const TickType_t waitTicks = 100 / portTICK_PERIOD_MS;
	while (true) {
		event = xEventGroupWaitBits(handle, DRIVE_EVT_COMPLETED_BIT, true, true, waitTicks);
		if ((event & DRIVE_EVT_COMPLETED_BIT) == DRIVE_EVT_COMPLETED_BIT) {
			return;
		}

		vTaskDelay(waitTicks);
	}
}

// _____________
// |_|_|_|_|_|_|
// |_|_|_|_|_|_|
// |_|_|x|x|_|_|
// |_|_|x|x|_|_|
// |_|_|_|_|_|_|
// |_|_|_|_|_|_|

MazeSolver::MazeSolver(Controller* controller) {
	this->controller = controller;
	this->addCmd(DriveCmdType::DriveCmdType_MoveCells, 1, 300);
}

void MazeSolver::updateWalls() {}

void MazeSolver::updateFloodFill() {
	// static bool visited = new bool[MAZE_SIZE * MAZE_SIZE];
}

void MazeSolver::updateCosts(uint8_t* costs, uint8_t x, uint8_t y) {
	costs[Maze::Heading::North] = this->maze.getCost(x, y + 1);
	costs[Maze::Heading::East] = this->maze.getCost(x + 1, y);
	costs[Maze::Heading::South] = this->maze.getCost(x, y - 1);
	costs[Maze::Heading::West] = this->maze.getCost(x - 1, y);
}

void MazeSolver::startExploration() {
	uint8_t x = 1;
	uint8_t y = 1;

	// costs for north, east, south, west
	uint8_t costs[4];

	Maze::Heading heading = Maze::Heading::North;
	uint8_t costIndex = 0;
	uint16_t speed = 300;
	// TODO: split into task

	while (true) {
		// TODO: check wall collisions here
		this->updateWalls();

		// TODO: rerun flood on all cells

		// find cell will lover cost/distance to center;
		// TODO: find more optimal solution
		this->updateCosts(costs, x, y);

		for (uint i = 0; i < 4; i++) {
			costIndex = costs[i] < costs[costIndex] ? i : costIndex;
		}

		// rotate based on optimal index
		if (heading != costIndex) {
			this->addCmd(heading - costIndex < 0 ? DriveCmdType::DriveCmdType_TurnLeftOnSpot
												 : DriveCmdType::DriveCmdType_TurnRightOnSpot,
						 std::abs(heading - costIndex),
						 speed);
		}

		waitForDriveCompletion(this->eventHandle);

		// TODO: wait for command to be completed

		this->addCmd(DriveCmdType::DriveCmdType_Move, 1, speed);

		waitForDriveCompletion(this->eventHandle);
		vTaskDelay(pdMS_TO_TICKS(200));
	}
}