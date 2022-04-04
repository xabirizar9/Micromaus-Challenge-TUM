#pragma once

#include "filter/MapBelief.hpp"
#include "nav/Position.hpp"

class Mapper {
   public:
	Mapper();

	const MapBelief& getCurrentBelief() const {
		return bel;
	}

	void update(const nav::RobotPosition& currentPos);

   private:
	MapBelief bel;
};
