#include "Controller.hpp"
#include "freertos/FreeRTOS.h"
#include "freertos/queue.h"
#include "message.pb.h"

#define MAZE_SIZE 6

enum DriveCommandType {
	move,
	moveCells,
	turnAround,
	turnLeft,
	turnRight,
	turnLeftOnSpot,
	turnRightOnSpot,
};

struct DriveCommand {
	DriveCommandType type;
	float payload;
};
class RobotDriver {
	TaskHandle_t driveTaskHandle;
	// queue of drive commands to be executed;

   public:
	RobotDriver();
	~RobotDriver();

	xQueueHandle executionQueue;
	Controller *controller;
};

class MazeExplorer : public RobotDriver {
	uint8_t *state[MAZE_SIZE * MAZE_SIZE];

   private:
	Controller *controller;

   public:
	MazeExplorer();

	void start(Position target);
	void pause();
};