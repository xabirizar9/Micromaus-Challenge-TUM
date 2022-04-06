#include "filter/Location.hpp"

#include <esp_log.h>

#include <cmath>

#include "nav/Position.hpp"
#include "support/Linalg.hpp"
#include "utils/units.hpp"

using namespace nav;
using namespace la;

static const char* TAG = "Location";
static const float relativeVelocityError = 0.01;

Location::Location()
	: rpd({9, 9},
		  Heading(CardinalDirection::EAST).toRad(),
		  {0, 0},
		  0,
		  {{9, 0, 0, 0, 9, 0, 0, 0, PI / 4}},
		  Mat3f{}) {}

void Location::pin() {
	rpd.positionStd = Mat3f();
	rpd.velocityStd = Mat3f();
}

/* The motion model: see Thrun et al., Probabilistic Robotics, p. 127
 */
static Vec2f predictPosMeanDelta(const float v,
								 const float omega,
								 const float theta,
								 const float delT) {
	// only if omega is sufficiently large
	const float r = std::fabs(v / omega);
	const float phi = omega * delT;
	return Vec2f{std::sin(theta + phi) - std::sin(theta), std::cos(theta) - std::cos(theta + phi)} *
		   r;
}

static Vec2f predictPosMeanDeltaSmallOmega(const float v,
										   const float omega,
										   const float theta,
										   const float delT) {
	// only if omega is small
	const float s = v * delT;
	Vec2f straight = Vec2f{std::cos(theta), std::sin(theta)} * 2;
	Vec2f corr = Vec2f{-std::sin(theta), std::cos(theta)} * delT * s * omega / 2;
	return straight + corr;
}

static Mat3f predictPosMeanDeltaSmallOmegaJacobian(const float v,
												   const float omega,
												   const float theta,
												   const float delT) {
	const float s = v * delT;
	const float fac = s * delT * omega / 2;
	const float sint = std::sin(theta);
	const float cost = std::cos(theta);
	return {{1, 0, -s * sint - fac * cost, 0, 1, +s * cost - fac * sint, 0, 0, 0}};
}

static Vec2f predictPosMeanDeltaSmallOmegaNoise(const float v,
												const float omega,
												const float theta,
												const float delT) {
	// 1% error
	const float eOmega = omega * relativeVelocityError;
	const float eV = v * relativeVelocityError;
	// this works as predictPosMeanDeltaSmallOmega is linear in these params
	return (predictPosMeanDeltaSmallOmega(v, eOmega, theta, delT) +
			predictPosMeanDeltaSmallOmega(eV, omega, theta, delT));
}

void Location::predict(float leftVelocity, float rightVelocity, float delT) {
	RobotPositionDistribution newDist;

	const float forwardVelInRobotCS = leftVelocity + rightVelocity;
	// der roboter ist vom Trägheitsmoment her gesehen ein Vollzylinder, die Symmetrieachse ist die
	// Roboter-Z-Achse (recht weit hinten).
	const float rotationalVelAroundCenter = (rightVelocity - leftVelocity) / wheelDistance;

	// update the means
	if (rotationalVelAroundCenter * delT < 0.4) {
		// then the rel. error by the approximation is smaller than ~ 0.1%
		newDist.positionMean = predictPosMeanDeltaSmallOmega(
			forwardVelInRobotCS, rotationalVelAroundCenter, rpd.thetaMean, delT);
	} else {
		ESP_LOGE(TAG,
				 "velocity/update frequency factor too high! we need to implement mean propagation "
				 "for precise model");
		newDist.positionMean = predictPosMeanDelta(
			forwardVelInRobotCS, rotationalVelAroundCenter, rpd.thetaMean, delT);
	}

	newDist.thetaMean = rpd.thetaMean + rotationalVelAroundCenter * delT;

	newDist.velocityMean =
		forwardVelInRobotCS * Vec2f{std::cos(newDist.thetaMean), std::sin(newDist.thetaMean)};
	newDist.omegaMean = rotationalVelAroundCenter;

	// update the standard deviations
	auto G_t = predictPosMeanDeltaSmallOmegaJacobian(
		forwardVelInRobotCS, rotationalVelAroundCenter, rpd.thetaMean, delT);
	auto R_t = predictPosMeanDeltaSmallOmegaNoise(
		forwardVelInRobotCS, rotationalVelAroundCenter, rpd.thetaMean, delT);

	newDist.velocityStd = {newDist.velocityMean.x() * relativeVelocityError,
						   0,
						   0,
						   0,
						   newDist.velocityMean.y() * relativeVelocityError,
						   0,
						   0,
						   0,
						   rotationalVelAroundCenter * relativeVelocityError};
	newDist.positionStd = G_t * rpd.positionStd * G_t.trans() +
						  diag(Vec3f{R_t.x(), R_t.y(), rpd.thetaStd() + newDist.omegaStd() * delT});

	rpd = newDist;
}
