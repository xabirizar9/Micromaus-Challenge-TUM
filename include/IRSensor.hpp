#pragma once
#include <driver/adc.h>
#include <driver/gpio.h>
#include <esp_log.h>
#include <freertos/FreeRTOS.h>
#include <freertos/task.h>
#include <stdint.h>

#include "periph/Serial.hpp"
#include "sdkconfig.h"
#include "support/ADC.hpp"

// extern struct SensorPacket currentInfo;

class IRSensor {
   public:
	/* data */
	IRSensor(ADCChannel channel);
	IRSensor(uint8_t pin);

	float measuredistance();
	void toggleled(float ms);

	// IR_Sensors sns(ADC2::instance().configurePin(15))
   private:
	ADCChannel channel;
	void enableSensors();
};

void someMethod();
