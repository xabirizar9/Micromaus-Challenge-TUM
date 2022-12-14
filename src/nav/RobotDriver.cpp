#include "nav/RobotDriver.hpp"

#include "drive/DriveTask.hpp"
#include "esp_log.h"
#include "message.pb.h"
#include "stdbool.h"

static const char* TAG = "[driver]";

RobotDriver::RobotDriver() {
	this->executionQueue = xQueueCreate(3, sizeof(MsgDrive));
	this->motionProfileQueue = xQueueCreate(1, sizeof(DriveCmdWithMotionProfile));

	this->eventHandle = xEventGroupCreate();

	// task intended for state update and abstracted driving controls
	// like:
	// - drive n blocks
	// - drive 20mm
	// - rotate
	// - ...
	xTaskCreate(driveTask, "driveTask", 8192, this, 1, &this->driveTaskHandle);
	xTaskCreate(motionProfileTask, "motionProfileTask", 8192, this, 3, &this->motionTaskHandle);
}

RobotDriver::~RobotDriver() {
	ESP_LOGD(TAG, "deleting...");
	vTaskDelete(this->driveTaskHandle);
	vTaskDelete(this->motionTaskHandle);
	vQueueDelete(this->executionQueue);
}

void RobotDriver::addCmd(DriveCmdType type, float value, float speed) {
	static MsgDrive cmd;

	cmd.type = type;
	cmd.value = value;
	cmd.speed = speed;

	xQueueSend(this->executionQueue, &cmd, 0);
}

void waitForDriveCompletion(EventGroupHandle_t handle) {
	EventBits_t event;
	const TickType_t waitTicks = 100 / portTICK_PERIOD_MS;
	while (true) {
		event = xEventGroupWaitBits(handle, DRIVE_EVT_COMPLETED_BIT, true, true, waitTicks);
		if ((event & DRIVE_EVT_COMPLETED_BIT) == DRIVE_EVT_COMPLETED_BIT) {
			xEventGroupClearBits(handle, DRIVE_EVT_COMPLETED_BIT & DRIVE_EVT_STARTED_BIT);
			ESP_LOGD(TAG, "got cmd completed event");
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

/**
 * @brief the same as addCmd but waits for its completion
 *
 * @param type
 * @param value
 * @param speed
 */
void RobotDriver::addCmdAndWait(MsgDrive cmd) {
	this->addCmd(cmd.type, cmd.value, cmd.speed);
	waitForDriveCompletion(this->eventHandle);
}