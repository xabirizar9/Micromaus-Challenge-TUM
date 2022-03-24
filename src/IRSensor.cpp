#include "IRSensor.hpp"

#include "config.h"

IRSensor::IRSensor(ADCChannel channel) : channel(channel) {
	enableSensors();
}
IRSensor::IRSensor(uint8_t pin) : channel(ADC1::instance().configurePin(pin)) {
	enableSensors();
}

float IRSensor::measuredistance() {
	float vol = channel.read() * (2.2 / 8192);
	float distance = 0;

	if (vol > 2.1) {
		distance = -0.79 * vol + 3.66;
	}

	else if (vol <= 2.1 && vol > 1.05) {
		distance = -2.86 * vol + 8;
	}

	else if (vol <= 1.05 && vol > 0.6) {
		distance = -11.1 * vol + 16.66;
	}

	else if (vol <= 0.6 && vol > 0.4) {
		distance = -25 * vol + 25;
	}

	else if (vol <= 0.4 && vol > 0.3) {
		distance = -50 * vol + 35;
	}

	else {
		distance = 0.001;
	}

	return vol;
}

void IRSensor::toggleled(float ms) {
	vTaskDelay(ms / portTICK_RATE_MS);
	// Sensors::IR_Sensors::distance+=1;
}

void IRSensor::enableSensors() {
	gpio_config_t io_config;
	io_config.intr_type = (gpio_int_type_t)GPIO_INTR_DISABLE;
	io_config.mode = GPIO_MODE_OUTPUT;
	io_config.pin_bit_mask = (1ULL << IO::IR_SENSOR_ENABLE);
	// io_config.pin_bit_mask = (1ULL << FORWARD_PIN);
	io_config.pull_down_en = (gpio_pulldown_t)0;
	io_config.pull_up_en = (gpio_pullup_t)0;
	gpio_config(&io_config);
	gpio_set_level(GPIO_NUM_12, 1);
}