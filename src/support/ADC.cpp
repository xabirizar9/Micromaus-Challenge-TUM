#include "support/ADC.hpp"

#include <driver/adc.h>
#include <esp_log.h>

#include <exception>

static const adc_bits_width_t ADC1_BIT_WIDTH = ADC_WIDTH_BIT_13;

class InvalidADC1Channel : public std::exception {
   public:
	const char* what() const noexcept override {
		return "ADC1 does not have a cannel for the pin you requested";
	}
};

ADC1::ADC1() {
	adc1_config_width(ADC1_BIT_WIDTH);
}

static adc1_channel_t adc1GetChannelByGPIONumber(uint8_t n) {
	// TODO this only works on S2
	if (n < 1 || n > 10) {
		throw InvalidADC1Channel();
	}
	// these are consecutive in an enum
	return static_cast<adc1_channel_t>(static_cast<uint8_t>(ADC1_CHANNEL_0) + (n - 1));
}

ADCChannel ADC1::configureChannel(uint8_t pin) {
	return configureChannel(adc1GetChannelByGPIONumber(pin));
}

ADCChannel ADC1::configureChannel(adc1_channel_t channel) {
	adc1_config_channel_atten(channel, ADC_ATTEN_DB_11);
	return ADCChannel(*this, channel);
}

int ADC1::read(adc1_channel_t ch) {
	return adc1_get_raw(ch);
}

int ADCChannel::read() {
	return adc.read(channel);
}
