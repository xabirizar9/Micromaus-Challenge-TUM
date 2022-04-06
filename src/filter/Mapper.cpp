#include "filter/Mapper.hpp"

using namespace nav;

Mapper::Mapper() : bel(6, 6, 0.5) {}

void update(const RobotPosition& currentPos) {
	// TODO

	// for every distance sensor,
	//		compute the walls within the beam of the sensor with max.
	//		distance 20cm.
	//
	//		for all combinations C whether these walls are set,
	//			compute observation probability
	//			p(current Sensor measurement | currentPos, C)
	//		weight these with prior belief, normalize, write back to
	//		MapBelief.
}
