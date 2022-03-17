#pragma once

#include <cstdint>
#include <driver/adc.h>

class ADC;
class ADC1;
class ADC2;

class ADCChannel
{
public:
	/// read the channel
	int read();

private:
	ADCChannel(ADC &adc, uint8_t channel) : adc(adc), channel(channel) {}

	ADC &adc;
	uint8_t channel;

	friend class ADC1;
	friend class ADC2;
};

class ADC
{
public:
	/// configure a channel for reading
	virtual ADCChannel configurePin(uint8_t pin) = 0;

private:
	ADC() = default;

	virtual int read(uint8_t) = 0;
	friend class ADCChannel;
	friend class ADC1;
	friend class ADC2;
};

class ADC1 : public ADC
{
public:
	/// return singleton instance
	static ADC1 &instance()
	{
		static ADC1 inst;
		return inst;
	};

	/// configure a channel for reading
	ADCChannel configureChannel(adc1_channel_t channel);
	virtual ADCChannel configurePin(uint8_t pin) override;

private:
	ADC1();
	virtual int read(uint8_t) override;
};

class ADC2 : public ADC
{
public:
	/// return singleton instance
	static ADC2 &instance()
	{
		static ADC2 inst;
		return inst;
	};

	/// configure a channel for reading
	ADCChannel configureChannel(adc2_channel_t channel);
	virtual ADCChannel configurePin(uint8_t pin) override;

private:
	ADC2();
	virtual int read(uint8_t) override;
};
