#pragma once
#include <stdint.h>

#include "config.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "message.pb.h"
#include "periph/Encoder.hpp"
#include "periph/Motor.hpp"
#include "periph/Power.hpp"

enum MotorPosition { left, right };

struct PIDErrors {
	int16_t correction;
	int16_t curError;
	int16_t derError;
	int16_t intError;
	int16_t lastError;
};
template <typename T = float>
void clamp(T &correction, T &intError, uint32_t &timeInterval, T minValue = -1.0, T maxValue = 1.0);
class Controller {
   private:
	TaskHandle_t leftMotorPidTaskHandle;
	TaskHandle_t rightMotorPidTaskHandle;

	Motor leftMotor;
	Motor rightMotor;
	Encoder leftEncoder;
	Encoder rightEncoder;

	// individual speed targets per motor
	float leftSpeedTickTarget = 0;
	float rightSpeedTickTarget = 0;

	int16_t direction = 0;
	int16_t speedTickTarget = 0;

	// create packet storring current controller state
	NavigationPacket state;

   public:
	Controller();
	~Controller();

	// power::Battery battery;

	NavigationPacket getState();

	/**
	 * @brief Get global robot speed (both motors) in mm/s
	 *
	 * @return int16_t
	 */
	int16_t getSpeed();

	/**
	 * @brief Get the Speed in encoder tick format for each motor
	 * usefull for PID correction
	 *
	 * @return int16_t speed in ticks per second
	 */
	float getSpeedInTicks(MotorPosition position);

	/**
	 * @brief Set global speed in mm/s
	 *
	 * @param speed
	 */
	void setSpeed(int16_t speed);
	void setDirection(int16_t direction);

	/**
	 * @brief Utility method to set both speed and direction
	 *
	 * @param speed speed in mm/s
	 * @param direction direction in rotational angle
	 */
	void drive(int16_t speed, int16_t direction);

	Encoder *getEncoder(MotorPosition position);
	Motor *getMotor(MotorPosition position);
};