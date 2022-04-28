#pragma once
#include "drive/PID.hpp"

#define OPTIMAL_WALL_DISTANCE 36

// minimal correction amount e.g. distance between walls
// below this threshold the robot will driver straight
#define MIN_CORRECTION_AMOUNT 5

// largest radius the robot will drive to correct error e.g. small corrections
#define CORRECTION_MIN_BOUND (double)2000.0

// smallest radius the robot will drive to correct error e.g. large corrections
#define CORRECTION_MAX_BOUND (double)1600.0

class LaneControlPID : private PID {
   private:
	Controller *controller;
	/**
	 * @brief new direction to be used in robot drive call
	 *
	 */
	double *laneOutput;

   public:
	LaneControlPID(double *output, uint32_t sampleTimeInMs, Controller *controller);
	void evaluate();
};
