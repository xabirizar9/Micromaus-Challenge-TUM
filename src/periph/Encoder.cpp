#include "periph/Encoder.hpp"

#include <driver/pcnt.h>
#include <esp_compiler.h>

#include "support/PulseCounterResource.hpp"

static const constexpr int limit = 16 * 33 * 4;
static uint8_t isrServiceRefcount = 0;

Encoder::Encoder(uint8_t pinA, uint8_t pinB) : unit(new PulseCounterResource()) {
	pcnt_config_t conf{
		.pulse_gpio_num = pinA,
		.ctrl_gpio_num = pinB,
		.lctrl_mode = PCNT_MODE_REVERSE,
		.hctrl_mode = PCNT_MODE_KEEP,
		.pos_mode = PCNT_COUNT_DEC,
		.neg_mode = PCNT_COUNT_INC,
		.counter_h_lim = limit,
		.counter_l_lim = -limit,
		.unit = *unit,
		.channel = PCNT_CHANNEL_0,
	};
	ESP_ERROR_CHECK(pcnt_unit_config(&conf));

	conf.pulse_gpio_num = pinB;
	conf.ctrl_gpio_num = pinA;
	conf.channel = PCNT_CHANNEL_1;
	conf.pos_mode = PCNT_COUNT_INC;
	conf.neg_mode = PCNT_COUNT_DEC;
	ESP_ERROR_CHECK(pcnt_unit_config(&conf));

	pcnt_counter_pause(*unit);
	pcnt_counter_clear(*unit);

	if (!isrServiceRefcount) {
		ESP_ERROR_CHECK(pcnt_isr_service_install(0));
	}
	isrServiceRefcount++;

	pcnt_isr_handler_add(
		*unit, [](void* e) { static_cast<Encoder*>(e)->onOverflow(); }, this);

	pcnt_event_enable(*unit, PCNT_EVT_H_LIM);
	pcnt_event_enable(*unit, PCNT_EVT_L_LIM);

	pcnt_counter_resume(*unit);
}

Encoder::Encoder(IO::Encoder io) : Encoder(io.a, io.b) {}

Encoder::~Encoder() {
	pcnt_intr_disable(*unit);
	pcnt_isr_handler_remove(*unit);
	isrServiceRefcount--;
	if (!isrServiceRefcount) {
		pcnt_isr_service_uninstall();
	}
	delete unit;
}

int16_t Encoder::get() const {
	int16_t n;
	ESP_ERROR_CHECK(pcnt_get_counter_value(*this->unit, &n));
	return n;
}

void Encoder::reset(bool resetTotalCounter) {
	if (resetTotalCounter) {
		totalCounter = 0;
	} else {
		totalCounter += this->get();
	}
	pcnt_counter_clear(*unit);
}

void Encoder::onOverflow() {}

int64_t Encoder::getTotalCounter() const {
	return this->totalCounter;
}