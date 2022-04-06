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

	// standard devs include theta parts
	la::Mat3f positionStd;
	la::Mat3f velocityStd;

	RobotPositionDistribution() = default;
	RobotPositionDistribution(const la::Vec2f& pm,
							  float tm,
							  const la::Vec2f& vm,
							  float om,
							  const la::Mat3f& ps,
							  const la::Mat3f& vs)
		: positionMean(pm),
		  thetaMean(tm),
		  velocityMean(vm),
		  omegaMean(om),
		  positionStd(ps),
		  velocityStd(vs) {}

	float& thetaStd() {
		return positionStd.at(2, 2);
	}

	float& omegaStd() {
		return velocityStd.at(2, 2);
	}
};
