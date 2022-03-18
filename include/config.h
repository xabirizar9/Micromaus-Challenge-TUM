
#ifdef ESP32_S2_MAUS

struct IO {	 // gpio numbers
	static constexpr uint8_t LED_DEBUG[4]{4, 3, 2, 1};

	static constexpr uint8_t BUTTON = 8;

	static constexpr uint8_t VSENSE = 5;

	static constexpr uint8_t IR_SENSOR_LEFT = 9;
	static constexpr uint8_t IR_SENSOR_FRONT = 10;
	static constexpr uint8_t IR_SENSOR_RIGHT = 6;
	static constexpr uint8_t IR_SENSOR_ENABLE = 12;

	struct Encoder {
		const uint8_t A;
		const uint8_t B;
	};

	struct Motor {
		const uint8_t EN;
		const uint8_t CH1;
		const uint8_t CH2;
		const Encoder ENCODER;
	};

	static constexpr Motor MOTOR_L{7, 19, 20, {21, 26}};
	static constexpr Motor MOTOR_R{13, 14, 15, {16, 17}};
};

#else
// add fallback config
struct IO {	 // gpio numbers
	static constexpr uint8_t LED_DEBUG[4]{4, 3, 2, 1};

	static constexpr uint8_t BUTTON = 8;

	static constexpr uint8_t VSENSE = 5;

	static constexpr uint8_t IR_SENSOR_LEFT = 9;
	static constexpr uint8_t IR_SENSOR_FRONT = 10;
	static constexpr uint8_t IR_SENSOR_RIGHT = 6;
	static constexpr uint8_t IR_SENSOR_ENABLE = 12;

	struct Encoder {
		const uint8_t A;
		const uint8_t B;
	};

	struct Motor {
		const uint8_t EN;
		const uint8_t CH1;
		const uint8_t CH2;
		const Encoder ENCODER;
	};

	static constexpr Motor MOTOR_L{7, 19, 20, {21, 26}};
	static constexpr Motor MOTOR_R{13, 14, 15, {16, 17}};
};

#endif
