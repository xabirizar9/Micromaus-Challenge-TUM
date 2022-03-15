
#pragma once
#include <freertos/FreeRTOS.h>
#include <freertos/queue.h>
#include <string>
#include "message.pb.h"

namespace NetController
{
    class Communicator
    {

    private:
        QueueHandle_t cmdSenderQueue;
        MessageBufferHandle_t cmdReceiverMsgBuffer;

    public:
        MessageBufferHandle_t getCmdReceiverMsgBuffer()
        {
            return cmdReceiverMsgBuffer;
        };
        QueueHandle_t getCmdSenderQueue()
        {
            return cmdSenderQueue;
        };

        // virtual ~Communicator() = 0;
    };

    class Manager
    {
    private:
        bool writeCmd(MausOutgoingMessage *msg);

    public:
        Manager(Communicator *interface);

        bool initCompleted;
        Communicator *comInterface;

        template <typename T, int tag>
        void writePacket(T packet);
    };

};
