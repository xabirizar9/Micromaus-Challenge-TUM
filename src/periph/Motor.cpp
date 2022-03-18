#include "periph/Motor.hpp"
#include "support/LEDCChannelResource.hpp"

#include <cmath>

Motor::Motor(uint8_t forwardPin, uint8_t backwardPin, uint8_t enPin):
	channel(new LEDCChannelResource()),
	forwardPin(forwardPin), backwardPin(backwardPin)
{
	gpio_config_t ioConf {
		.pin_bit_mask = (1ULL << forwardPin) | (1ULL << backwardPin) | (1ULL << enPin),
		.mode = GPIO_MODE_OUTPUT,
		.pull_up_en = GPIO_PULLUP_DISABLE,
		.pull_down_en = GPIO_PULLDOWN_DISABLE,
		.intr_type = GPIO_INTR_DISABLE
	};
	ESP_ERROR_CHECK(gpio_config(&ioConf));

	ledc_timer_config_t tConf {
		.speed_mode = LEDC_LOW_SPEED_MODE,
		.duty_resolution = LEDC_TIMER_10_BIT,
		.timer_num = LEDC_TIMER_0,
		.freq_hz = 10000,
		.clk_cfg = LEDC_AUTO_CLK
	};
	ESP_ERROR_CHECK(ledc_timer_config(&tConf));

	ledc_channel_config_t chanConf {
		.gpio_num = enPin,
		.speed_mode = LEDC_LOW_SPEED_MODE,
		.channel = *channel,
		.intr_type = LEDC_INTR_DISABLE,
		.timer_sel = LEDC_TIMER_0,
		.duty = 0,
		.hpoint = 0
	};
	ESP_ERROR_CHECK(ledc_channel_config(&chanConf));
}

Motor::~Motor()
{
	setPWM(0.0);
	delete channel;
}

void Motor::setPWM(float val)
{
	constexpr float maxDuty = 1024; // depending on 	
	bool reverse = (val < 0);
	uint32_t duty = lroundf(fabs(val) * maxDuty);

	ESP_ERROR_CHECK(ledc_set_duty(LEDC_LOW_SPEED_MODE, *channel, duty));

	gpio_set_level((gpio_num_t) forwardPin, (!reverse));
	gpio_set_level((gpio_num_t) backwardPin, reverse);

	ESP_ERROR_CHECK(ledc_update_duty(LEDC_LOW_SPEED_MODE, *channel));
}

