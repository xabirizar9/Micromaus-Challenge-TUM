#include "periph/Power.hpp"
#include "support/ADC.hpp"

using namespace power;

VoltageGauge::VoltageGauge(const uint8_t pin, const float scale, const float offset):
	channel(new ADCChannel(ADC1::instance().configurePin(pin))),
	scale(scale), offset(offset), reading(0.f)
{}

VoltageGauge::~VoltageGauge()
{
	delete channel;
}

float VoltageGauge::read()
{
	int raw = channel->read();
	reading = (raw - offset) * scale;
	return reading;
}

void Battery::update()
{
	voltage.read();
}

float Battery::getVoltage() const
{
	return voltage.getReading();
}

bool Battery::isConnected() const
{
	// 6.6V is the point under which we switch to USB power
	return getVoltage() >= 6.6; 
}

float Battery::getPercentage() const
{
	// this is super coarse
	return 100.f * (getVoltage() / 1.4 - 5.f);
}

bool Battery::isLow() const
{
	return getVoltage() <= 7.2;
}

