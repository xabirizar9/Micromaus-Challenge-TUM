#pragma once

#include "support/Linalg.hpp"

/**
 * Gaussian distribution of robot position.
 */
struct RobotPositionDistribution {
	la::Vec2f positionMean;
	float thetaMean;
	la::Vec2f velocityMean;
	float omegaMean;

	la::Mat<float, 2, 2> positionStd;
	float thetaStd;
	la::Mat<float, 2, 2> velocityStd;
	float omegaStd;
};
