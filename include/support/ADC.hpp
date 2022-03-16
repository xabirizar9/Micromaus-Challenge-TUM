#pragma once

#include <driver/adc.h>

#include <cstdint>

class ADC1;

class ADCChannel {
   public:
	/// read the channel
	int read();

   private:
	ADCChannel(ADC1& adc, adc1_channel_t channel) : adc(adc), channel(channel) {}

	ADC1& adc;
	adc1_channel_t channel;

	friend class ADC1;
};

class ADC1 {
   public:
	/// return singleton instance
	static ADC1& instance() {
		static ADC1 inst;
		return inst;
	};

	/// configure a channel for reading
	ADCChannel configureChannel(adc1_channel_t channel);
	ADCChannel configureChannel(uint8_t pin);

   private:
	ADC1();
	int read(adc1_channel_t);

	friend class ADCChannel;
};
