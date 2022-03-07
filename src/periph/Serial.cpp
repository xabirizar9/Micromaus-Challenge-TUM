#include "periph/Serial.hpp"
#include "config.h"
#include <driver/uart.h>

const uart_port_t defaultUART = UART_NUM_0;

HardwareSerial::HardwareSerial(uint8_t txPin, uint8_t rxPin)
{
	uart_config_t uart_config {
		.baud_rate = 115200,
		.data_bits = UART_DATA_8_BITS,
		.parity = UART_PARITY_DISABLE,
		.stop_bits = UART_STOP_BITS_1,
		.flow_ctrl = UART_HW_FLOWCTRL_DISABLE,
		.rx_flow_ctrl_thresh = 122,
		.source_clk = UART_SCLK_APB,
	};

	ESP_ERROR_CHECK(uart_driver_install(defaultUART, 1024, 1024,
				0, nullptr, 0));

	ESP_ERROR_CHECK(uart_param_config(defaultUART, &uart_config));

	// -1 are pin numbers for flow control
	ESP_ERROR_CHECK(uart_set_pin(defaultUART, txPin, rxPin, -1, -1));
}

void HardwareSerial::write(std::string_view msg)
{
	uart_write_bytes(defaultUART, msg.data(), msg.length());
}

void HardwareSerial::println(std::string_view msg)
{
	write(msg);
	write("\n");
}
