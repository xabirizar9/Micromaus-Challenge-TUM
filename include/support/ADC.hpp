#pragma once

#include <driver/adc.h>

#include <cstdint>

class ADC1;

class ADCChannel {
   public:
	/// read the channel in millivolts, returns negative value on error
	int read();

   private:
	ADCChannel(uint8_t channel) : channel(channel) {}

	uint8_t channel;

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
	ADCChannel configurePin(uint8_t pin);

   private:
	ADC1();
	~ADC1();
	int read(uint8_t);
	void* characteristics;

	friend class ADCChannel;
};
