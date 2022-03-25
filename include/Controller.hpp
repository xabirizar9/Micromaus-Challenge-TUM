#pragma once
#include <stdint.h>

#include "IRSensor.hpp"
#include "config.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "periph/Encoder.hpp"
#include "periph/Motor.hpp"

enum MotorPosition { left, right };

struct PIDErrors {
	float correction;
	float curError;
	float derError;
	float intError;
	float lastError;
};
class Controller {
   private:
	TaskHandle_t leftMotorPidTaskHandle;
	TaskHandle_t rightMotorPidTaskHandle;
	TaskHandle_t sensorRead;

	Motor leftMotor;
	Motor rightMotor;
	Encoder leftEncoder;
	Encoder rightEncoder;
	IRSensor leftSensor;
	IRSensor rightSensor;
	IRSensor frontSensor;

	// individual speed targets per motor
	float leftSpeedTickTarget = 0;
	float rightSpeedTickTarget = 0;

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

	int16_t direction = 0;
	int16_t speedTickTarget = 0;

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
	void turnright();
	void sensorUpdates();

	Encoder *getEncoder(MotorPosition position);
	Motor *getMotor(MotorPosition position);
};