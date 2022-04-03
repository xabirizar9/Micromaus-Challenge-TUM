#include "drive/DriveTask.hpp"

#include <cmath>

#include "Controller.hpp"
#include "freertos/FreeRTOS.h"
#include "freertos/queue.h"
#include "message.pb.h"
#include "nav/MazeSolver.hpp"
#include "periph/Motor.hpp"
#include "utils/units.hpp"

void driveTask(void* arg) {
	RobotDriver* driver = (RobotDriver*)arg;
	uint16_t navInterval = 100;
	NavigationPacket state;
	Controller* controller = driver->controller;
	QueueHandle_t execQueue = driver->executionQueue;

	MsgDrive cmd;
	MsgDrive* curCmd;

	while (true) {
		// update and get state
		controller->updateSensors();
		controller->updatePosition();
		state = controller->getState();

		if (curCmd == NULL) {
			if (xQueueReceive(execQueue, &cmd, 0)) {
				curCmd = &cmd;
				xEventGroupSetBits(driver->eventHandle, DRIVE_EVT_STARTED_BIT);
			} else {
				vTaskDelay(pdMS_TO_TICKS(navInterval));
				continue;
			}
		}

		// switch (cmd.type) {
		// 	case DriveCommandType::move: break;
		// }

		curCmd = NULL;

		// TODO: send this event when command is completed
		xEventGroupSetBits(driver->eventHandle, DRIVE_EVT_COMPLETED_BIT);

		vTaskDelay(pdMS_TO_TICKS(navInterval));
	}
}

void computeTrajectories(void* arg) {
	RobotDriver* driver = (RobotDriver*)arg;
	Controller* controller = driver->controller;

	int vMax = 500;
	int64_t tickStart = controller->getEncoder(left)->getTotalCounter();
	int tickEnd = mmsToTicks(500);
	int vStart = controller->getSpeed();
	int vEnd = 50;
	int tStart = xTaskGetTickCount();
	uint64_t tEnd = pdMS_TO_TICKS(1000 / (vMax * 0.9));

	uint64_t time = xTaskGetTickCount() - tStart;

	int a0, a1, a2, a3 = getMotionProfilePolynom(tickStart, tickEnd, vStart, vEnd, tStart, tEnd);
}

int getMotionProfilePolynom(
	int64_t& tickStart, int& tickEnd, int& vStart, int& vEnd, float& tStart, float& tEnd) {
	int b0, b1, b2, b3;
	float a0, a1, a2, a3;
	float ticksTime, tDiff, tickDiff;
	float tEnd2, tStart2, tEnd3, tStart3;

	tDiff = tEnd - tStart;
	tickDiff = tickEnd - tickStart;
	ticksTime = tickDiff / tDiff;

	b0 = tickStart;
	b1 = tickDiff;
	b2 = vStart - ticksTime;
	b3 = vEnd + vStart - 2 * ticksTime;

	tStart2 = pow(tStart, 2);
	tStart3 = pow(tStart, 3);
	tEnd2 = pow(tEnd, 2);
	tEnd3 = pow(tEnd, 3);

	a3 = b3 / (tEnd2 + tStart2 + 4 * tEnd * tStart);
	a2 = (a3 * (2 * tStart2 - tEnd2 + 2 * tEnd * tStart) - b2) / tDiff;
	a1 = (b1 - a2 * (tEnd2 - tStart2) - a3 * (tEnd3 - tStart3)) / tDiff;
	a0 = b0 - a1 * tStart + a2 * tStart2 + a3 * tStart3;

	return a0, a1, a2, a3;
};
