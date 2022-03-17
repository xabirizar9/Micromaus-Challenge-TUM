
#pragma once
#include <freertos/FreeRTOS.h>
#include <freertos/message_buffer.h>
#include <freertos/queue.h>

#include <string>

#include "message.pb.h"

namespace NetController {
class Communicator {
   public:
	MessageBufferHandle_t getCmdReceiverMsgBuffer() {
		return cmdReceiverMsgBuffer;
	};
	MessageBufferHandle_t getCmdSenderMsgBuffer() {
		return cmdSenderMsgBuffer;
	};

	// virtual ~Communicator() = 0;

   private:
	MessageBufferHandle_t cmdSenderMsgBuffer = xMessageBufferCreate(512);
	MessageBufferHandle_t cmdReceiverMsgBuffer = xMessageBufferCreate(512);
};

class Manager {
   private:
	uint8_t encodeBuffer[256];
	uint8_t decodeBuffer[256];
	bool writeCmd(MausOutgoingMessage *msg);

   public:
	Manager(Communicator interface);

	bool initCompleted;
	Communicator comInterface;

	template <typename T, int tag>
	void writePacket(T packet);
};

};	// namespace NetController
