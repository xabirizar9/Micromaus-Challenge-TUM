#include "net/NetController.hpp"

#include <math.h>
#include <stdbool.h>
#include <stdint.h>
#include <stdio.h>
#include <string.h>

#include "esp_log.h"
#include "freertos/FreeRTOS.h"
#include "freertos/message_buffer.h"
#include "freertos/queue.h"
#include "message.pb.h"
#include "pb_decode.h"
#include "pb_encode.h"
#include "periph/Led.hpp"
#include "sys/time.h"
// TODO: add toggle
// #include "net/BluetoothCore.hpp"
#include "config.h"
#include "net/WifiCommunicator.hpp"

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

		if (manager->initCompleted) {
			manager->writePacket<NavigationPacket, MausOutgoingMessage_nav_tag>(
				manager->controller->getState());
		}
		vTaskDelay(sensorSendInterval);
	}
}

void receiverTask(void *pvParameter) {
	uint16_t msgLen = 0;
	NetController::Manager *manager = (NetController::Manager *)pvParameter;
	uint8_t *buffer = manager->decodeBuffer;
	MausIncomingMessage msg = MausIncomingMessage_init_default;
	MessageBufferHandle_t msgBuffer = manager->comInterface.getCmdReceiverMsgBuffer();
	ESP_LOGI(tag, "receiverTask started");

	while (true) {
		if (msgBuffer == NULL) {
			ESP_LOGD(tag, "not initialized");
			vTaskDelay(pdMS_TO_TICKS(20));
			continue;
		}
		msgLen = xMessageBufferReceive(msgBuffer, buffer, sizeof(buffer), 0);
		if (msgLen == 0) {
			// ESP_LOGI(tag, "queue empty");
			vTaskDelay(pdMS_TO_TICKS(20));
			continue;
		}
		// ESP_LOGI(tag, "persed incoming msg, bufLen=%d, msgLen=%d", sizeof(buffer), msgLen);

		pb_istream_t stream = pb_istream_from_buffer(buffer, msgLen);
		if (!pb_decode(&stream, MausIncomingMessage_fields, &msg)) {
			ESP_LOGE(tag, "failed to decode: %s", PB_GET_ERROR(&stream));
			continue;
		}

		ESP_LOGI(tag, "got msg ID=%d", msg.which_payload);

		switch (msg.which_payload) {
			case MausIncomingMessage_init_tag:
				ESP_LOGI(tag, "connected to connector v.%d", msg.payload.init.version);
				// TODO: improve memory management
				manager->writePacket<AckPacket, MausOutgoingMessage_ack_tag>(AckPacket_init_zero);
				manager->initCompleted = true;

				// set okay status LED
				LedController((gpio_num_t)3).set(1);

				break;
			case MausIncomingMessage_encoderCallibration_tag:
				// update values for both motors
				manager->controller->getMotor(MotorPosition::left)
					->updatePidConfig(msg.payload.encoderCallibration);
				manager->controller->getMotor(MotorPosition::right)
					->updatePidConfig(msg.payload.encoderCallibration);
				break;
			case MausIncomingMessage_control_tag:
				manager->controller->drive(msg.payload.control.speed,
										   msg.payload.control.direction);
				ESP_LOGI(tag,
						 "rcv ctrl cmd s=%d d=%f",
						 msg.payload.control.speed,
						 msg.payload.control.direction);
				break;
		}
	}
}
bool NetController::Manager::writeCmd(MausOutgoingMessage *msg) {
	MessageBufferHandle_t buffer = this->comInterface.getCmdSenderMsgBuffer();
	if (buffer == NULL) {
		ESP_LOGI(tag, "not initialized");
		return false;
	};

	// encode message in pb format
	pb_ostream_t stream = pb_ostream_from_buffer(this->encodeBuffer, sizeof(this->encodeBuffer));
	if (!pb_encode(&stream, MausOutgoingMessage_fields, msg)) {
		ESP_LOGE(tag, "failed to encode: %s", PB_GET_ERROR(&stream));
		return false;
	}

	// ESP_LOGI(tag, "sending message of size %d", stream.bytes_written);

	xMessageBufferSend(buffer, this->encodeBuffer, stream.bytes_written, 0);
	return true;
};

NetController::Manager::Manager(NetController::Communicator interface) {
	this->comInterface = interface;
	ESP_LOGI(tag, "Manager()");

	xTaskCreate(receiverTask, "receiverTask", 2048, this, 5, NULL);

	// TODO: move this somewhere else just here for testing
	xTaskCreate(&infoStreamerTask, "infoStreamerTask", 2048, this, 5, NULL);
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
	MausOutgoingMessage msg = MausOutgoingMessage_init_zero;
	msg.which_payload = msgTag;
	*reinterpret_cast<T *>(&msg.payload) = packet;
	// ESP_LOGI(tag, "x %f y %f", msg.payload.nav.position.x, msg.payload.nav.position.y);

	writeCmd(&msg);
};
