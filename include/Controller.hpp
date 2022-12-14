#pragma once
#include <stdint.h>

#include "IRSensor.hpp"
#include "config.h"
#include "filter/SLAM.hpp"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "periph/Encoder.hpp"
#include "periph/Motor.hpp"
#include "periph/Power.hpp"

#define PID_TUNNING_BUFFER_SIZE 256

class Controller {
   private:
	TaskHandle_t motorPidTaskHandle;

	Motor leftMotor;
	Motor rightMotor;
	Encoder leftEncoder;
	Encoder rightEncoder;

	IRSensor leftSensor;
	IRSensor rightSensor;
	IRSensor frontSensor;

	int16_t speed;

	MsgEncoderCalibration lanePidConfig = {80, 0.0, 0.0, false};

	bool isPidTuningEnabled = false;
	uint32_t currentPidTuningSampleIndex = 0;
	PidTuningInfo *pidTuningSamples = NULL;

	// individual speed targets per motor
	float leftSpeedTickTarget = 0;
	float rightSpeedTickTarget = 0;

	// create packet storring current controller state
	NavigationPacket state;

	SLAM slam;

   public:
	Controller();
	~Controller();

	power::Battery battery;

	const NavigationPacket &getState();

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

	void updateSensors();

	/**
	 * @brief update position based on current encoder values
	 *
	 */
	void updatePosition();

	/**
	 * @brief Utility method to set both speed and direction
	 *
	 * @param speed speed in mm/s
	 * @param direction direction in rotational angle
	 */
	void drive(int16_t speed, int16_t direction);
	void turnOnSpot(float degree, int16_t speed);

	Encoder *getEncoder(MotorPosition position);
	Motor *getMotor(MotorPosition position);

	void setPosition(float x, float y, float heading);

	int64_t getAverageEncoderTicks();

	MsgEncoderCalibration getLanePidConfig();
	void updateLanePid(MsgEncoderCalibration config);

	// PID tuning routine
	void startPidTuning();
	void stopPidTuning();
	bool getIsPidTuningEnabled();
	PidTuningInfo *getPidTuningBuffer();
	void appendPidTuningSample(float sample);
};
