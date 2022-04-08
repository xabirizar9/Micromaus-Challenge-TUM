
#pragma once
#include <freertos/FreeRTOS.h>
#include <freertos/message_buffer.h>
#include <freertos/queue.h>

#include <string>

#include "Controller.hpp"
#include "message.pb.h"
#include "nav/MazeSolver.hpp"
#include "nav/RobotDriver.hpp"

#define SEND_BUFFER_SIZE 2048
#define RECV_BUFFER_SIZE 2048

namespace NetController {
class Communicator {
   public:
	MessageBufferHandle_t getCmdReceiverMsgBuffer() {
		return this->cmdReceiverMsgBuffer;
	};
	MessageBufferHandle_t getCmdSenderMsgBuffer() {
		return this->cmdSenderMsgBuffer;
	};

	// virtual ~Communicator() = 0;

   private:
	MessageBufferHandle_t cmdSenderMsgBuffer = xMessageBufferCreate(SEND_BUFFER_SIZE);
	MessageBufferHandle_t cmdReceiverMsgBuffer = xMessageBufferCreate(RECV_BUFFER_SIZE);
};

class Manager {
   private:
	bool writeCmd(MausOutgoingMessage* msg);

   public:
	static Manager& getInstance() {
		static Manager instance;
		return instance;
	}

	Manager();

	bool initCompleted = false;
	uint8_t encodeBuffer[SEND_BUFFER_SIZE];
	uint8_t decodeBuffer[RECV_BUFFER_SIZE];
	Communicator comInterface;
	Controller* controller;
	RobotDriver* driver;

	template <typename T, int tag>
	void writePacket(T packet);

	void writeMazeState(MazeStatePacket state);
	void writeCmdState(MausCommandStatus state);
};

extern Manager* netManager;
};	// namespace NetController
