#pragma once

namespace IO {

struct Encoder {
	const uint8_t a;
	const uint8_t b;

	Encoder(uint8_t a, uint8_t b) : a(a), b(b) {};
};

struct Motor {
	const uint8_t en;
	const uint8_t ch1;
	const uint8_t ch2;
	const Encoder encoder;

	Motor(uint8_t en, uint8_t ch1, uint8_t ch2, Encoder encoder) :
		en(en), ch1(ch1), ch2(ch2), encoder(encoder) {};

};
#ifdef ESP32_S2_MAUS
// gpio numbers
static constexpr uint8_t LED_DEBUG[4]{4, 3, 2, 1};

static constexpr uint8_t BUTTON = 8;

static constexpr uint8_t VSENSE = 5;

static constexpr uint8_t IR_SENSOR_LEFT = 9;
static constexpr uint8_t IR_SENSOR_FRONT = 10;
static constexpr uint8_t IR_SENSOR_RIGHT = 6;
static constexpr uint8_t IR_SENSOR_ENABLE = 12;

static const IO::Motor MOTOR_L{7, 19, 20, {26, 21}};
static const IO::Motor MOTOR_R{13, 15, 14, {16, 17}};

namespace SPI {
static constexpr uint8_t CS_INS = 34;
static constexpr uint8_t MOSI = 35;
static constexpr uint8_t CLK = 36;
static constexpr uint8_t MISO = 37;
}  // namespace SPI

#else
// gpio numbers
static constexpr uint8_t LED_DEBUG[4]{4, 3, 2, 1};

static constexpr uint8_t BUTTON = 8;

static constexpr uint8_t VSENSE = 5;

static constexpr uint8_t IR_SENSOR_LEFT = 9;
static constexpr uint8_t IR_SENSOR_FRONT = 10;
static constexpr uint8_t IR_SENSOR_RIGHT = 6;
static constexpr uint8_t IR_SENSOR_ENABLE = 12;

static const IO::Motor MOTOR_L{7, 19, 20, {26, 21}};
static const IO::Motor MOTOR_R{13, 14, 15, {16, 17}};

namespace SPI {
static constexpr uint8_t CS_INS = 34;
static constexpr uint8_t MOSI = 35;
static constexpr uint8_t CLK = 36;
static constexpr uint8_t MISO = 37;
}  // namespace SPI

#endif
}  // namespace IO