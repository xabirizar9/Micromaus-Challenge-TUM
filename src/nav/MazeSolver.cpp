#include "nav/MazeSolver.hpp"

#include "drive/DriveTask.hpp"
#include "message.pb.h"
#include "nav/Maze.hpp"
#include "net/NetController.hpp"
#include "stdbool.h"

using nav::CardinalDirection;

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
CardinalDirection MazeSolver::getNewHeading(uint8_t x, uint8_t y) {
	// costs for north, east, south, west
	uint8_t costs[4];
	CardinalDirection heading = CardinalDirection::NORTH;
	// TODO: find more optimal solution
	costs[CardinalDirection::NORTH] = this->maze.getCost(x, y + 1);
	costs[CardinalDirection::EAST] = this->maze.getCost(x + 1, y);
	costs[CardinalDirection::SOUTH] = this->maze.getCost(x, y - 1);
	costs[CardinalDirection::WEST] = this->maze.getCost(x - 1, y);

	for (uint8_t i = 0; i < 4; i++) {
		heading = costs[i] < costs[heading] ? CardinalDirection(i) : heading;
	}

	return heading;
}

Maze* MazeSolver::getMaze() {
	return &this->maze;
}

void MazeSolver::startFastRun() {
	// TODO: implement
}

void MazeSolver::startGoHome() {
	// TODO: implement
}

void MazeSolver::startExploration() {
	uint8_t x = 0;
	uint8_t y = 0;

	CardinalDirection heading = CardinalDirection::NORTH;
	CardinalDirection newHeading = CardinalDirection::NORTH;
	MazeStatePacket packet;
	uint16_t speed = 100;
	// TODO: split into task

	while (true) {
		if (this->maze.getCost(x, y) == 0) {
			// TODO: add what need to be done when center found
			ESP_LOGI(TAG, "!!! We found the center");
			this->maze.printMaze(x, y);
			return;
		}

		this->updateWalls();

		// rerun flood fill
		this->maze.update();

		// send update over network

		packet = this->getMaze()->getEncodedValue();

		// write and encode the command
		NetController::Manager::getInstance().writeMazeState(packet);

		// this->maze.printMaze(x, y);
		// give us some time to print
		vTaskDelay(pdMS_TO_TICKS(200));

		// find cell will lover cost/distance to center;
		newHeading = this->getNewHeading(x, y);

		// rotate based on optimal index
		// if (heading != newHeading) {
		// 	this->addCmdAndWait(heading - newHeading < 0
		// 							? DriveCmdType::DriveCmdType_TurnLeftOnSpot
		// 							: DriveCmdType::DriveCmdType_TurnRightOnSpot,
		// 						std::abs(heading - newHeading),
		// 						speed);
		// 	heading = newHeading;
		// }

		// this->addCmdAndWait(DriveCmdType::DriveCmdType_MoveCells, 1, speed);

		// update position based on heading
		// TODO: maybe use robot position here
		switch (newHeading) {
			case CardinalDirection::NORTH:
				ESP_LOGI(TAG, "h:%c (%d, %d) -> (%d, %d)", (char)heading, x, y, x, y + 1);
				y += 1;
				break;
			case CardinalDirection::EAST:
				ESP_LOGI(TAG, "h:%c (%d, %d) -> (%d, %d)", (char)heading, x, y, x + 1, y);
				x += 1;
				break;
			case CardinalDirection::SOUTH:
				ESP_LOGI(TAG, "h:%c (%d, %d) -> (%d, %d)", (char)heading, x, y, x, y - 1);
				y -= 1;
				break;
			case CardinalDirection::WEST:
				ESP_LOGI(TAG, "h:%c (%d, %d) -> (%d, %d)", (char)heading, x, y, x - 1, y);
				x -= 1;
				break;
		}

		// write and encode the command
		// we can probably remove this timeout since the should be enough time while waiting for
		// commands
		vTaskDelay(pdMS_TO_TICKS(200));
	}
}
