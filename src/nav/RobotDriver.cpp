#include "nav/RobotDriver.hpp"

#include "drive/DriveTask.hpp"
#include "message.pb.h"
#include "stdbool.h"

static const char* TAG = "[driver]";

RobotDriver::RobotDriver() {
	this->executionQueue = xQueueCreate(1, sizeof(MsgDrive));

	this->eventHandle = xEventGroupCreate();

	// task intended for state update and abstracted driving controls
	// like:
	// - drive n blocks
	// - drive 20mm
	// - rotate
	// - ...
	xTaskCreate(driveTask, "driveTask", 4096, this, 1, &this->driveTaskHandle);
}

RobotDriver::~RobotDriver() {
	ESP_LOGI(TAG, "deleting...");
	vTaskDelete(this->driveTaskHandle);
	vQueueDelete(this->executionQueue);
}

void RobotDriver::addCmd(DriveCmdType type, float value, float speed) {
	static MsgDrive cmd;

	cmd.type = type;
	cmd.value = 4;
	cmd.speed = 300;

	xQueueSend(this->executionQueue, &cmd, 0);
}