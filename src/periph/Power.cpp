#include "periph/Power.hpp"
#include "support/ADC.hpp"

#include <freertos/FreeRTOS.h>
#include <freertos/task.h>
#include <esp_log.h>

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

PowerManagement::PowerManagement(uint8_t batteryPin):
	bat(batteryPin)
{
	xTaskCreate((void(*)(void*)) PowerManagement::_run, "pwr_mgmt",
			512, this, 1, &taskHandle);
}

PowerManagement::~PowerManagement()
{
	vTaskDelete(taskHandle);
}

void PowerManagement::run()
{
	while (true) {
		bat.update();
		vTaskDelay(pdMS_TO_TICKS(10'000));
	}
}

