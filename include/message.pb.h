/* Automatically generated nanopb header */
/* Generated by nanopb-0.4.6-dev */

#ifndef PB_MESSAGE_PB_H_INCLUDED
#define PB_MESSAGE_PB_H_INCLUDED
#include <pb.h>

#if PB_PROTO_HEADER_VERSION != 40
#error Regenerate this file with the current version of nanopb generator.
#endif

/* Enum definitions */
typedef enum _InfoCmdType { 
    InfoCmdType_Noop = 0, 
    /* commands only intended for the go<->client communication */
    InfoCmdType_Connected = 100, 
    InfoCmdType_MausConnected = 101, 
    InfoCmdType_MausDisconnected = 102 
} InfoCmdType;

typedef enum _DriveCmdType { 
    DriveCmdType_Move = 0, 
    DriveCmdType_MoveCells = 1, 
    DriveCmdType_TurnAround = 2, 
    DriveCmdType_TurnLeft = 3, 
    DriveCmdType_TurnRight = 4, 
    DriveCmdType_TurnLeftOnSpot = 5, 
    DriveCmdType_TurnRightOnSpot = 6, 
    DriveCmdType_StartMazeNavigation = 7, 
    DriveCmdType_Stop = 8 
} DriveCmdType;

/* Struct definitions */
typedef struct _AckPacket { 
    char dummy_field;
} AckPacket;

typedef struct _MazeStatePacket { 
    pb_callback_t state; 
} MazeStatePacket;

typedef struct _MsgPing { 
    char dummy_field;
} MsgPing;

typedef struct _MsgStop { 
    char dummy_field;
} MsgStop;

typedef struct _PathPacket { 
    pb_callback_t cmd; 
} PathPacket;

typedef struct _PidTuningInfo { 
    pb_callback_t err; 
} PidTuningInfo;

typedef struct _PongPacket { 
    char dummy_field;
} PongPacket;

typedef struct _InfoPacket { 
    InfoCmdType cmd; 
} InfoPacket;

typedef struct _MsgControl { 
    float direction; 
    int32_t speed; 
} MsgControl;

typedef struct _MsgDrive { 
    DriveCmdType type; 
    float value; 
    float speed; 
} MsgDrive;

typedef struct _MsgEncoderCallibration { 
    float kP; 
    float kI; 
    float kD; 
    bool streamData; 
} MsgEncoderCallibration;

/* command indicates remote client connection */
typedef struct _MsgInit { 
    int32_t version; 
} MsgInit;

typedef struct _MsgSetPosition { 
    float x; 
    float y; 
    float heading; 
} MsgSetPosition;

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
        MsgEncoderCallibration encoderCallibration;
        MsgPing ping;
        MsgStop stop;
        MsgDrive drive;
        MsgSetPosition setPosition;
    } payload; 
} MausIncomingMessage;

typedef struct _NavigationPacket { 
    bool has_sensors;
    SensorPacket sensors; 
    bool has_position;
    Position position; 
    float leftMotorSpeed; 
    float rightMotorSpeed; 
    int32_t leftEncoderTotal; 
    int32_t rightEncoderTotal; 
    float voltage; 
    float batPercentage; 
    uint32_t timestamp; 
} NavigationPacket;

typedef struct _MausOutgoingMessage { 
    pb_size_t which_payload;
    union {
        AckPacket ack;
        NavigationPacket nav;
        PongPacket pong;
        InfoPacket info;
        PidTuningInfo pidTuning;
        MazeStatePacket mazeState;
    } payload; 
} MausOutgoingMessage;


/* Helper constants for enums */
#define _InfoCmdType_MIN InfoCmdType_Noop
#define _InfoCmdType_MAX InfoCmdType_MausDisconnected
#define _InfoCmdType_ARRAYSIZE ((InfoCmdType)(InfoCmdType_MausDisconnected+1))

#define _DriveCmdType_MIN DriveCmdType_Move
#define _DriveCmdType_MAX DriveCmdType_Stop
#define _DriveCmdType_ARRAYSIZE ((DriveCmdType)(DriveCmdType_Stop+1))


#ifdef __cplusplus
extern "C" {
#endif

/* Initializer values for message structs */
#define AckPacket_init_default                   {0}
#define Position_init_default                    {0, 0, 0}
#define PongPacket_init_default                  {0}
#define SensorPacket_init_default                {0, 0, 0}
#define NavigationPacket_init_default            {false, SensorPacket_init_default, false, Position_init_default, 0, 0, 0, 0, 0, 0, 0}
#define InfoPacket_init_default                  {_InfoCmdType_MIN}
#define PidTuningInfo_init_default               {{{NULL}, NULL}}
#define MazeStatePacket_init_default             {{{NULL}, NULL}}
#define PathPacket_init_default                  {{{NULL}, NULL}}
#define MausOutgoingMessage_init_default         {0, {AckPacket_init_default}}
#define MsgInit_init_default                     {0}
#define MsgPing_init_default                     {0}
#define MsgControl_init_default                  {0, 0}
#define MsgDrive_init_default                    {_DriveCmdType_MIN, 0, 0}
#define MsgSetPosition_init_default              {0, 0, 0}
#define MsgStop_init_default                     {0}
#define MsgEncoderCallibration_init_default      {0, 0, 0, 0}
#define MausIncomingMessage_init_default         {0, {MsgInit_init_default}}
#define AckPacket_init_zero                      {0}
#define Position_init_zero                       {0, 0, 0}
#define PongPacket_init_zero                     {0}
#define SensorPacket_init_zero                   {0, 0, 0}
#define NavigationPacket_init_zero               {false, SensorPacket_init_zero, false, Position_init_zero, 0, 0, 0, 0, 0, 0, 0}
#define InfoPacket_init_zero                     {_InfoCmdType_MIN}
#define PidTuningInfo_init_zero                  {{{NULL}, NULL}}
#define MazeStatePacket_init_zero                {{{NULL}, NULL}}
#define PathPacket_init_zero                     {{{NULL}, NULL}}
#define MausOutgoingMessage_init_zero            {0, {AckPacket_init_zero}}
#define MsgInit_init_zero                        {0}
#define MsgPing_init_zero                        {0}
#define MsgControl_init_zero                     {0, 0}
#define MsgDrive_init_zero                       {_DriveCmdType_MIN, 0, 0}
#define MsgSetPosition_init_zero                 {0, 0, 0}
#define MsgStop_init_zero                        {0}
#define MsgEncoderCallibration_init_zero         {0, 0, 0, 0}
#define MausIncomingMessage_init_zero            {0, {MsgInit_init_zero}}

/* Field tags (for use in manual encoding/decoding) */
#define MazeStatePacket_state_tag                1
#define PathPacket_cmd_tag                       1
#define PidTuningInfo_err_tag                    1
#define InfoPacket_cmd_tag                       1
#define MsgControl_direction_tag                 1
#define MsgControl_speed_tag                     2
#define MsgDrive_type_tag                        1
#define MsgDrive_value_tag                       2
#define MsgDrive_speed_tag                       3
#define MsgEncoderCallibration_kP_tag            1
#define MsgEncoderCallibration_kI_tag            2
#define MsgEncoderCallibration_kD_tag            3
#define MsgEncoderCallibration_streamData_tag    4
#define MsgInit_version_tag                      1
#define MsgSetPosition_x_tag                     1
#define MsgSetPosition_y_tag                     2
#define MsgSetPosition_heading_tag               3
#define Position_x_tag                           1
#define Position_y_tag                           2
#define Position_heading_tag                     3
#define SensorPacket_left_tag                    1
#define SensorPacket_front_tag                   2
#define SensorPacket_right_tag                   3
#define MausIncomingMessage_init_tag             2
#define MausIncomingMessage_control_tag          3
#define MausIncomingMessage_encoderCallibration_tag 4
#define MausIncomingMessage_ping_tag             5
#define MausIncomingMessage_stop_tag             6
#define MausIncomingMessage_drive_tag            7
#define MausIncomingMessage_setPosition_tag      8
#define NavigationPacket_sensors_tag             1
#define NavigationPacket_position_tag            2
#define NavigationPacket_leftMotorSpeed_tag      3
#define NavigationPacket_rightMotorSpeed_tag     4
#define NavigationPacket_leftEncoderTotal_tag    5
#define NavigationPacket_rightEncoderTotal_tag   6
#define NavigationPacket_voltage_tag             7
#define NavigationPacket_batPercentage_tag       8
#define NavigationPacket_timestamp_tag           9
#define MausOutgoingMessage_ack_tag              1
#define MausOutgoingMessage_nav_tag              2
#define MausOutgoingMessage_pong_tag             3
#define MausOutgoingMessage_info_tag             4
#define MausOutgoingMessage_pidTuning_tag        5
#define MausOutgoingMessage_mazeState_tag        6

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

#define PongPacket_FIELDLIST(X, a) \

#define PongPacket_CALLBACK NULL
#define PongPacket_DEFAULT NULL

#define SensorPacket_FIELDLIST(X, a) \
X(a, STATIC,   SINGULAR, FLOAT,    left,              1) \
X(a, STATIC,   SINGULAR, FLOAT,    front,             2) \
X(a, STATIC,   SINGULAR, FLOAT,    right,             3)
#define SensorPacket_CALLBACK NULL
#define SensorPacket_DEFAULT NULL

#define NavigationPacket_FIELDLIST(X, a) \
X(a, STATIC,   OPTIONAL, MESSAGE,  sensors,           1) \
X(a, STATIC,   OPTIONAL, MESSAGE,  position,          2) \
X(a, STATIC,   SINGULAR, FLOAT,    leftMotorSpeed,    3) \
X(a, STATIC,   SINGULAR, FLOAT,    rightMotorSpeed,   4) \
X(a, STATIC,   SINGULAR, INT32,    leftEncoderTotal,   5) \
X(a, STATIC,   SINGULAR, INT32,    rightEncoderTotal,   6) \
X(a, STATIC,   SINGULAR, FLOAT,    voltage,           7) \
X(a, STATIC,   SINGULAR, FLOAT,    batPercentage,     8) \
X(a, STATIC,   SINGULAR, UINT32,   timestamp,         9)
#define NavigationPacket_CALLBACK NULL
#define NavigationPacket_DEFAULT NULL
#define NavigationPacket_sensors_MSGTYPE SensorPacket
#define NavigationPacket_position_MSGTYPE Position

#define InfoPacket_FIELDLIST(X, a) \
X(a, STATIC,   SINGULAR, UENUM,    cmd,               1)
#define InfoPacket_CALLBACK NULL
#define InfoPacket_DEFAULT NULL

#define PidTuningInfo_FIELDLIST(X, a) \
X(a, CALLBACK, REPEATED, FLOAT,    err,               1)
#define PidTuningInfo_CALLBACK pb_default_field_callback
#define PidTuningInfo_DEFAULT NULL

#define MazeStatePacket_FIELDLIST(X, a) \
X(a, CALLBACK, SINGULAR, BYTES,    state,             1)
#define MazeStatePacket_CALLBACK pb_default_field_callback
#define MazeStatePacket_DEFAULT NULL

#define PathPacket_FIELDLIST(X, a) \
X(a, CALLBACK, REPEATED, MESSAGE,  cmd,               1)
#define PathPacket_CALLBACK pb_default_field_callback
#define PathPacket_DEFAULT NULL
#define PathPacket_cmd_MSGTYPE MsgDrive

#define MausOutgoingMessage_FIELDLIST(X, a) \
X(a, STATIC,   ONEOF,    MESSAGE,  (payload,ack,payload.ack),   1) \
X(a, STATIC,   ONEOF,    MESSAGE,  (payload,nav,payload.nav),   2) \
X(a, STATIC,   ONEOF,    MESSAGE,  (payload,pong,payload.pong),   3) \
X(a, STATIC,   ONEOF,    MESSAGE,  (payload,info,payload.info),   4) \
X(a, STATIC,   ONEOF,    MESSAGE,  (payload,pidTuning,payload.pidTuning),   5) \
X(a, STATIC,   ONEOF,    MESSAGE,  (payload,mazeState,payload.mazeState),   6)
#define MausOutgoingMessage_CALLBACK NULL
#define MausOutgoingMessage_DEFAULT NULL
#define MausOutgoingMessage_payload_ack_MSGTYPE AckPacket
#define MausOutgoingMessage_payload_nav_MSGTYPE NavigationPacket
#define MausOutgoingMessage_payload_pong_MSGTYPE PongPacket
#define MausOutgoingMessage_payload_info_MSGTYPE InfoPacket
#define MausOutgoingMessage_payload_pidTuning_MSGTYPE PidTuningInfo
#define MausOutgoingMessage_payload_mazeState_MSGTYPE MazeStatePacket

#define MsgInit_FIELDLIST(X, a) \
X(a, STATIC,   SINGULAR, INT32,    version,           1)
#define MsgInit_CALLBACK NULL
#define MsgInit_DEFAULT NULL

#define MsgPing_FIELDLIST(X, a) \

#define MsgPing_CALLBACK NULL
#define MsgPing_DEFAULT NULL

#define MsgControl_FIELDLIST(X, a) \
X(a, STATIC,   SINGULAR, FLOAT,    direction,         1) \
X(a, STATIC,   SINGULAR, INT32,    speed,             2)
#define MsgControl_CALLBACK NULL
#define MsgControl_DEFAULT NULL

#define MsgDrive_FIELDLIST(X, a) \
X(a, STATIC,   SINGULAR, UENUM,    type,              1) \
X(a, STATIC,   SINGULAR, FLOAT,    value,             2) \
X(a, STATIC,   SINGULAR, FLOAT,    speed,             3)
#define MsgDrive_CALLBACK NULL
#define MsgDrive_DEFAULT NULL

#define MsgSetPosition_FIELDLIST(X, a) \
X(a, STATIC,   SINGULAR, FLOAT,    x,                 1) \
X(a, STATIC,   SINGULAR, FLOAT,    y,                 2) \
X(a, STATIC,   SINGULAR, FLOAT,    heading,           3)
#define MsgSetPosition_CALLBACK NULL
#define MsgSetPosition_DEFAULT NULL

#define MsgStop_FIELDLIST(X, a) \

#define MsgStop_CALLBACK NULL
#define MsgStop_DEFAULT NULL

#define MsgEncoderCallibration_FIELDLIST(X, a) \
X(a, STATIC,   SINGULAR, FLOAT,    kP,                1) \
X(a, STATIC,   SINGULAR, FLOAT,    kI,                2) \
X(a, STATIC,   SINGULAR, FLOAT,    kD,                3) \
X(a, STATIC,   SINGULAR, BOOL,     streamData,        4)
#define MsgEncoderCallibration_CALLBACK NULL
#define MsgEncoderCallibration_DEFAULT NULL

#define MausIncomingMessage_FIELDLIST(X, a) \
X(a, STATIC,   ONEOF,    MESSAGE,  (payload,init,payload.init),   2) \
X(a, STATIC,   ONEOF,    MESSAGE,  (payload,control,payload.control),   3) \
X(a, STATIC,   ONEOF,    MESSAGE,  (payload,encoderCallibration,payload.encoderCallibration),   4) \
X(a, STATIC,   ONEOF,    MESSAGE,  (payload,ping,payload.ping),   5) \
X(a, STATIC,   ONEOF,    MESSAGE,  (payload,stop,payload.stop),   6) \
X(a, STATIC,   ONEOF,    MESSAGE,  (payload,drive,payload.drive),   7) \
X(a, STATIC,   ONEOF,    MESSAGE,  (payload,setPosition,payload.setPosition),   8)
#define MausIncomingMessage_CALLBACK NULL
#define MausIncomingMessage_DEFAULT NULL
#define MausIncomingMessage_payload_init_MSGTYPE MsgInit
#define MausIncomingMessage_payload_control_MSGTYPE MsgControl
#define MausIncomingMessage_payload_encoderCallibration_MSGTYPE MsgEncoderCallibration
#define MausIncomingMessage_payload_ping_MSGTYPE MsgPing
#define MausIncomingMessage_payload_stop_MSGTYPE MsgStop
#define MausIncomingMessage_payload_drive_MSGTYPE MsgDrive
#define MausIncomingMessage_payload_setPosition_MSGTYPE MsgSetPosition

extern const pb_msgdesc_t AckPacket_msg;
extern const pb_msgdesc_t Position_msg;
extern const pb_msgdesc_t PongPacket_msg;
extern const pb_msgdesc_t SensorPacket_msg;
extern const pb_msgdesc_t NavigationPacket_msg;
extern const pb_msgdesc_t InfoPacket_msg;
extern const pb_msgdesc_t PidTuningInfo_msg;
extern const pb_msgdesc_t MazeStatePacket_msg;
extern const pb_msgdesc_t PathPacket_msg;
extern const pb_msgdesc_t MausOutgoingMessage_msg;
extern const pb_msgdesc_t MsgInit_msg;
extern const pb_msgdesc_t MsgPing_msg;
extern const pb_msgdesc_t MsgControl_msg;
extern const pb_msgdesc_t MsgDrive_msg;
extern const pb_msgdesc_t MsgSetPosition_msg;
extern const pb_msgdesc_t MsgStop_msg;
extern const pb_msgdesc_t MsgEncoderCallibration_msg;
extern const pb_msgdesc_t MausIncomingMessage_msg;

/* Defines for backwards compatibility with code written before nanopb-0.4.0 */
#define AckPacket_fields &AckPacket_msg
#define Position_fields &Position_msg
#define PongPacket_fields &PongPacket_msg
#define SensorPacket_fields &SensorPacket_msg
#define NavigationPacket_fields &NavigationPacket_msg
#define InfoPacket_fields &InfoPacket_msg
#define PidTuningInfo_fields &PidTuningInfo_msg
#define MazeStatePacket_fields &MazeStatePacket_msg
#define PathPacket_fields &PathPacket_msg
#define MausOutgoingMessage_fields &MausOutgoingMessage_msg
#define MsgInit_fields &MsgInit_msg
#define MsgPing_fields &MsgPing_msg
#define MsgControl_fields &MsgControl_msg
#define MsgDrive_fields &MsgDrive_msg
#define MsgSetPosition_fields &MsgSetPosition_msg
#define MsgStop_fields &MsgStop_msg
#define MsgEncoderCallibration_fields &MsgEncoderCallibration_msg
#define MausIncomingMessage_fields &MausIncomingMessage_msg

/* Maximum encoded size of messages (where known) */
/* PidTuningInfo_size depends on runtime parameters */
/* MazeStatePacket_size depends on runtime parameters */
/* PathPacket_size depends on runtime parameters */
/* MausOutgoingMessage_size depends on runtime parameters */
#define AckPacket_size                           0
#define InfoPacket_size                          2
#define MausIncomingMessage_size                 19
#define MsgControl_size                          16
#define MsgDrive_size                            12
#define MsgEncoderCallibration_size              17
#define MsgInit_size                             11
#define MsgPing_size                             0
#define MsgSetPosition_size                      15
#define MsgStop_size                             0
#define NavigationPacket_size                    82
#define PongPacket_size                          0
#define Position_size                            15
#define SensorPacket_size                        15

#ifdef __cplusplus
} /* extern "C" */
#endif

#endif
