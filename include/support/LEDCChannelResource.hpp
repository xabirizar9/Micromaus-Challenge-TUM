#pragma once

#include <driver/ledc.h>

#include "support/Resource.hpp"

class LEDCChannelResource {
   public:
	LEDCChannelResource() = default;
	~LEDCChannelResource() = default;

	LEDCChannelResource(LEDCChannelResource&) = delete;
	LEDCChannelResource(LEDCChannelResource&&) = delete;

	operator ledc_channel_t() const {
		return impl;
	}

   private:
	CountedResource<ledc_channel_t, LEDC_CHANNEL_MAX> impl;
};
