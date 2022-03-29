#include "MazeExplorer.hpp"

#include "drive/DriveTask.hpp"
#include "message.pb.h"
#include "stdbool.h"

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

void MazeExplorer::start() {}