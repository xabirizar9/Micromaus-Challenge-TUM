#include "periph/Encoder.hpp"

#include <driver/pcnt.h>
#include <esp_compiler.h>

#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "support/PulseCounterResource.hpp"

static const constexpr int limit = 16 * 33 * 4;
static uint8_t isrServiceRefcount = 0;

void encoderUpdater(void *pvParameter) {
	Encoder *enc = (Encoder *)pvParameter;
	uint32_t delay = pdMS_TO_TICKS(10);
	while (true) {
		enc->reset();
		vTaskDelay(delay);
	}
}

Encoder::Encoder(uint8_t pinA, uint8_t pinB) : unit(new PulseCounterResource()) {
	totalCounter = 0;
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

	// setup filter for runt pulses
	// pcnt_set_filter_value(*unit, 250);
	// pcnt_filter_enable(*unit);

	if (!isrServiceRefcount) {
		ESP_ERROR_CHECK(pcnt_isr_service_install(0));
	}
	isrServiceRefcount++;

	pcnt_isr_handler_add(
		*unit, [](void *e) { static_cast<Encoder *>(e)->onOverflow(); }, this);

	pcnt_event_enable(*unit, PCNT_EVT_H_LIM);
	pcnt_event_enable(*unit, PCNT_EVT_L_LIM);

	pcnt_counter_resume(*unit);

	xTaskCreate(encoderUpdater, "encoderUpdate", 1024, this, 1, NULL);
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
	totalCounter += this->get();
	pcnt_counter_clear(*unit);
}

void Encoder::onOverflow() {}

int64_t Encoder::getTotalCounter() const {
	return this->totalCounter;
}