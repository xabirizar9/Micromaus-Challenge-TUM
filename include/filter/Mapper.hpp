#pragma once

#include "filter/MapBelief.hpp"
#include "filter/Position.hpp"

class Mapper {
   public:
	Mapper();

	const MapBelief& getCurrentBelief() const {
		return bel;
	}

	void update(const RobotPosition& currentPos);

   private:
	MapBelief bel;
};
