#include "nav/RobotDriver.hpp"

#include "drive/DriveTask.hpp"
#include "message.pb.h"
#include "stdbool.h"

static const char* TAG = "[driver]";

RobotDriver::RobotDriver() {
	this->executionQueue = xQueueCreate(3, sizeof(MsgDrive));

	this->eventHandle = xEventGroupCreate();

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