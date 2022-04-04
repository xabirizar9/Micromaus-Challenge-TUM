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

/**
 * @brief the same as addCmd but waits for its completion
 *
 * @param type
 * @param value
 * @param speed
 */
void RobotDriver::addCmdAndWait(DriveCmdType type, float value, float speed) {
	this->addCmd(type, value, speed);
	waitForDriveCompletion(this->eventHandle);
}