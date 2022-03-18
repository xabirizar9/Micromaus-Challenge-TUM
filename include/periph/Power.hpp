#pragma once

#include <cstdint>

class ADCChannel;

namespace power {

// see measurements in `voltage_measurements.ods`
constexpr float MOUSE_VOLTAGE_SCALE = 133.f / 33.f * 1e-3;
constexpr float MOUSE_VOLTAGE_OFFSET = 0;

class VoltageGauge {
public:
	/// pin: gpio number, scale: 1/Volts, offset in adc ticks
	/// voltage will be computed as (adc_value + offset) / scale
	VoltageGauge(const uint8_t pin, const float scale, const float offset);
	~VoltageGauge();

	float read(); // in volts
	float getReading() const { return reading; }

private:
	// I am using a pointer here so i do not need to define ADCChannel.
	// this hides the driver/adc.h include from the user of Power.hpp
	// (I do not want C code implicitly included with this file)
	ADCChannel* channel;
	const float scale;
	const float offset;
	float reading;
};

class Battery {
public:
	/* with magic values for a 2s lipo */
	Battery(uint8_t pin):
		voltage(pin, MOUSE_VOLTAGE_SCALE, MOUSE_VOLTAGE_OFFSET)
	{}

	bool isConnected() const;
	bool isLow() const;
	float getVoltage() const;
	float getPercentage() const;

	void update();

private:
	VoltageGauge voltage;
};

}
