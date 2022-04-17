#include "nav/MazeSolver.hpp"

#include "drive/DriveTask.hpp"
#include "message.pb.h"
#include "nav/Maze.hpp"
#include "net/NetController.hpp"
#include "stdbool.h"
#include "utils/units.hpp"

using nav::CardinalDirection;

static const char* TAG = "[solver]";

MazeSolver::MazeSolver(Controller* controller) {
	this->controller = controller;
}

void MazeSolver::sendSolverState() {
	static MazeStatePacket packet;
	// send update over network
	packet = this->getMaze()->getEncodedValue();
	packet.position = Position_init_zero;
	packet.position.x = (float)x;
	packet.position.y = (float)y;
	packet.position.heading = (float)heading;

	// write and encode the command
	NetController::Manager::getInstance().writeMazeState(packet);
}

void MazeSolver::setPosition(float x, float y) {
	this->x = std::clamp(x, (float)0.0, (float)this->maze.size);
	this->x = std::clamp(y, (float)0.0, (float)this->maze.size);
}

void MazeSolver::updateWalls(uint8_t x, uint8_t y, CardinalDirection dir) {
	static NavigationPacket state;

	bool newWalls[3];
	bool walls[3] = {false, false, false};

	bool scanWalls = true;
	while (scanWalls) {
		this->controller->updateSensors();
		state = this->controller->getState();

		newWalls[0] = isWallGiven(state.sensors.left);
		newWalls[1] = isWallGiven(state.sensors.front);
		newWalls[2] = isWallGiven(state.sensors.right);

		if (newWalls[0] == walls[0] && newWalls[1] == walls[1] && newWalls[2] == walls[2]) {
			scanWalls = false;
			continue;
		}

		walls[0] = newWalls[0];
		walls[1] = newWalls[1];
		walls[2] = newWalls[2];

		vTaskDelay(pdMS_TO_TICKS(10));
		continue;
	}

	// update walls
	if (walls[0]) {
		this->maze.setWall(x, y, CardinalDirection((dir - 1) + CardinalDirection::WEST), true);
	}
	if (walls[1]) {
		this->maze.setWall(x, y, CardinalDirection((dir - 1) + CardinalDirection::NORTH), true);
	}
	if (walls[2]) {
		this->maze.setWall(x, y, CardinalDirection((dir - 1) + CardinalDirection::EAST), true);
	}

	ESP_LOGI(TAG,
			 "found walls (l=%d f=%d r=%d) (s=%d e=%d w=%d n=%d",
			 walls[0],
			 walls[1],
			 walls[2],
			 this->maze.getWall(x, y, CardinalDirection::SOUTH),
			 this->maze.getWall(x, y, CardinalDirection::EAST),
			 this->maze.getWall(x, y, CardinalDirection::WEST),
			 this->maze.getWall(x, y, CardinalDirection::NORTH));
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
	costs[CardinalDirection::NORTH] = !this->maze.getWall(x, y, CardinalDirection::NORTH)
										  ? this->maze.getCost(x, y + 1)
										  : UINT8_MAX;
	costs[CardinalDirection::EAST] = !this->maze.getWall(x, y, CardinalDirection::EAST)
										 ? this->maze.getCost(x + 1, y)
										 : UINT8_MAX;
	costs[CardinalDirection::SOUTH] = !this->maze.getWall(x, y, CardinalDirection::SOUTH)
										  ? this->maze.getCost(x, y - 1)
										  : UINT8_MAX;
	costs[CardinalDirection::WEST] = !this->maze.getWall(x, y, CardinalDirection::WEST)
										 ? this->maze.getCost(x - 1, y)
										 : UINT8_MAX;

	for (uint8_t i = 0; i < 4; i++) {
		// TODO: @alex help us
		heading = costs[i] < costs[heading] ? CardinalDirection(i) : heading;
	}

	return heading;
}

Maze* MazeSolver::getMaze() {
	return &this->maze;
}

void MazeSolver::driveToNextCell(float speed) {
	// find cell will lover cost/distance to center;
	CardinalDirection newHeading = this->getNewHeading(x, y);

	// rotate based on optimal index
	if (heading != newHeading) {
		DriveCmdType direction;
		float turns = std::abs(heading - newHeading) == 3 ? 1 : std::abs(heading - newHeading);
		if (heading < newHeading) {
			direction = DriveCmdType::DriveCmdType_TurnLeftOnSpot;
		} else {
			direction = DriveCmdType::DriveCmdType_TurnRightOnSpot;
		}

		if (std::abs(heading - newHeading) == 3) {
			direction = direction == DriveCmdType::DriveCmdType_TurnLeftOnSpot
							? DriveCmdType::DriveCmdType_TurnRightOnSpot
							: DriveCmdType::DriveCmdType_TurnLeftOnSpot;
		}

		this->addCmdAndWait(direction, turns, speed);
		heading = newHeading;
	}

	this->addCmdAndWait(DriveCmdType::DriveCmdType_MoveCells, 1, speed);

	// update position based on heading
	// TODO: maybe use robot position here
	switch (newHeading) {
		case CardinalDirection::NORTH:
			// ESP_LOGI(TAG, "h:%c (%d, %d) -> (%d, %d)", (char)heading, x, y, x, y + 1);
			y += 1;
			break;
		case CardinalDirection::EAST:
			// ESP_LOGI(TAG, "h:%c (%d, %d) -> (%d, %d)", (char)heading, x, y, x + 1, y);
			x += 1;
			break;
		case CardinalDirection::SOUTH:
			// ESP_LOGI(TAG, "h:%c (%d, %d) -> (%d, %d)", (char)heading, x, y, x, y - 1);
			y -= 1;
			break;
		case CardinalDirection::WEST:
			// ESP_LOGI(TAG, "h:%c (%d, %d) -> (%d, %d)", (char)heading, x, y, x - 1, y);
			x -= 1;
			break;
	}
}

void MazeSolver::startFastRun(float speed) {
	this->isFastRun = true;
	uint16_t actualSpeed = (uint16_t)speed;
	// reset maze
	this->maze.resetCosts();

	while (true) {
		// broadcast current solver state
		sendSolverState();

		if (this->maze.getCost(x, y) == 0) {
			// TODO: add what need to be done when center found
			return;
		}

		// this->updateWalls(x, y, heading);

		// rerun flood fill
		this->maze.update();

		driveToNextCell(actualSpeed);
	}
}

void MazeSolver::startGoHome(float speed) {
	this->isFastRun = true;
	uint16_t actualSpeed = (uint16_t)speed;
	// reset maze
	this->maze.resetCosts();

	while (true) {
		// broadcast current solver state
		sendSolverState();

		if (this->maze.getCost(x, y) == 0) {
			// TODO: add what need to be done when center found
			return;
		}

		// this->updateWalls(x, y, heading);

		// rerun flood fill
		this->maze.fillFrom(0, 0);

		driveToNextCell(actualSpeed);
	}
}

void MazeSolver::startExploration(float speed) {
	this->isFastRun = false;
	this->heading = CardinalDirection::NORTH;
	this->x = 0;
	this->y = 0;

	// reset maze
	this->maze.resetCosts();
	this->maze.resetWalls();

	CardinalDirection newHeading = CardinalDirection::NORTH;
	uint16_t actualSpeed = (uint16_t)speed;

	while (true) {
		// broadcast current solver state
		sendSolverState();

		if (this->maze.getCost(x, y) == 0) {
			// TODO: add what need to be done when center found
			return;
		}

		this->updateWalls(x, y, heading);

		// rerun flood fill
		this->maze.update();

		driveToNextCell(actualSpeed);
		// give us some time to print

		// this->maze.printMaze(x, y);
		// give us some time to print
	}
}
