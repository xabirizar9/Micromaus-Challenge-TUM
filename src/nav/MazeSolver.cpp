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

CardinalDirection getHeadingAfterCmd(CardinalDirection heading, MsgDrive cmd) {
	CardinalDirection newHeading = heading;

	switch (cmd.type) {
		case DriveCmdType::DriveCmdType_TurnRight:
		case DriveCmdType::DriveCmdType_TurnLeft:
			newHeading = CardinalDirection(
				heading + (cmd.type == DriveCmdType_TurnLeft ? cmd.value : -cmd.value));
			break;
		case DriveCmdType::DriveCmdType_TurnLeftOnSpot:
		case DriveCmdType::DriveCmdType_TurnRightOnSpot:
			newHeading = CardinalDirection(
				heading + (cmd.type == DriveCmdType_TurnLeftOnSpot ? cmd.value : +cmd.value));
			break;

		default: break;
	}

	return newHeading;
}

MsgDrive MazeSolver::getNextDriveCmd(float speed) {
	MsgDrive cmd;
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
		cmd.type = direction;
		cmd.speed = speed;
		cmd.value = turns;
		return cmd;
	}

	cmd.type = DriveCmdType_MoveCells;
	cmd.speed = speed;
	cmd.value = 1;

	return cmd;
}

void MazeSolver::driveToNextCell(float speed) {
	MsgDrive cmd = this->getNextDriveCmd(speed);
	CardinalDirection newHeading = getHeadingAfterCmd(this->heading, cmd);
	this->addCmdAndWait(cmd);

	if (newHeading != this->heading) {
		cmd = this->getNextDriveCmd(speed);
		this->addCmdAndWait(cmd);
		this->heading = newHeading;
	}

	// update position based on heading
	// TODO: maybe use robot position here
	switch (newHeading) {
		case CardinalDirection::NORTH:
			// ESP_LOGI(TAG, "h:%c (%f, %f) -> (%f, %f)", (char)heading, x, y, x, y + 1);
			y += 1;
			break;
		case CardinalDirection::EAST:
			// ESP_LOGI(TAG, "h:%c (%f, %f) -> (%f, %f)", (char)heading, x, y, x + 1, y);
			x += 1;
			break;
		case CardinalDirection::SOUTH:
			// ESP_LOGI(TAG, "h:%c (%f, %f) -> (%f, %f)", (char)heading, x, y, x, y - 1);
			y -= 1;
			break;
		case CardinalDirection::WEST:
			// ESP_LOGI(TAG, "h:%c (%f, %f) -> (%f, %f)", (char)heading, x, y, x - 1, y);
			x -= 1;
			break;
	}
}

std::vector<MazeDriveCmdNode> MazeSolver::computePath(float speed) {
	bool targetReached = false;
	std::vector<MazeDriveCmdNode> list;

	CardinalDirection heading = this->heading;
	CardinalDirection newHeading = this->heading;
	uint8_t x = 0;
	uint8_t y = 0;

	while (!targetReached) {
		MazeDriveCmdNode node = MazeDriveCmdNode{
			x,
			y,
			heading,
			getNextDriveCmd(speed),
		};
		newHeading = getHeadingAfterCmd(heading, node.cur);
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
		heading = newHeading;
		list.push_back(node);

		if (this->maze.getCost(x, y) == 0) {
			break;
		}
	}

	// optimize path
	uint8_t len = list.size();
	int i = 0;
	while (i < list.size()) {
		MazeDriveCmdNode node = list.at(i);

		switch (node.cur.type) {
			case DriveCmdType_MoveCells:
				// if the last command was also move cells combine them
				if (i > 0 && node.cur.type == DriveCmdType_MoveCells) {
					list.erase(list.begin() + i - 1);
					list.at(i).cur.value++;
					i = i - 1;
				}
				break;
			case DriveCmdType_TurnLeftOnSpot:
			case DriveCmdType_TurnRightOnSpot:
				if (i > 0 && i < list.size() - 1 && node.cur.value == 1 &&
					list.at(i - 1).cur.type == DriveCmdType_MoveCells &&
					list.at(i + 1).cur.type == DriveCmdType_MoveCells) {
					list.erase(list.begin() + i - 1, list.begin() + i + 1);

					// update current node
					list.insert(list.begin() + i - 1,
								MazeDriveCmdNode{node.x,
												 node.y,
												 node.heading,
												 MsgDrive{DriveCmdType_Move,
														  // drive a half cell
														  mazeCellSize / 2,
														  node.cur.speed}});
					list.insert(
						list.begin() + i - 1,
						MazeDriveCmdNode{node.x,
										 node.y,
										 node.heading,
										 MsgDrive{node.cur.type == DriveCmdType_TurnLeftOnSpot
													  ? DriveCmdType_TurnLeft
													  : DriveCmdType_TurnRight,
												  // drive a half cell
												  mazeCellSize / 2,
												  node.cur.speed}});

					list.insert(list.begin() + i - 1,
								MazeDriveCmdNode{node.x,
												 node.y,
												 node.heading,
												 MsgDrive{DriveCmdType_Move,
														  // drive a half cell
														  mazeCellSize / 2,
														  node.cur.speed}});
				}
			default: break;
		}
	}

	for (int i = 0; i < list.size(); i++) {
		ESP_LOGI(TAG,
				 "%d. type=%d, value=%f, speed=%f",
				 i,
				 list.at(i).cur.type,
				 list.at(i).cur.value,
				 list.at(i).cur.speed);
	}

	return list;
}

void MazeSolver::startFastRun(float speed) {
	this->isFastRun = true;
	uint16_t actualSpeed = (uint16_t)speed;
	// reset maze
	this->maze.resetCosts();

	std::vector<MazeDriveCmdNode> path = this->computePath(speed);
	for (const auto& node : path) {
		// broadcast current solver state
		sendSolverState();
		this->addCmdAndWait(node.cur);
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

	this->maze.setWall(0, 0, CardinalDirection::EAST, true);
	this->maze.setWall(0, 1, CardinalDirection::EAST, true);
	this->maze.setWall(0, 2, CardinalDirection::EAST, true);
	this->maze.setWall(0, 3, CardinalDirection::EAST, true);
	this->maze.setWall(0, 4, CardinalDirection::EAST, true);
	this->maze.setWall(0, 5, CardinalDirection::NORTH, false);
	this->maze.setWall(1, 5, CardinalDirection::SOUTH, true);
	this->maze.setWall(2, 5, CardinalDirection::SOUTH, true);
	this->maze.setWall(3, 5, CardinalDirection::SOUTH, true);
	this->maze.setWall(4, 5, CardinalDirection::SOUTH, true);

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
