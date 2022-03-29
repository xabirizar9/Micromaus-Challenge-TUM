#include "Controller.hpp"
#include "message.pb.h"

#define MAZE_SIZE 6

class MazeExplorer {
	uint8_t *state[MAZE_SIZE * MAZE_SIZE];

   private:
	Controller *controller;

   public:
	void start(Position target);
	void pause();
};