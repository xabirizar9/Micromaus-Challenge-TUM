#include "periph/Encoder.hpp"

#include <driver/pcnt.h>
#include <esp_log.h>
#include <esp_compiler.h>

static const pcnt_unit_t theUnit = PCNT_UNIT_0;
static const constexpr int limit = 16*33*4;

Encoder::Encoder(uint8_t pinA, uint8_t pinB)
{
	pcnt_config_t conf {
		.pulse_gpio_num = pinA,
		.ctrl_gpio_num = pinB,
		.lctrl_mode = PCNT_MODE_REVERSE,
		.hctrl_mode = PCNT_MODE_KEEP,
		.pos_mode = PCNT_COUNT_DEC,
		.neg_mode = PCNT_COUNT_INC,
		.counter_h_lim = limit,
		.counter_l_lim = -limit,
		.unit = theUnit,
		.channel = PCNT_CHANNEL_0,
	};
	ESP_ERROR_CHECK(pcnt_unit_config(&conf));

	conf.pulse_gpio_num = pinB;
	conf.ctrl_gpio_num = pinA;
	conf.channel = PCNT_CHANNEL_1;
	conf.pos_mode = PCNT_COUNT_INC;
	conf.neg_mode = PCNT_COUNT_DEC;
	ESP_ERROR_CHECK(pcnt_unit_config(&conf));

	pcnt_counter_pause(theUnit);
	pcnt_counter_clear(theUnit);

	ESP_ERROR_CHECK(pcnt_isr_service_install(0));

	pcnt_isr_handler_add(theUnit, [](void* e){
			static_cast<Encoder*>(e)->onOverflow();
		}, this);

	pcnt_event_enable(theUnit, PCNT_EVT_H_LIM);
	pcnt_event_enable(theUnit, PCNT_EVT_L_LIM);

	pcnt_counter_resume(theUnit);
}

int16_t Encoder::get() const
{
	int16_t n;
	ESP_ERROR_CHECK(pcnt_get_counter_value(theUnit, &n));
	return n;
}

void Encoder::onOverflow()
{}
