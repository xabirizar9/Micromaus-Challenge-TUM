#pragma once
#include "Controller.hpp"
#include "message.pb.h"

/**
 * @brief drivers straight for a predefined number of cells
 *
 * @param controller
 * @param cmd
 * @return true completed successfully
 * @return false critical error encountered and drive aborted before completion
 */
bool laneControlTask(Controller *controller, MsgDrive *cmd);