/* Automatically generated nanopb header */
/* Generated by nanopb-0.4.6-dev */

#ifndef PB_PROTO_MESSAGE_PB_H_INCLUDED
#define PB_PROTO_MESSAGE_PB_H_INCLUDED
#include <pb.h>

#if PB_PROTO_HEADER_VERSION != 40
#error Regenerate this file with the current version of nanopb generator.
#endif

/* Struct definitions */
typedef struct _SensorPacket
{
    int32_t left;
    int32_t front;
    int32_t right;
} SensorPacket;

typedef struct _MausIncomingMessage
{
    bool has_packet;
    SensorPacket packet;
} MausIncomingMessage;

typedef struct _MausOutgoingMessage
{
    bool has_packet;
    SensorPacket packet;
} MausOutgoingMessage;

#ifdef __cplusplus
extern "C"
{
#endif

/* Initializer values for message structs */
#define SensorPacket_init_default \
    {                             \
        0, 0, 0                   \
    }
#define MausOutgoingMessage_init_default \
    {                                    \
        false, SensorPacket_init_default \
    }
#define MausIncomingMessage_init_default \
    {                                    \
        false, SensorPacket_init_default \
    }
#define SensorPacket_init_zero \
    {                          \
        0, 0, 0                \
    }
#define MausOutgoingMessage_init_zero \
    {                                 \
        false, SensorPacket_init_zero \
    }
#define MausIncomingMessage_init_zero \
    {                                 \
        false, SensorPacket_init_zero \
    }

/* Field tags (for use in manual encoding/decoding) */
#define SensorPacket_left_tag 1
#define SensorPacket_front_tag 2
#define SensorPacket_right_tag 3
#define MausIncomingMessage_packet_tag 1
#define MausOutgoingMessage_packet_tag 1

/* Struct field encoding specification for nanopb */
#define SensorPacket_FIELDLIST(X, a)        \
    X(a, STATIC, SINGULAR, INT32, left, 1)  \
    X(a, STATIC, SINGULAR, INT32, front, 2) \
    X(a, STATIC, SINGULAR, INT32, right, 3)
#define SensorPacket_CALLBACK NULL
#define SensorPacket_DEFAULT NULL

#define MausOutgoingMessage_FIELDLIST(X, a) \
    X(a, STATIC, OPTIONAL, MESSAGE, packet, 1)
#define MausOutgoingMessage_CALLBACK NULL
#define MausOutgoingMessage_DEFAULT NULL
#define MausOutgoingMessage_packet_MSGTYPE SensorPacket

#define MausIncomingMessage_FIELDLIST(X, a) \
    X(a, STATIC, OPTIONAL, MESSAGE, packet, 1)
#define MausIncomingMessage_CALLBACK NULL
#define MausIncomingMessage_DEFAULT NULL
#define MausIncomingMessage_packet_MSGTYPE SensorPacket

    extern const pb_msgdesc_t SensorPacket_msg;
    extern const pb_msgdesc_t MausOutgoingMessage_msg;
    extern const pb_msgdesc_t MausIncomingMessage_msg;

/* Defines for backwards compatibility with code written before nanopb-0.4.0 */
#define SensorPacket_fields &SensorPacket_msg
#define MausOutgoingMessage_fields &MausOutgoingMessage_msg
#define MausIncomingMessage_fields &MausIncomingMessage_msg

/* Maximum encoded size of messages (where known) */
#define MausIncomingMessage_size 35
#define MausOutgoingMessage_size 35
#define SensorPacket_size 33

#ifdef __cplusplus
} /* extern "C" */
#endif

#endif
