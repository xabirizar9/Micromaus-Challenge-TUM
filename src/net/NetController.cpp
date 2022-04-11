#include "net/NetController.hpp"

#include <math.h>
#include <stdbool.h>
#include <stdint.h>
#include <stdio.h>
#include <string.h>

#include "config.h"
#include "esp_log.h"
#include "freertos/FreeRTOS.h"
#include "freertos/message_buffer.h"
#include "freertos/queue.h"
#include "message.pb.h"
#include "net/OTA.hpp"
#include "net/WifiCommunicator.hpp"
#include "pb_decode.h"
#include "pb_encode.h"
#include "periph/Led.hpp"
#include "sys/time.h"
#include "utils/units.hpp"

static const char *tag = "NET";
static const uint16_t sensorSendInterval = pdMS_TO_TICKS(200);

using namespace NetController;

/**
 * @brief task used to send current machine state to the remote server
 *
 * @param pvParameter
 */
void infoStreamerTask(void *pvParameter) {
	NetController::Manager *manager = (NetController::Manager *)pvParameter;
	while (true) {
		if (manager->controller == NULL || !manager->initCompleted) {
			vTaskDelay(sensorSendInterval);
			continue;
		}

		manager->writePacket<NavigationPacket, MausOutgoingMessage_nav_tag>(
			manager->controller->getState());

		vTaskDelay(sensorSendInterval);
	}
}

/**
 * @brief utility for protopb encoding of float arrays
 *
 * @param ostream
 * @param field
 * @param arg
 */
bool pidInfoEncoderCallback(pb_ostream_t *ostream, const pb_field_t *field, void *const *arg) {
	Controller *ctrl = (Controller *)(*arg);
	float *buf = ctrl->getPidTuningBuffer();
	// TODO: hardcoded  for now
	size_t len = PID_TUNNING_BUFFER_SIZE;

	// encode all numbers
	if (!pb_encode_tag_for_field(ostream, field)) {
		const char *error = PB_GET_ERROR(ostream);
		return false;
	}

	for (int i = 0; i < len; i++) {
		if (!pb_encode_fixed32(ostream, &buf[i])) {
			const char *error = PB_GET_ERROR(ostream);
			return false;
		}
		ESP_LOGI(tag, "%d %d", i, ostream->bytes_written);
	}

	return true;
}

void receiverTask(void *pvParameter) {
	static uint16_t taskInterval = pdMS_TO_TICKS(20);

	uint16_t msgLen = 0;
	NetController::Manager *manager = (NetController::Manager *)pvParameter;
	uint8_t *buffer = manager->decodeBuffer;
	MausIncomingMessage msg = MausIncomingMessage_init_default;
	MessageBufferHandle_t msgBuffer = manager->comInterface.getCmdReceiverMsgBuffer();
	ESP_LOGI(tag, "receiverTask started");

	bool wasPidCalibrationStarted = false;

	while (true) {
		if (msgBuffer == NULL) {
			// ESP_LOGD(tag, "not initialized");
			vTaskDelay(taskInterval);
			continue;
		}
		if (xMessageBufferIsEmpty(msgBuffer)) {
			// ESP_LOGI(tag, "queue empty");
			vTaskDelay(taskInterval);
			continue;
		}
		msgLen = xMessageBufferReceive(msgBuffer, buffer, RECV_BUFFER_SIZE, taskInterval);

		if (msgLen == 0) {
			// ESP_LOGI(tag, "empty message");
			vTaskDelay(taskInterval);
			continue;
		}

		// ESP_LOGI(tag, "persed incoming msg, bufLen=%d, msgLen=%d", 256, msgLen);

		pb_istream_t stream = pb_istream_from_buffer(buffer, msgLen);
		if (!pb_decode(&stream, MausIncomingMessage_fields, &msg)) {
			ESP_LOGE(tag, "failed to decode: %s", PB_GET_ERROR(&stream));
			continue;
		}

		ESP_LOGD(tag, "got msg ID=%d", msg.which_payload);

		switch (msg.which_payload) {
			case MausIncomingMessage_init_tag: {
				// TODO: improve memory management
				manager->initCompleted = true;

				manager->writePacket<AckPacket, MausOutgoingMessage_ack_tag>(AckPacket_init_zero);
				// send maus config to server
				MausConfigPacket config = MausConfigPacket_init_zero;
				config.has_lanePid = true;
				config.has_motorPid = true;
				config.motorPid.kD = manager->controller->getMotor(MotorPosition::left)->kD;
				config.motorPid.kP = manager->controller->getMotor(MotorPosition::left)->kP;
				config.motorPid.kI = manager->controller->getMotor(MotorPosition::left)->kI;
				config.lanePid = manager->controller->getLanePidConfig();
				manager->writePacket<MausConfigPacket, MausOutgoingMessage_mausConfig_tag>(config);

				ESP_LOGI(tag, "connected to connector v.%d", msg.payload.init.version);
				// set okay status LED
				LedController((gpio_num_t)3).set(1);

				break;
			}
			case MausIncomingMessage_encoderCallibration_tag:
				ESP_LOGD(tag,
						 "updated motors to kP=%f kD=%f kI=%f",
						 msg.payload.encoderCallibration.kP,
						 msg.payload.encoderCallibration.kD,
						 msg.payload.encoderCallibration.kI);
				// update values for both motors
				manager->controller->getMotor(MotorPosition::left)
					->updatePidConfig(msg.payload.encoderCallibration);
				manager->controller->getMotor(MotorPosition::right)
					->updatePidConfig(msg.payload.encoderCallibration);

				// start PID callibration routine
				if (msg.payload.encoderCallibration.streamData) {
					manager->controller->startPidTuning();
					wasPidCalibrationStarted = true;
				} else if (wasPidCalibrationStarted) {
					ESP_LOGD(tag, "pid monitor stopped");
					wasPidCalibrationStarted = false;
					PidTuningInfo info = PidTuningInfo_init_zero;
					info.err.arg = manager->controller->getPidTuningBuffer();
					info.err.funcs.encode = pidInfoEncoderCallback;
					manager->writePacket<PidTuningInfo, MausOutgoingMessage_pidTuning_tag>(info);
				}
				break;

			case MausIncomingMessage_laneCallibration_tag:
				ESP_LOGD(tag,
						 "updated lane PID to kP=%f kD=%f kI=%f",
						 msg.payload.laneCallibration.kP,
						 msg.payload.laneCallibration.kD,
						 msg.payload.laneCallibration.kI);
				// update values for both motors
				manager->controller->updateLanePid(msg.payload.laneCallibration);
				break;

			// ping pong interface
			case MausIncomingMessage_ping_tag:
				ESP_LOGI(tag, "ping<->pong");
				manager->writePacket<PongPacket, MausOutgoingMessage_pong_tag>(
					PongPacket_init_zero);
				break;

			case MausIncomingMessage_control_tag:
				manager->controller->drive(msg.payload.control.speed,
										   msg.payload.control.direction);
				ESP_LOGD(tag,
						 "rcv ctrl cmd s=%d d=%f",
						 msg.payload.control.speed,
						 msg.payload.control.direction);
				break;

			case MausIncomingMessage_drive_tag:
				if (manager->driver != NULL) {
					manager->driver->addCmd(
						msg.payload.drive.type, msg.payload.drive.value, msg.payload.drive.speed);
				}
				break;

			case MausIncomingMessage_setPosition_tag:
				ESP_LOGD(tag,
						 "set pos cmd x=%f y=%f h=%f",
						 msg.payload.setPosition.x,
						 msg.payload.setPosition.y,
						 msg.payload.setPosition.heading);
				// set position in maze coordiantes
				manager->driver->setPosition(msg.payload.setPosition.x / mazeCellSize,
											 msg.payload.setPosition.y / mazeCellSize);
				// set position in mm
				manager->controller->setPosition(msg.payload.setPosition.x,
												 msg.payload.setPosition.y,
												 msg.payload.setPosition.heading);
				break;

			case MausIncomingMessage_solve_tag:
				ESP_LOGD(tag, "got solve cmd type=%d", msg.payload.solve.type);
				switch (msg.payload.solve.type) {
					case SolveCmdType_Explore:
						manager->driver->startExploration(msg.payload.solve.speed);
						break;
					case SolveCmdType_FastRun:
						manager->driver->startFastRun(msg.payload.solve.speed);
						break;
					case SolveCmdType_GoHome:
						manager->driver->startGoHome(msg.payload.solve.speed);
						break;
				}
		}
		vTaskDelay(taskInterval);
	}
}
bool NetController::Manager::writeCmd(MausOutgoingMessage *msg) {
	MessageBufferHandle_t buffer = this->comInterface.getCmdSenderMsgBuffer();
	if (buffer == NULL) {
		ESP_LOGI(tag, "not initialized");
		return false;
	};

	// encode message in pb format
	pb_ostream_t stream = pb_ostream_from_buffer(this->encodeBuffer, SEND_BUFFER_SIZE);
	if (!pb_encode(&stream, MausOutgoingMessage_fields, msg)) {
		ESP_LOGE(tag, "failed to encode: %s", PB_GET_ERROR(&stream));
		return false;
	}

	// ESP_LOGI(tag, "sending message of size %d", stream.bytes_written);

	xMessageBufferSend(buffer, this->encodeBuffer, stream.bytes_written, 0);
	return true;
};

NetController::Manager::Manager() {
	this->comInterface = WifiCommunicator::getInstance();

#ifdef USE_OTA
	setupOta();
#endif

	xTaskCreate(receiverTask, "receiverTask", 9000, this, 5, NULL);

	xTaskCreate(&infoStreamerTask, "infoStreamerTask", 9000, this, 5, NULL);
};

/**
 * @brief send a command to the BT SPP sender queue
 *
 * @param msg message to send
 * @return true msg was added to the sender queue
 * @return false queue not initialized
 */
template <typename T, int msgTag>
void NetController::Manager::writePacket(T packet) {
	static MausOutgoingMessage msg = MausOutgoingMessage_init_zero;
	msg.which_payload = msgTag;
	*reinterpret_cast<T *>(&msg.payload) = packet;
	// ESP_LOGI(tag, "x %f y %f", msg.payload.nav.position.x, msg.payload.nav.position.y);

	writeCmd(&msg);
};

void NetController::Manager::writeMazeState(MazeStatePacket packet) {
	ESP_LOGI(tag, "writing packet");
	return this->writePacket<MazeStatePacket, MausOutgoingMessage_mazeState_tag>(packet);
}

void NetController::Manager::writeCmdState(MausCommandStatus packet) {
	return this->writePacket<MausCommandStatus, MausOutgoingMessage_mausCommandStatus_tag>(packet);
}