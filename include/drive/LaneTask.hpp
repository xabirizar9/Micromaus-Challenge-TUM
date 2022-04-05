#pragma once
#include "Controller.hpp"
#include "message.pb.h"

void laneControlTask(Controller *controller, MsgDrive *cmd);