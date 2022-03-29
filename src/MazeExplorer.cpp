#include "MazeExplorer.hpp"

#include "drive/DriveTask.hpp"
#include "message.pb.h"
#include "stdbool.h"

static const char* TAG = "[explorer]";

RobotDriver::RobotDriver() {
	this->executionQueue = xQueueCreate(3, sizeof(MsgDrive));

	// task intended for state update and abstracted driving controls
	// like:
	// - drive n blocks
	// - drive 20mm
	// - rotate
	// - ...
	xTaskCreate(driveTask, "driveTask", 2048, this, 1, &this->driveTaskHandle);
}

RobotDriver::~RobotDriver() {
	vTaskDelete(this->driveTaskHandle);
	vQueueDelete(this->executionQueue);
}

void RobotDriver::addCmd(DriveCmdType type, float value, float speed) {
	static MsgDrive cmd;

	cmd.type = type;
	cmd.value = value;
	cmd.speed = speed;

	xQueueSend(this->executionQueue, &cmd, 0);
}

// _____________
// |_|_|_|_|_|_|
// |_|_|_|_|_|_|
// |_|_|x|x|_|_|
// |_|_|x|x|_|_|
// |_|_|_|_|_|_|
// |_|_|_|_|_|_|

MazeExplorer::MazeExplorer(Controller* controller) {
	this->controller = controller;

	int center = MAZE_SIZE / 2 - 1;
	bool isEven = MAZE_SIZE % 2 == 0;

	// init labyrinth with distances from center
	for (uint8_t i = 0; i < MAZE_SIZE; i++) {
		for (uint8_t j = 0; j < MAZE_SIZE; j++) {
			this->state[i * MAZE_SIZE + j] =
				(uint8_t)(std::min(std::abs(center - i), std::abs(center + isEven - i)) +
						  std::min<uint8_t>(std::abs(center - j), std::abs(center + isEven - j)));
		};
	}
}

uint8_t MazeExplorer::getCost(uint8_t x, uint8_t y) {
	if (x == 0 || y == 0 || x > MAZE_SIZE || y > MAZE_SIZE) {
		ESP_LOGE(TAG, "required coordinates outside the bounds of maze [1..%d]", MAZE_SIZE);
		return UINT8_MAX;
	}
	return this->state[(x - 1 * MAZE_SIZE) + y - 1];
}

void MazeExplorer::start() {
	uint8_t x = 1;
	uint8_t y = 1;

	// costs for north, east, south, west
	uint8_t costs[4];

	// FIXME: use types from alex
	enum CostIndex { north, east, south, west };

	CostIndex heading = CostIndex::north;
	uint8_t costIndex = 0;
	uint16_t speed = 300;
	// TODO: split into task

	while (true) {
		// TODO: check wall collisions here

		// TODO: rerun flood on all cells

		// find cell will lover cost/distance to center;
		// TODO: find more optimal solution

		costs[CostIndex::north] = this->getCost(x, y + 1);
		costs[CostIndex::east] = this->getCost(x + 1, y);
		costs[CostIndex::south] = this->getCost(x, y - 1);
		costs[CostIndex::west] = this->getCost(x - 1, y);

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

		// TODO: wait for command to be completed

		this->addCmd(DriveCmdType::DriveCmdType_Move, 1, speed);

		vTaskDelay(pdMS_TO_TICKS(200));
	}
}