#pragma once

#include <driver/pcnt.h>

#include "support/Resource.hpp"

class PulseCounterResource {
   public:
	PulseCounterResource() = default;
	~PulseCounterResource() = default;

	PulseCounterResource(PulseCounterResource&) = delete;
	PulseCounterResource(PulseCounterResource&&) = delete;

	operator pcnt_unit_t() const {
		return impl;
	}

   private:
	CountedResource<pcnt_unit_t, PCNT_UNIT_MAX> impl;
};
