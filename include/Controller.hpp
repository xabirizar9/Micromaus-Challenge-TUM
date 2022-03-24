#pragma once
#include <stdint.h>

#include "config.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "periph/Encoder.hpp"
#include "periph/Motor.hpp"

enum MotorPosition { left, right };
class Controller {
   private:
	TaskHandle_t leftMotorPidTaskHandle;
	TaskHandle_t rightMotorPidTaskHandle;

	Motor leftMotor;
	Motor rightMotor;
	Encoder leftEncoder;
	Encoder rightEncoder;

	// individual speed targets per motor
	int16_t leftSpeedTickTarget;
	int16_t rightSpeedTickTarget;

	int16_t direction = 0;
	int16_t speedTickTarget = 0;

   public:
	Controller();
	~Controller();

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
	 * @return int16_t speed per msec
	 */
	int16_t getSpeedInTicks(MotorPosition position);

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

	Encoder* getEncoder(MotorPosition position);
	Motor* getMotor(MotorPosition position);
};