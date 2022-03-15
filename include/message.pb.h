/* Automatically generated nanopb header */
/* Generated by nanopb-0.4.6-dev */

#ifndef PB_MESSAGE_PB_H_INCLUDED
#define PB_MESSAGE_PB_H_INCLUDED
#include <pb.h>

#if PB_PROTO_HEADER_VERSION != 40
#error Regenerate this file with the current version of nanopb generator.
#endif

/* Enum definitions */
typedef enum _MsgType { 
    MsgType_Init = 0, 
    MsgType_SensorData = 1, 
    MsgType_Control = 2 
} MsgType;

/* Struct definitions */
typedef struct _AckPacket { 
    char dummy_field;
} AckPacket;

typedef struct _MsgControl { 
    int32_t direction; 
    int32_t speed; 
} MsgControl;

/* command indicates remote client connection */
typedef struct _MsgInit { 
    int32_t version; 
} MsgInit;

typedef struct _Position { 
    float x; 
    float y; 
    float heading; 
} Position;

typedef struct _SensorPacket { 
    float left; 
    float front; 
    float right; 
} SensorPacket;

typedef struct _MausIncomingMessage { 
    pb_size_t which_payload;
    union {
        MsgInit init;
        MsgControl control;
    } payload; 
} MausIncomingMessage;

typedef struct _NavigationPacket { 
    bool has_sensors;
    SensorPacket sensors; 
    bool has_position;
    Position position; 
} NavigationPacket;

typedef struct _MausOutgoingMessage { 
    pb_size_t which_payload;
    union {
        AckPacket ack;
        NavigationPacket nav;
    } payload; 
} MausOutgoingMessage;


/* Helper constants for enums */
#define _MsgType_MIN MsgType_Init
#define _MsgType_MAX MsgType_Control
#define _MsgType_ARRAYSIZE ((MsgType)(MsgType_Control+1))


#ifdef __cplusplus
extern "C" {
#endif

/* Initializer values for message structs */
#define AckPacket_init_default                   {0}
#define Position_init_default                    {0, 0, 0}
#define SensorPacket_init_default                {0, 0, 0}
#define NavigationPacket_init_default            {false, SensorPacket_init_default, false, Position_init_default}
#define MausOutgoingMessage_init_default         {0, {AckPacket_init_default}}
#define MsgInit_init_default                     {0}
#define MsgControl_init_default                  {0, 0}
#define MausIncomingMessage_init_default         {0, {MsgInit_init_default}}
#define AckPacket_init_zero                      {0}
#define Position_init_zero                       {0, 0, 0}
#define SensorPacket_init_zero                   {0, 0, 0}
#define NavigationPacket_init_zero               {false, SensorPacket_init_zero, false, Position_init_zero}
#define MausOutgoingMessage_init_zero            {0, {AckPacket_init_zero}}
#define MsgInit_init_zero                        {0}
#define MsgControl_init_zero                     {0, 0}
#define MausIncomingMessage_init_zero            {0, {MsgInit_init_zero}}

/* Field tags (for use in manual encoding/decoding) */
#define MsgControl_direction_tag                 1
#define MsgControl_speed_tag                     2
#define MsgInit_version_tag                      1
#define Position_x_tag                           1
#define Position_y_tag                           2
#define Position_heading_tag                     3
#define SensorPacket_left_tag                    1
#define SensorPacket_front_tag                   2
#define SensorPacket_right_tag                   3
#define MausIncomingMessage_init_tag             2
#define MausIncomingMessage_control_tag          3
#define NavigationPacket_sensors_tag             1
#define NavigationPacket_position_tag            2
#define MausOutgoingMessage_ack_tag              1
#define MausOutgoingMessage_nav_tag              2

/* Struct field encoding specification for nanopb */
#define AckPacket_FIELDLIST(X, a) \

#define AckPacket_CALLBACK NULL
#define AckPacket_DEFAULT NULL

#define Position_FIELDLIST(X, a) \
X(a, STATIC,   SINGULAR, FLOAT,    x,                 1) \
X(a, STATIC,   SINGULAR, FLOAT,    y,                 2) \
X(a, STATIC,   SINGULAR, FLOAT,    heading,           3)
#define Position_CALLBACK NULL
#define Position_DEFAULT NULL

#define SensorPacket_FIELDLIST(X, a) \
X(a, STATIC,   SINGULAR, FLOAT,    left,              1) \
X(a, STATIC,   SINGULAR, FLOAT,    front,             2) \
X(a, STATIC,   SINGULAR, FLOAT,    right,             3)
#define SensorPacket_CALLBACK NULL
#define SensorPacket_DEFAULT NULL

#define NavigationPacket_FIELDLIST(X, a) \
X(a, STATIC,   OPTIONAL, MESSAGE,  sensors,           1) \
X(a, STATIC,   OPTIONAL, MESSAGE,  position,          2)
#define NavigationPacket_CALLBACK NULL
#define NavigationPacket_DEFAULT NULL
#define NavigationPacket_sensors_MSGTYPE SensorPacket
#define NavigationPacket_position_MSGTYPE Position

#define MausOutgoingMessage_FIELDLIST(X, a) \
X(a, STATIC,   ONEOF,    MESSAGE,  (payload,ack,payload.ack),   1) \
X(a, STATIC,   ONEOF,    MESSAGE,  (payload,nav,payload.nav),   2)
#define MausOutgoingMessage_CALLBACK NULL
#define MausOutgoingMessage_DEFAULT NULL
#define MausOutgoingMessage_payload_ack_MSGTYPE AckPacket
#define MausOutgoingMessage_payload_nav_MSGTYPE NavigationPacket

#define MsgInit_FIELDLIST(X, a) \
X(a, STATIC,   SINGULAR, INT32,    version,           1)
#define MsgInit_CALLBACK NULL
#define MsgInit_DEFAULT NULL

#define MsgControl_FIELDLIST(X, a) \
X(a, STATIC,   SINGULAR, INT32,    direction,         1) \
X(a, STATIC,   SINGULAR, INT32,    speed,             2)
#define MsgControl_CALLBACK NULL
#define MsgControl_DEFAULT NULL

#define MausIncomingMessage_FIELDLIST(X, a) \
X(a, STATIC,   ONEOF,    MESSAGE,  (payload,init,payload.init),   2) \
X(a, STATIC,   ONEOF,    MESSAGE,  (payload,control,payload.control),   3)
#define MausIncomingMessage_CALLBACK NULL
#define MausIncomingMessage_DEFAULT NULL
#define MausIncomingMessage_payload_init_MSGTYPE MsgInit
#define MausIncomingMessage_payload_control_MSGTYPE MsgControl

extern const pb_msgdesc_t AckPacket_msg;
extern const pb_msgdesc_t Position_msg;
extern const pb_msgdesc_t SensorPacket_msg;
extern const pb_msgdesc_t NavigationPacket_msg;
extern const pb_msgdesc_t MausOutgoingMessage_msg;
extern const pb_msgdesc_t MsgInit_msg;
extern const pb_msgdesc_t MsgControl_msg;
extern const pb_msgdesc_t MausIncomingMessage_msg;

/* Defines for backwards compatibility with code written before nanopb-0.4.0 */
#define AckPacket_fields &AckPacket_msg
#define Position_fields &Position_msg
#define SensorPacket_fields &SensorPacket_msg
#define NavigationPacket_fields &NavigationPacket_msg
#define MausOutgoingMessage_fields &MausOutgoingMessage_msg
#define MsgInit_fields &MsgInit_msg
#define MsgControl_fields &MsgControl_msg
#define MausIncomingMessage_fields &MausIncomingMessage_msg

/* Maximum encoded size of messages (where known) */
#define AckPacket_size                           0
#define MausIncomingMessage_size                 24
#define MausOutgoingMessage_size                 36
#define MsgControl_size                          22
#define MsgInit_size                             11
#define NavigationPacket_size                    34
#define Position_size                            15
#define SensorPacket_size                        15

#ifdef __cplusplus
} /* extern "C" */
#endif

#endif