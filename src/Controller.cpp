#include "Controller.hpp"

#include <math.h>
#include <stdint.h>

#include <algorithm>
#include <cstdint>

#include "IRSensor.hpp"
#include "config.h"
#include "drive/MotorPidTask.hpp"
#include "esp_log.h"
#include "freertos/FreeRTOS.h"
#include "freertos/queue.h"
#include "freertos/task.h"
#include "periph/Motor.hpp"
#include "utils/units.hpp"

static const char *TAG = "ctrl";

Controller::Controller()
	: leftMotor(Motor(IO::MOTOR_L)),
	  rightMotor(Motor(IO::MOTOR_R)),
	  leftEncoder(Encoder(IO::MOTOR_L.encoder)),
	  rightEncoder(Encoder(IO::MOTOR_R.encoder)),
	  leftSensor(IO::IR_SENSOR_LEFT),
	  rightSensor(IO::IR_SENSOR_RIGHT),
	  frontSensor(IO::IR_SENSOR_FRONT),
	  battery(power::Battery(IO::VSENSE)) {
	// init state stream object
	this->state.has_position = true;
	this->state.has_sensors = true;
	this->state.position = Position_init_zero;
	this->state.position.heading = M_PI_2;
	this->state.sensors = SensorPacket_init_zero;

	// init pid payload
	// PidTaskInitPayload *leftPayload = new PidTaskInitPayload();
	// leftPayload->controller = this;
	// leftPayload->position = MotorPosition::MotorPosition_left;
	// PidTaskInitPayload *rightPayload = new PidTaskInitPayload();
	// rightPayload->controller = this;
	// rightPayload->position = MotorPosition::MotorPosition_right;

	// setup pids to control the motors
	xTaskCreate(motorPidTask, "motorPidTask", 4096, this, 1, &this->motorPidTaskHandle);
}

/******************************************************************
 * Driving related methods
 ******************************************************************/

void Controller::setSpeed(int16_t speed) {
	this->state.leftMotorSpeed = (float)speed;
	this->state.rightMotorSpeed = (float)speed;

	// since speed is given in mm/s and our PID is using ticks/s
	// we have to convert them

	// TODO: @wlad convert from mm/s to encoder ticks for now use some magic numbers
	this->leftSpeedTickTarget = this->rightSpeedTickTarget =
		convertMillimetersToRevolutions((float)speed) * ticksPerRevolution;
}

void Controller::updateSensors() {
	// update sensor readings with offset
	this->state.sensors.left = leftSensor.measuredistance();
	this->state.sensors.right = rightSensor.measuredistance();
	this->state.sensors.front = frontSensor.measuredistance();
}

static void copyPosDistToState(NavigationPacket &state, const RobotPositionDistribution &rpd) {
	PosDistribution &pd(state.posDistribution);
	memcpy(pd.positionMean, rpd.positionMean.data.data(), 2 * sizeof(float));
	pd.positionMean[2] = rpd.thetaMean;
	memcpy(pd.velocityMean, rpd.velocityMean.data.data(), 2 * sizeof(float));
	pd.velocityMean[2] = rpd.omegaMean;
	memcpy(pd.positionStd, rpd.positionStd.data.data(), 9 * sizeof(float));
	memcpy(pd.velocityStd, rpd.velocityStd.data.data(), 9 * sizeof(float));
}

void Controller::updatePosition() {
	static int64_t leftTicks =
		this->getEncoder(MotorPosition::MotorPosition_left)->getTotalCounter();
	static int64_t rightTicks =
		this->getEncoder(MotorPosition::MotorPosition_right)->getTotalCounter();

	// distance the wheels have traveled
	float left =
		(this->getEncoder(MotorPosition::MotorPosition_left)->getTotalCounter() - leftTicks) *
		encoderTicksToMm;
	float right =
		(this->getEncoder(MotorPosition::MotorPosition_right)->getTotalCounter() - rightTicks) *
		encoderTicksToMm;

	float center = (left + right) / 2.0;

	// current heading as theta
	// our wheelDistance is the hypotenuse while right-left form the triangle side
	this->state.position.heading += (right - left) / wheelDistance;

	// to confirm we could compute the angle
	// ESP_LOGE(TAG, "robot angle %f", sin(this->state.position.heading));

	this->state.position.x += center * cos(this->state.position.heading);
	this->state.position.y += center * sin(this->state.position.heading);

	leftTicks = this->getEncoder(MotorPosition::MotorPosition_left)->getTotalCounter();
	rightTicks = this->getEncoder(MotorPosition::MotorPosition_right)->getTotalCounter();

	// slam.predict(state.leftMotorSpeed / 10.f, state.rightMotorSpeed / 10.f);
	// copyPosDistToState(state, slam.getPositionDistribution());
}

void Controller::setDirection(int16_t direction) {
	this->direction = direction;
	// TODO: implement

	this->drive(this->speed, direction);
}

void Controller::drive(int16_t speed, int16_t R) {
	switch (R) {
		case 0:
			this->state.leftMotorSpeed = speed;
			this->state.rightMotorSpeed = speed;
			// leftMotor.brakeMotor(1);
			// rightMotor.brakeMotor(1);
			// vTaskDelay(pdMS_TO_TICKS(7000));
			break;
		case INT16_MIN:
			this->state.leftMotorSpeed = -speed;
			this->state.rightMotorSpeed = speed;
			break;
		case INT16_MAX:
			this->state.leftMotorSpeed = speed;
			this->state.rightMotorSpeed = -speed;
			break;
		default:
			if (R > 0) {
				this->state.rightMotorSpeed = speed * (1 + 0.5 * wheelDistance / R);
				this->state.leftMotorSpeed = 2 * speed - this->state.rightMotorSpeed;
			} else {
				R = -R;
				this->state.leftMotorSpeed = speed * (1 + 0.5 * wheelDistance / R);
				this->state.rightMotorSpeed = 2 * speed - this->state.leftMotorSpeed;
			}
	}

	// update encoder values
	this->leftSpeedTickTarget =
		convertMillimetersToRevolutions((float)this->state.leftMotorSpeed) * ticksPerRevolution;
	this->rightSpeedTickTarget =
		convertMillimetersToRevolutions((float)this->state.rightMotorSpeed) * ticksPerRevolution;

	return;
}

float Controller::getSpeedInTicks(MotorPosition position) {
	switch (position) {
		case MotorPosition::MotorPosition_left: return this->leftSpeedTickTarget;
		case MotorPosition::MotorPosition_right: return this->rightSpeedTickTarget;
		default: return 0;
	}
}

int16_t Controller::getSpeed() {
	return this->speed;
}

void Controller::turnOnSpot(float degree, int16_t speed) {
	// vTaskDelay(pdMS_TO_TICKS(5000));
	int8_t pre = -1;
	if (degree < 0) {
		pre = 1;
	}
	uint8_t rMaus = 60;
	float dRad = abs(degree) * rMaus;
	float duration = dRad / speed;

	this->leftSpeedTickTarget = convertMMsToTPS(-pre * speed);
	this->rightSpeedTickTarget = convertMMsToTPS(pre * speed);

	ESP_LOGI(TAG, "no time passed %f %f", leftSpeedTickTarget, rightSpeedTickTarget);

	vTaskDelay(pdMS_TO_TICKS(duration));
	this->setSpeed(0);
}

/******************************************************************
 * Utility Methods
 ******************************************************************/

Encoder *Controller::getEncoder(MotorPosition position) {
	switch (position) {
		case MotorPosition::MotorPosition_left: return &this->leftEncoder;
		case MotorPosition::MotorPosition_right: return &this->rightEncoder;
		default:
			// should be unreachable
			return NULL;
	}
}

Motor *Controller::getMotor(MotorPosition position) {
	switch (position) {
		case MotorPosition::MotorPosition_left: return &this->leftMotor;
		case MotorPosition::MotorPosition_right: return &this->rightMotor;
		default:
			// should be unreachable
			return NULL;
	}
}

const NavigationPacket &Controller::getState() {
	this->state.timestamp = xTaskGetTickCount();
	this->state.leftEncoderTotal =
		this->getEncoder(MotorPosition::MotorPosition_left)->getTotalCounter();
	this->state.rightEncoderTotal =
		this->getEncoder(MotorPosition::MotorPosition_right)->getTotalCounter();
	this->updateSensors();
	this->state.batPercentage = this->battery.getPercentage();
	this->state.voltage = this->battery.getVoltage();
	return this->state;
}

void Controller::setPosition(float x, float y, float heading) {
	this->state.position.x = x;
	this->state.position.y = y;
	this->state.position.heading = M_PI_2 + heading;
}

/******************************************************************
 * Pid Tuning methods
 ******************************************************************/

void Controller::updateLanePid(MsgEncoderCallibration config) {
	this->lanePidConfig = config;
}

MsgEncoderCallibration Controller::getLanePidConfig() {
	return this->lanePidConfig;
}

void Controller::startPidTuning() {
	if (this->pidTuningSamples) {
		delete pidTuningSamples;
	}
	this->currentPidTuningSampleIndex = 0;
	this->pidTuningSamples = new PidTuningInfo;
	this->isPidTuningEnabled = true;
}

void Controller::stopPidTuning() {
	this->isPidTuningEnabled = false;
}

void Controller::appendPidTuningSample(float sample) {
	if (this->currentPidTuningSampleIndex >= PID_TUNNING_BUFFER_SIZE) {
		this->stopPidTuning();
		return;
	}

	this->pidTuningSamples->err[this->currentPidTuningSampleIndex] = sample;
	this->currentPidTuningSampleIndex++;
}

bool Controller::getIsPidTuningEnabled() {
	return this->isPidTuningEnabled;
}

PidTuningInfo *Controller::getPidTuningBuffer() {
	return this->pidTuningSamples;
}

int64_t Controller::getAverageEncoderTicks() {
	int64_t right = this->getEncoder(MotorPosition::MotorPosition_right)->getTotalCounter();
	int64_t left = this->getEncoder(MotorPosition::MotorPosition_left)->getTotalCounter();
	return 0.5 * (right + left);
}
