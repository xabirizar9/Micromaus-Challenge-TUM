#include "drive/DriveTask.hpp"

#include "Controller.hpp"
#include "periph/Motor.hpp"

void driveTask(void *arg) {
	Controller *controller = (Controller *)arg;
	uint16_t navInterval = 100;
	NavigationPacket state;

	while (true) {
		// update and get state
		controller->updateSensors();
		controller->updatePosition();
		state = controller->getState();

		vTaskDelay(pdMS_TO_TICKS(navInterval));
	}
}