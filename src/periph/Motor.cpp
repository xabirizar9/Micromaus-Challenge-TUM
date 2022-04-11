#include "periph/Motor.hpp"

#include <algorithm>
#include <cmath>

#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "support/LEDCChannelResource.hpp"

Motor::Motor(uint8_t forwardPin, uint8_t backwardPin, uint8_t enPin)
	: channel(new LEDCChannelResource()), forwardPin(forwardPin), backwardPin(backwardPin) {
	gpio_config_t ioConf{
		.pin_bit_mask = (1ULL << forwardPin) | (1ULL << backwardPin) | (1ULL << enPin),
		.mode = GPIO_MODE_OUTPUT,
		.pull_up_en = GPIO_PULLUP_DISABLE,
		.pull_down_en = GPIO_PULLDOWN_DISABLE,
		.intr_type = GPIO_INTR_DISABLE};
	ESP_ERROR_CHECK(gpio_config(&ioConf));

	ledc_timer_config_t tConf{.speed_mode = LEDC_LOW_SPEED_MODE,
							  .duty_resolution = LEDC_TIMER_10_BIT,
							  .timer_num = LEDC_TIMER_0,
							  .freq_hz = 10000,
							  .clk_cfg = LEDC_AUTO_CLK};
	ESP_ERROR_CHECK(ledc_timer_config(&tConf));

	ledc_channel_config_t chanConf{.gpio_num = enPin,
								   .speed_mode = LEDC_LOW_SPEED_MODE,
								   .channel = *channel,
								   .intr_type = LEDC_INTR_DISABLE,
								   .timer_sel = LEDC_TIMER_0,
								   .duty = 0,
								   .hpoint = 0};
	ESP_ERROR_CHECK(ledc_channel_config(&chanConf));
}

Motor::Motor(IO::Motor io) : Motor(io.ch1, io.ch2, io.en) {}

Motor::~Motor() {
	setPWM(0.0);
	delete channel;
}

void Motor::setPWM(float val) {
	constexpr float maxDuty = 1024;	 // depending on
	bool reverse = (val < 0);
	uint32_t duty = lroundf(fabs(std::clamp(val, (float)-1.0, (float)1.0)) * maxDuty);

	ESP_ERROR_CHECK(ledc_set_duty(LEDC_LOW_SPEED_MODE, *channel, duty));

	gpio_set_level((gpio_num_t)forwardPin, (!reverse));
	gpio_set_level((gpio_num_t)backwardPin, reverse);

	ESP_ERROR_CHECK(ledc_update_duty(LEDC_LOW_SPEED_MODE, *channel));
}

void Motor::brakeMotor(float val) {
	gpio_set_level((gpio_num_t)forwardPin, 1);
	gpio_set_level((gpio_num_t)backwardPin, 1);
	uint32_t duty = lroundf(fabs(std::clamp(val, (float)-1.0, (float)1.0)) * 1);
	ESP_ERROR_CHECK(ledc_set_duty(LEDC_LOW_SPEED_MODE, *channel, duty));
	ESP_ERROR_CHECK(ledc_update_duty(LEDC_LOW_SPEED_MODE, *channel));
	// vTaskDelay(pdMS_TO_TICKS(20));
}

void Motor::updatePidConfig(MsgEncoderCallibration config) {
	this->kD = config.kD;
	this->kI = config.kI;
	this->kP = config.kP;

	// will be reset by PID task when changes are applied
	this->wasPidChanged = true;
};