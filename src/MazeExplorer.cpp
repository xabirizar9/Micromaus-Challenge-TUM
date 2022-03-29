#include "MazeExplorer.hpp"

#include "drive/DriveTask.hpp"

RobotDriver::RobotDriver() {
	this->executionQueue = xQueueCreate(3, sizeof(DriveCommand));

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

MazeExplorer::MazeExplorer() {
	// init labyrinth
}

void MazeExplorer::start() {
	controller->turnOnSpot(30, 300);

	controller->turnOnSpot(30, 300);

	controller->turnOnSpot(30, 300);
}