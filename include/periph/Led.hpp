
#include <driver/gpio.h>
#include <freertos/FreeRTOS.h>
#include <freertos/task.h>
#include <stdbool.h>
#include <stdint.h>

#include "config.h"

class LedController {
   private:
	gpio_num_t pin;
	bool isOn;
	TaskHandle_t blinkHandle = 0;

   public:
	LedController(gpio_num_t pin);
	~LedController();

	uint16_t blinkInterval;

	void set(bool on);
	void toggle();

	/**
	 * @brief start blinking in an interval
	 *
	 * @param duration interval in ms
	 */
	void startBlinking(uint16_t duration);
	void stopBlinking();
};