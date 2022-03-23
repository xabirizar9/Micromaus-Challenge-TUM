
#include "periph/Led.hpp"

#include <driver/gpio.h>
#include <freertos/FreeRTOS.h>
#include <freertos/task.h>
#include <stdint.h>

#include "config.h"
#include "esp_log.h"

static const char *tag = "LED";

LedController::LedController(gpio_num_t pin) : pin(pin) {
	// Configure pin
	gpio_config_t io_conf;
	io_conf.intr_type = (gpio_int_type_t)GPIO_PIN_INTR_DISABLE;
	io_conf.mode = GPIO_MODE_OUTPUT;
	io_conf.pin_bit_mask = (1ULL << pin);
	io_conf.pull_down_en = (gpio_pulldown_t)0;
	io_conf.pull_up_en = (gpio_pullup_t)0;
	gpio_config(&io_conf);
}

LedController::~LedController() {
	this->stopBlinking();
	gpio_reset_pin(this->pin);
};

void LedController::set(bool on) {
	this->isOn = on;
	gpio_set_level(this->pin, on);
}

void LedController::toggle() {
	this->set(!this->isOn);
}

void LedController::startBlinking(uint16_t interval) {
	// abort if task already running
	if (this->blinkHandle != 0) {
		ESP_LOGE(tag, "blinking routine already running cancel before starting a new one");
		return;
	}

	this->blinkInterval = interval;

	xTaskCreate(
		[](void *args) {
			LedController *ctrl = (LedController *)args;
			while (true) {
				ctrl->toggle();
				vTaskDelay(pdMS_TO_TICKS(ctrl->blinkInterval));
			}
		},
		"blinky",
		2048,
		this,
		5,
		&this->blinkHandle);
}

void LedController::stopBlinking() {
	if (this->blinkHandle != 0) {
		vTaskDelete(this->blinkHandle);
	}
}