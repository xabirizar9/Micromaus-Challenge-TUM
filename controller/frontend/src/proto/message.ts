/* eslint-disable */
import * as Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export enum MotorPosition {
  left = 0,
  right = 1,
  UNRECOGNIZED = -1,
}

export function motorPositionFromJSON(object: any): MotorPosition {
  switch (object) {
    case 0:
    case "left":
      return MotorPosition.left;
    case 1:
    case "right":
      return MotorPosition.right;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MotorPosition.UNRECOGNIZED;
  }
}

export function motorPositionToJSON(object: MotorPosition): string {
  switch (object) {
    case MotorPosition.left:
      return "left";
    case MotorPosition.right:
      return "right";
    default:
      return "UNKNOWN";
  }
}

export enum InfoCmdType {
  Noop = 0,
  /** Connected - commands only intended for the go<->client communication */
  Connected = 100,
  MausConnected = 101,
  MausDisconnected = 102,
  UNRECOGNIZED = -1,
}

export function infoCmdTypeFromJSON(object: any): InfoCmdType {
  switch (object) {
    case 0:
    case "Noop":
      return InfoCmdType.Noop;
    case 100:
    case "Connected":
      return InfoCmdType.Connected;
    case 101:
    case "MausConnected":
      return InfoCmdType.MausConnected;
    case 102:
    case "MausDisconnected":
      return InfoCmdType.MausDisconnected;
    case -1:
    case "UNRECOGNIZED":
    default:
      return InfoCmdType.UNRECOGNIZED;
  }
}

export function infoCmdTypeToJSON(object: InfoCmdType): string {
  switch (object) {
    case InfoCmdType.Noop:
      return "Noop";
    case InfoCmdType.Connected:
      return "Connected";
    case InfoCmdType.MausConnected:
      return "MausConnected";
    case InfoCmdType.MausDisconnected:
      return "MausDisconnected";
    default:
      return "UNKNOWN";
  }
}

export enum DriveCmdType {
  Move = 0,
  MoveCells = 1,
  TurnAround = 2,
  TurnLeft = 3,
  TurnRight = 4,
  TurnLeftOnSpot = 5,
  TurnRightOnSpot = 6,
  StartMazeNavigation = 7,
  Stop = 8,
  UNRECOGNIZED = -1,
}

export function driveCmdTypeFromJSON(object: any): DriveCmdType {
  switch (object) {
    case 0:
    case "Move":
      return DriveCmdType.Move;
    case 1:
    case "MoveCells":
      return DriveCmdType.MoveCells;
    case 2:
    case "TurnAround":
      return DriveCmdType.TurnAround;
    case 3:
    case "TurnLeft":
      return DriveCmdType.TurnLeft;
    case 4:
    case "TurnRight":
      return DriveCmdType.TurnRight;
    case 5:
    case "TurnLeftOnSpot":
      return DriveCmdType.TurnLeftOnSpot;
    case 6:
    case "TurnRightOnSpot":
      return DriveCmdType.TurnRightOnSpot;
    case 7:
    case "StartMazeNavigation":
      return DriveCmdType.StartMazeNavigation;
    case 8:
    case "Stop":
      return DriveCmdType.Stop;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DriveCmdType.UNRECOGNIZED;
  }
}

export function driveCmdTypeToJSON(object: DriveCmdType): string {
  switch (object) {
    case DriveCmdType.Move:
      return "Move";
    case DriveCmdType.MoveCells:
      return "MoveCells";
    case DriveCmdType.TurnAround:
      return "TurnAround";
    case DriveCmdType.TurnLeft:
      return "TurnLeft";
    case DriveCmdType.TurnRight:
      return "TurnRight";
    case DriveCmdType.TurnLeftOnSpot:
      return "TurnLeftOnSpot";
    case DriveCmdType.TurnRightOnSpot:
      return "TurnRightOnSpot";
    case DriveCmdType.StartMazeNavigation:
      return "StartMazeNavigation";
    case DriveCmdType.Stop:
      return "Stop";
    default:
      return "UNKNOWN";
  }
}

export enum SolveCmdType {
  Explore = 0,
  GoHome = 1,
  FastRun = 2,
  UNRECOGNIZED = -1,
}

export function solveCmdTypeFromJSON(object: any): SolveCmdType {
  switch (object) {
    case 0:
    case "Explore":
      return SolveCmdType.Explore;
    case 1:
    case "GoHome":
      return SolveCmdType.GoHome;
    case 2:
    case "FastRun":
      return SolveCmdType.FastRun;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SolveCmdType.UNRECOGNIZED;
  }
}

export function solveCmdTypeToJSON(object: SolveCmdType): string {
  switch (object) {
    case SolveCmdType.Explore:
      return "Explore";
    case SolveCmdType.GoHome:
      return "GoHome";
    case SolveCmdType.FastRun:
      return "FastRun";
    default:
      return "UNKNOWN";
  }
}

export interface AckPacket {}

export interface Position {
  x: number;
  y: number;
  heading: number;
}

export interface MsgMotorCalibration {
  motor: MotorPosition;
  config: MsgEncoderCalibration | undefined;
}

export interface MsgEncoderCalibration {
  kP: number;
  kI: number;
  kD: number;
  streamData: boolean;
}

export interface PongPacket {}

export interface SensorPacket {
  left: number;
  front: number;
  right: number;
}

export interface PosDistribution {
  positionMean: number[];
  velocityMean: number[];
  positionStd: number[];
  velocityStd: number[];
}

export interface NavigationPacket {
  sensors: SensorPacket | undefined;
  position: Position | undefined;
  leftMotorSpeed: number;
  rightMotorSpeed: number;
  leftEncoderTotal: number;
  rightEncoderTotal: number;
  voltage: number;
  batPercentage: number;
  timestamp: number;
  posDistribution: PosDistribution | undefined;
}

export interface InfoPacket {
  cmd: InfoCmdType;
}

export interface PidTuningInfo {
  err: number[];
}

export interface MazeStatePacket {
  state: Uint8Array;
  walls: Uint8Array;
  position: Position | undefined;
  target: Position | undefined;
}

export interface MausConfigPacket {
  leftMotorPid: MsgEncoderCalibration | undefined;
  rightMotorPid: MsgEncoderCalibration | undefined;
  lanePid: MsgEncoderCalibration | undefined;
}

export interface MausCommandStatus {
  cmd: DriveCmdType;
  success: boolean;
  target: number;
  actual: number;
}

export interface MausOutgoingMessage {
  ack: AckPacket | undefined;
  nav: NavigationPacket | undefined;
  pong: PongPacket | undefined;
  info: InfoPacket | undefined;
  pidTuning: PidTuningInfo | undefined;
  mazeState: MazeStatePacket | undefined;
  mausConfig: MausConfigPacket | undefined;
  mausCommandStatus: MausCommandStatus | undefined;
}

/** command indicates remote client connection */
export interface MsgInit {
  version: number;
}

export interface MsgPing {}

export interface MsgControl {
  direction: number;
  speed: number;
}

export interface MsgDrive {
  type: DriveCmdType;
  value: number;
  speed: number;
}

export interface MsgSolve {
  type: SolveCmdType;
  speed: number;
}

export interface MsgSetPosition {
  x: number;
  y: number;
  heading: number;
}

export interface MsgStop {}

export interface MausIncomingMessage {
  init: MsgInit | undefined;
  control: MsgControl | undefined;
  motorCalibration: MsgMotorCalibration | undefined;
  ping: MsgPing | undefined;
  stop: MsgStop | undefined;
  drive: MsgDrive | undefined;
  setPosition: MsgSetPosition | undefined;
  solve: MsgSolve | undefined;
  laneCalibration: MsgEncoderCalibration | undefined;
}

function createBaseAckPacket(): AckPacket {
  return {};
}

export const AckPacket = {
  encode(_: AckPacket, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AckPacket {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAckPacket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): AckPacket {
    return {};
  },

  toJSON(_: AckPacket): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AckPacket>, I>>(_: I): AckPacket {
    const message = createBaseAckPacket();
    return message;
  },
};

function createBasePosition(): Position {
  return { x: 0, y: 0, heading: 0 };
}

export const Position = {
  encode(
    message: Position,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.x !== 0) {
      writer.uint32(13).float(message.x);
    }
    if (message.y !== 0) {
      writer.uint32(21).float(message.y);
    }
    if (message.heading !== 0) {
      writer.uint32(29).float(message.heading);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Position {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePosition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.x = reader.float();
          break;
        case 2:
          message.y = reader.float();
          break;
        case 3:
          message.heading = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Position {
    return {
      x: isSet(object.x) ? Number(object.x) : 0,
      y: isSet(object.y) ? Number(object.y) : 0,
      heading: isSet(object.heading) ? Number(object.heading) : 0,
    };
  },

  toJSON(message: Position): unknown {
    const obj: any = {};
    message.x !== undefined && (obj.x = message.x);
    message.y !== undefined && (obj.y = message.y);
    message.heading !== undefined && (obj.heading = message.heading);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Position>, I>>(object: I): Position {
    const message = createBasePosition();
    message.x = object.x ?? 0;
    message.y = object.y ?? 0;
    message.heading = object.heading ?? 0;
    return message;
  },
};

function createBaseMsgMotorCalibration(): MsgMotorCalibration {
  return { motor: 0, config: undefined };
}

export const MsgMotorCalibration = {
  encode(
    message: MsgMotorCalibration,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.motor !== 0) {
      writer.uint32(8).int32(message.motor);
    }
    if (message.config !== undefined) {
      MsgEncoderCalibration.encode(
        message.config,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgMotorCalibration {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMotorCalibration();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.motor = reader.int32() as any;
          break;
        case 2:
          message.config = MsgEncoderCalibration.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgMotorCalibration {
    return {
      motor: isSet(object.motor) ? motorPositionFromJSON(object.motor) : 0,
      config: isSet(object.config)
        ? MsgEncoderCalibration.fromJSON(object.config)
        : undefined,
    };
  },

  toJSON(message: MsgMotorCalibration): unknown {
    const obj: any = {};
    message.motor !== undefined &&
      (obj.motor = motorPositionToJSON(message.motor));
    message.config !== undefined &&
      (obj.config = message.config
        ? MsgEncoderCalibration.toJSON(message.config)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgMotorCalibration>, I>>(
    object: I
  ): MsgMotorCalibration {
    const message = createBaseMsgMotorCalibration();
    message.motor = object.motor ?? 0;
    message.config =
      object.config !== undefined && object.config !== null
        ? MsgEncoderCalibration.fromPartial(object.config)
        : undefined;
    return message;
  },
};

function createBaseMsgEncoderCalibration(): MsgEncoderCalibration {
  return { kP: 0, kI: 0, kD: 0, streamData: false };
}

export const MsgEncoderCalibration = {
  encode(
    message: MsgEncoderCalibration,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.kP !== 0) {
      writer.uint32(13).float(message.kP);
    }
    if (message.kI !== 0) {
      writer.uint32(21).float(message.kI);
    }
    if (message.kD !== 0) {
      writer.uint32(29).float(message.kD);
    }
    if (message.streamData === true) {
      writer.uint32(32).bool(message.streamData);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgEncoderCalibration {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgEncoderCalibration();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.kP = reader.float();
          break;
        case 2:
          message.kI = reader.float();
          break;
        case 3:
          message.kD = reader.float();
          break;
        case 4:
          message.streamData = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgEncoderCalibration {
    return {
      kP: isSet(object.kP) ? Number(object.kP) : 0,
      kI: isSet(object.kI) ? Number(object.kI) : 0,
      kD: isSet(object.kD) ? Number(object.kD) : 0,
      streamData: isSet(object.streamData) ? Boolean(object.streamData) : false,
    };
  },

  toJSON(message: MsgEncoderCalibration): unknown {
    const obj: any = {};
    message.kP !== undefined && (obj.kP = message.kP);
    message.kI !== undefined && (obj.kI = message.kI);
    message.kD !== undefined && (obj.kD = message.kD);
    message.streamData !== undefined && (obj.streamData = message.streamData);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgEncoderCalibration>, I>>(
    object: I
  ): MsgEncoderCalibration {
    const message = createBaseMsgEncoderCalibration();
    message.kP = object.kP ?? 0;
    message.kI = object.kI ?? 0;
    message.kD = object.kD ?? 0;
    message.streamData = object.streamData ?? false;
    return message;
  },
};

function createBasePongPacket(): PongPacket {
  return {};
}

export const PongPacket = {
  encode(_: PongPacket, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PongPacket {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePongPacket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): PongPacket {
    return {};
  },

  toJSON(_: PongPacket): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PongPacket>, I>>(_: I): PongPacket {
    const message = createBasePongPacket();
    return message;
  },
};

function createBaseSensorPacket(): SensorPacket {
  return { left: 0, front: 0, right: 0 };
}

export const SensorPacket = {
  encode(
    message: SensorPacket,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.left !== 0) {
      writer.uint32(13).float(message.left);
    }
    if (message.front !== 0) {
      writer.uint32(21).float(message.front);
    }
    if (message.right !== 0) {
      writer.uint32(29).float(message.right);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SensorPacket {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSensorPacket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.left = reader.float();
          break;
        case 2:
          message.front = reader.float();
          break;
        case 3:
          message.right = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SensorPacket {
    return {
      left: isSet(object.left) ? Number(object.left) : 0,
      front: isSet(object.front) ? Number(object.front) : 0,
      right: isSet(object.right) ? Number(object.right) : 0,
    };
  },

  toJSON(message: SensorPacket): unknown {
    const obj: any = {};
    message.left !== undefined && (obj.left = message.left);
    message.front !== undefined && (obj.front = message.front);
    message.right !== undefined && (obj.right = message.right);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SensorPacket>, I>>(
    object: I
  ): SensorPacket {
    const message = createBaseSensorPacket();
    message.left = object.left ?? 0;
    message.front = object.front ?? 0;
    message.right = object.right ?? 0;
    return message;
  },
};

function createBasePosDistribution(): PosDistribution {
  return {
    positionMean: [],
    velocityMean: [],
    positionStd: [],
    velocityStd: [],
  };
}

export const PosDistribution = {
  encode(
    message: PosDistribution,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.positionMean) {
      writer.float(v);
    }
    writer.ldelim();
    writer.uint32(18).fork();
    for (const v of message.velocityMean) {
      writer.float(v);
    }
    writer.ldelim();
    writer.uint32(26).fork();
    for (const v of message.positionStd) {
      writer.float(v);
    }
    writer.ldelim();
    writer.uint32(34).fork();
    for (const v of message.velocityStd) {
      writer.float(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PosDistribution {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePosDistribution();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.positionMean.push(reader.float());
            }
          } else {
            message.positionMean.push(reader.float());
          }
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.velocityMean.push(reader.float());
            }
          } else {
            message.velocityMean.push(reader.float());
          }
          break;
        case 3:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.positionStd.push(reader.float());
            }
          } else {
            message.positionStd.push(reader.float());
          }
          break;
        case 4:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.velocityStd.push(reader.float());
            }
          } else {
            message.velocityStd.push(reader.float());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PosDistribution {
    return {
      positionMean: Array.isArray(object?.positionMean)
        ? object.positionMean.map((e: any) => Number(e))
        : [],
      velocityMean: Array.isArray(object?.velocityMean)
        ? object.velocityMean.map((e: any) => Number(e))
        : [],
      positionStd: Array.isArray(object?.positionStd)
        ? object.positionStd.map((e: any) => Number(e))
        : [],
      velocityStd: Array.isArray(object?.velocityStd)
        ? object.velocityStd.map((e: any) => Number(e))
        : [],
    };
  },

  toJSON(message: PosDistribution): unknown {
    const obj: any = {};
    if (message.positionMean) {
      obj.positionMean = message.positionMean.map((e) => e);
    } else {
      obj.positionMean = [];
    }
    if (message.velocityMean) {
      obj.velocityMean = message.velocityMean.map((e) => e);
    } else {
      obj.velocityMean = [];
    }
    if (message.positionStd) {
      obj.positionStd = message.positionStd.map((e) => e);
    } else {
      obj.positionStd = [];
    }
    if (message.velocityStd) {
      obj.velocityStd = message.velocityStd.map((e) => e);
    } else {
      obj.velocityStd = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PosDistribution>, I>>(
    object: I
  ): PosDistribution {
    const message = createBasePosDistribution();
    message.positionMean = object.positionMean?.map((e) => e) || [];
    message.velocityMean = object.velocityMean?.map((e) => e) || [];
    message.positionStd = object.positionStd?.map((e) => e) || [];
    message.velocityStd = object.velocityStd?.map((e) => e) || [];
    return message;
  },
};

function createBaseNavigationPacket(): NavigationPacket {
  return {
    sensors: undefined,
    position: undefined,
    leftMotorSpeed: 0,
    rightMotorSpeed: 0,
    leftEncoderTotal: 0,
    rightEncoderTotal: 0,
    voltage: 0,
    batPercentage: 0,
    timestamp: 0,
    posDistribution: undefined,
  };
}

export const NavigationPacket = {
  encode(
    message: NavigationPacket,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sensors !== undefined) {
      SensorPacket.encode(message.sensors, writer.uint32(10).fork()).ldelim();
    }
    if (message.position !== undefined) {
      Position.encode(message.position, writer.uint32(18).fork()).ldelim();
    }
    if (message.leftMotorSpeed !== 0) {
      writer.uint32(29).float(message.leftMotorSpeed);
    }
    if (message.rightMotorSpeed !== 0) {
      writer.uint32(37).float(message.rightMotorSpeed);
    }
    if (message.leftEncoderTotal !== 0) {
      writer.uint32(40).int32(message.leftEncoderTotal);
    }
    if (message.rightEncoderTotal !== 0) {
      writer.uint32(48).int32(message.rightEncoderTotal);
    }
    if (message.voltage !== 0) {
      writer.uint32(61).float(message.voltage);
    }
    if (message.batPercentage !== 0) {
      writer.uint32(69).float(message.batPercentage);
    }
    if (message.timestamp !== 0) {
      writer.uint32(72).uint32(message.timestamp);
    }
    if (message.posDistribution !== undefined) {
      PosDistribution.encode(
        message.posDistribution,
        writer.uint32(82).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NavigationPacket {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNavigationPacket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sensors = SensorPacket.decode(reader, reader.uint32());
          break;
        case 2:
          message.position = Position.decode(reader, reader.uint32());
          break;
        case 3:
          message.leftMotorSpeed = reader.float();
          break;
        case 4:
          message.rightMotorSpeed = reader.float();
          break;
        case 5:
          message.leftEncoderTotal = reader.int32();
          break;
        case 6:
          message.rightEncoderTotal = reader.int32();
          break;
        case 7:
          message.voltage = reader.float();
          break;
        case 8:
          message.batPercentage = reader.float();
          break;
        case 9:
          message.timestamp = reader.uint32();
          break;
        case 10:
          message.posDistribution = PosDistribution.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NavigationPacket {
    return {
      sensors: isSet(object.sensors)
        ? SensorPacket.fromJSON(object.sensors)
        : undefined,
      position: isSet(object.position)
        ? Position.fromJSON(object.position)
        : undefined,
      leftMotorSpeed: isSet(object.leftMotorSpeed)
        ? Number(object.leftMotorSpeed)
        : 0,
      rightMotorSpeed: isSet(object.rightMotorSpeed)
        ? Number(object.rightMotorSpeed)
        : 0,
      leftEncoderTotal: isSet(object.leftEncoderTotal)
        ? Number(object.leftEncoderTotal)
        : 0,
      rightEncoderTotal: isSet(object.rightEncoderTotal)
        ? Number(object.rightEncoderTotal)
        : 0,
      voltage: isSet(object.voltage) ? Number(object.voltage) : 0,
      batPercentage: isSet(object.batPercentage)
        ? Number(object.batPercentage)
        : 0,
      timestamp: isSet(object.timestamp) ? Number(object.timestamp) : 0,
      posDistribution: isSet(object.posDistribution)
        ? PosDistribution.fromJSON(object.posDistribution)
        : undefined,
    };
  },

  toJSON(message: NavigationPacket): unknown {
    const obj: any = {};
    message.sensors !== undefined &&
      (obj.sensors = message.sensors
        ? SensorPacket.toJSON(message.sensors)
        : undefined);
    message.position !== undefined &&
      (obj.position = message.position
        ? Position.toJSON(message.position)
        : undefined);
    message.leftMotorSpeed !== undefined &&
      (obj.leftMotorSpeed = message.leftMotorSpeed);
    message.rightMotorSpeed !== undefined &&
      (obj.rightMotorSpeed = message.rightMotorSpeed);
    message.leftEncoderTotal !== undefined &&
      (obj.leftEncoderTotal = Math.round(message.leftEncoderTotal));
    message.rightEncoderTotal !== undefined &&
      (obj.rightEncoderTotal = Math.round(message.rightEncoderTotal));
    message.voltage !== undefined && (obj.voltage = message.voltage);
    message.batPercentage !== undefined &&
      (obj.batPercentage = message.batPercentage);
    message.timestamp !== undefined &&
      (obj.timestamp = Math.round(message.timestamp));
    message.posDistribution !== undefined &&
      (obj.posDistribution = message.posDistribution
        ? PosDistribution.toJSON(message.posDistribution)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NavigationPacket>, I>>(
    object: I
  ): NavigationPacket {
    const message = createBaseNavigationPacket();
    message.sensors =
      object.sensors !== undefined && object.sensors !== null
        ? SensorPacket.fromPartial(object.sensors)
        : undefined;
    message.position =
      object.position !== undefined && object.position !== null
        ? Position.fromPartial(object.position)
        : undefined;
    message.leftMotorSpeed = object.leftMotorSpeed ?? 0;
    message.rightMotorSpeed = object.rightMotorSpeed ?? 0;
    message.leftEncoderTotal = object.leftEncoderTotal ?? 0;
    message.rightEncoderTotal = object.rightEncoderTotal ?? 0;
    message.voltage = object.voltage ?? 0;
    message.batPercentage = object.batPercentage ?? 0;
    message.timestamp = object.timestamp ?? 0;
    message.posDistribution =
      object.posDistribution !== undefined && object.posDistribution !== null
        ? PosDistribution.fromPartial(object.posDistribution)
        : undefined;
    return message;
  },
};

function createBaseInfoPacket(): InfoPacket {
  return { cmd: 0 };
}

export const InfoPacket = {
  encode(
    message: InfoPacket,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.cmd !== 0) {
      writer.uint32(8).int32(message.cmd);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InfoPacket {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInfoPacket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cmd = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InfoPacket {
    return {
      cmd: isSet(object.cmd) ? infoCmdTypeFromJSON(object.cmd) : 0,
    };
  },

  toJSON(message: InfoPacket): unknown {
    const obj: any = {};
    message.cmd !== undefined && (obj.cmd = infoCmdTypeToJSON(message.cmd));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<InfoPacket>, I>>(
    object: I
  ): InfoPacket {
    const message = createBaseInfoPacket();
    message.cmd = object.cmd ?? 0;
    return message;
  },
};

function createBasePidTuningInfo(): PidTuningInfo {
  return { err: [] };
}

export const PidTuningInfo = {
  encode(
    message: PidTuningInfo,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.err) {
      writer.float(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PidTuningInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePidTuningInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.err.push(reader.float());
            }
          } else {
            message.err.push(reader.float());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PidTuningInfo {
    return {
      err: Array.isArray(object?.err)
        ? object.err.map((e: any) => Number(e))
        : [],
    };
  },

  toJSON(message: PidTuningInfo): unknown {
    const obj: any = {};
    if (message.err) {
      obj.err = message.err.map((e) => e);
    } else {
      obj.err = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PidTuningInfo>, I>>(
    object: I
  ): PidTuningInfo {
    const message = createBasePidTuningInfo();
    message.err = object.err?.map((e) => e) || [];
    return message;
  },
};

function createBaseMazeStatePacket(): MazeStatePacket {
  return {
    state: new Uint8Array(),
    walls: new Uint8Array(),
    position: undefined,
    target: undefined,
  };
}

export const MazeStatePacket = {
  encode(
    message: MazeStatePacket,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.state.length !== 0) {
      writer.uint32(10).bytes(message.state);
    }
    if (message.walls.length !== 0) {
      writer.uint32(18).bytes(message.walls);
    }
    if (message.position !== undefined) {
      Position.encode(message.position, writer.uint32(26).fork()).ldelim();
    }
    if (message.target !== undefined) {
      Position.encode(message.target, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MazeStatePacket {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMazeStatePacket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.state = reader.bytes();
          break;
        case 2:
          message.walls = reader.bytes();
          break;
        case 3:
          message.position = Position.decode(reader, reader.uint32());
          break;
        case 4:
          message.target = Position.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MazeStatePacket {
    return {
      state: isSet(object.state)
        ? bytesFromBase64(object.state)
        : new Uint8Array(),
      walls: isSet(object.walls)
        ? bytesFromBase64(object.walls)
        : new Uint8Array(),
      position: isSet(object.position)
        ? Position.fromJSON(object.position)
        : undefined,
      target: isSet(object.target)
        ? Position.fromJSON(object.target)
        : undefined,
    };
  },

  toJSON(message: MazeStatePacket): unknown {
    const obj: any = {};
    message.state !== undefined &&
      (obj.state = base64FromBytes(
        message.state !== undefined ? message.state : new Uint8Array()
      ));
    message.walls !== undefined &&
      (obj.walls = base64FromBytes(
        message.walls !== undefined ? message.walls : new Uint8Array()
      ));
    message.position !== undefined &&
      (obj.position = message.position
        ? Position.toJSON(message.position)
        : undefined);
    message.target !== undefined &&
      (obj.target = message.target
        ? Position.toJSON(message.target)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MazeStatePacket>, I>>(
    object: I
  ): MazeStatePacket {
    const message = createBaseMazeStatePacket();
    message.state = object.state ?? new Uint8Array();
    message.walls = object.walls ?? new Uint8Array();
    message.position =
      object.position !== undefined && object.position !== null
        ? Position.fromPartial(object.position)
        : undefined;
    message.target =
      object.target !== undefined && object.target !== null
        ? Position.fromPartial(object.target)
        : undefined;
    return message;
  },
};

function createBaseMausConfigPacket(): MausConfigPacket {
  return {
    leftMotorPid: undefined,
    rightMotorPid: undefined,
    lanePid: undefined,
  };
}

export const MausConfigPacket = {
  encode(
    message: MausConfigPacket,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.leftMotorPid !== undefined) {
      MsgEncoderCalibration.encode(
        message.leftMotorPid,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.rightMotorPid !== undefined) {
      MsgEncoderCalibration.encode(
        message.rightMotorPid,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.lanePid !== undefined) {
      MsgEncoderCalibration.encode(
        message.lanePid,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MausConfigPacket {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMausConfigPacket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.leftMotorPid = MsgEncoderCalibration.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.rightMotorPid = MsgEncoderCalibration.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.lanePid = MsgEncoderCalibration.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MausConfigPacket {
    return {
      leftMotorPid: isSet(object.leftMotorPid)
        ? MsgEncoderCalibration.fromJSON(object.leftMotorPid)
        : undefined,
      rightMotorPid: isSet(object.rightMotorPid)
        ? MsgEncoderCalibration.fromJSON(object.rightMotorPid)
        : undefined,
      lanePid: isSet(object.lanePid)
        ? MsgEncoderCalibration.fromJSON(object.lanePid)
        : undefined,
    };
  },

  toJSON(message: MausConfigPacket): unknown {
    const obj: any = {};
    message.leftMotorPid !== undefined &&
      (obj.leftMotorPid = message.leftMotorPid
        ? MsgEncoderCalibration.toJSON(message.leftMotorPid)
        : undefined);
    message.rightMotorPid !== undefined &&
      (obj.rightMotorPid = message.rightMotorPid
        ? MsgEncoderCalibration.toJSON(message.rightMotorPid)
        : undefined);
    message.lanePid !== undefined &&
      (obj.lanePid = message.lanePid
        ? MsgEncoderCalibration.toJSON(message.lanePid)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MausConfigPacket>, I>>(
    object: I
  ): MausConfigPacket {
    const message = createBaseMausConfigPacket();
    message.leftMotorPid =
      object.leftMotorPid !== undefined && object.leftMotorPid !== null
        ? MsgEncoderCalibration.fromPartial(object.leftMotorPid)
        : undefined;
    message.rightMotorPid =
      object.rightMotorPid !== undefined && object.rightMotorPid !== null
        ? MsgEncoderCalibration.fromPartial(object.rightMotorPid)
        : undefined;
    message.lanePid =
      object.lanePid !== undefined && object.lanePid !== null
        ? MsgEncoderCalibration.fromPartial(object.lanePid)
        : undefined;
    return message;
  },
};

function createBaseMausCommandStatus(): MausCommandStatus {
  return { cmd: 0, success: false, target: 0, actual: 0 };
}

export const MausCommandStatus = {
  encode(
    message: MausCommandStatus,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.cmd !== 0) {
      writer.uint32(8).int32(message.cmd);
    }
    if (message.success === true) {
      writer.uint32(16).bool(message.success);
    }
    if (message.target !== 0) {
      writer.uint32(24).uint32(message.target);
    }
    if (message.actual !== 0) {
      writer.uint32(32).uint32(message.actual);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MausCommandStatus {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMausCommandStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cmd = reader.int32() as any;
          break;
        case 2:
          message.success = reader.bool();
          break;
        case 3:
          message.target = reader.uint32();
          break;
        case 4:
          message.actual = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MausCommandStatus {
    return {
      cmd: isSet(object.cmd) ? driveCmdTypeFromJSON(object.cmd) : 0,
      success: isSet(object.success) ? Boolean(object.success) : false,
      target: isSet(object.target) ? Number(object.target) : 0,
      actual: isSet(object.actual) ? Number(object.actual) : 0,
    };
  },

  toJSON(message: MausCommandStatus): unknown {
    const obj: any = {};
    message.cmd !== undefined && (obj.cmd = driveCmdTypeToJSON(message.cmd));
    message.success !== undefined && (obj.success = message.success);
    message.target !== undefined && (obj.target = Math.round(message.target));
    message.actual !== undefined && (obj.actual = Math.round(message.actual));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MausCommandStatus>, I>>(
    object: I
  ): MausCommandStatus {
    const message = createBaseMausCommandStatus();
    message.cmd = object.cmd ?? 0;
    message.success = object.success ?? false;
    message.target = object.target ?? 0;
    message.actual = object.actual ?? 0;
    return message;
  },
};

function createBaseMausOutgoingMessage(): MausOutgoingMessage {
  return {
    ack: undefined,
    nav: undefined,
    pong: undefined,
    info: undefined,
    pidTuning: undefined,
    mazeState: undefined,
    mausConfig: undefined,
    mausCommandStatus: undefined,
  };
}

export const MausOutgoingMessage = {
  encode(
    message: MausOutgoingMessage,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.ack !== undefined) {
      AckPacket.encode(message.ack, writer.uint32(10).fork()).ldelim();
    }
    if (message.nav !== undefined) {
      NavigationPacket.encode(message.nav, writer.uint32(18).fork()).ldelim();
    }
    if (message.pong !== undefined) {
      PongPacket.encode(message.pong, writer.uint32(26).fork()).ldelim();
    }
    if (message.info !== undefined) {
      InfoPacket.encode(message.info, writer.uint32(34).fork()).ldelim();
    }
    if (message.pidTuning !== undefined) {
      PidTuningInfo.encode(
        message.pidTuning,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.mazeState !== undefined) {
      MazeStatePacket.encode(
        message.mazeState,
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.mausConfig !== undefined) {
      MausConfigPacket.encode(
        message.mausConfig,
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.mausCommandStatus !== undefined) {
      MausCommandStatus.encode(
        message.mausCommandStatus,
        writer.uint32(66).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MausOutgoingMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMausOutgoingMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ack = AckPacket.decode(reader, reader.uint32());
          break;
        case 2:
          message.nav = NavigationPacket.decode(reader, reader.uint32());
          break;
        case 3:
          message.pong = PongPacket.decode(reader, reader.uint32());
          break;
        case 4:
          message.info = InfoPacket.decode(reader, reader.uint32());
          break;
        case 5:
          message.pidTuning = PidTuningInfo.decode(reader, reader.uint32());
          break;
        case 6:
          message.mazeState = MazeStatePacket.decode(reader, reader.uint32());
          break;
        case 7:
          message.mausConfig = MausConfigPacket.decode(reader, reader.uint32());
          break;
        case 8:
          message.mausCommandStatus = MausCommandStatus.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MausOutgoingMessage {
    return {
      ack: isSet(object.ack) ? AckPacket.fromJSON(object.ack) : undefined,
      nav: isSet(object.nav)
        ? NavigationPacket.fromJSON(object.nav)
        : undefined,
      pong: isSet(object.pong) ? PongPacket.fromJSON(object.pong) : undefined,
      info: isSet(object.info) ? InfoPacket.fromJSON(object.info) : undefined,
      pidTuning: isSet(object.pidTuning)
        ? PidTuningInfo.fromJSON(object.pidTuning)
        : undefined,
      mazeState: isSet(object.mazeState)
        ? MazeStatePacket.fromJSON(object.mazeState)
        : undefined,
      mausConfig: isSet(object.mausConfig)
        ? MausConfigPacket.fromJSON(object.mausConfig)
        : undefined,
      mausCommandStatus: isSet(object.mausCommandStatus)
        ? MausCommandStatus.fromJSON(object.mausCommandStatus)
        : undefined,
    };
  },

  toJSON(message: MausOutgoingMessage): unknown {
    const obj: any = {};
    message.ack !== undefined &&
      (obj.ack = message.ack ? AckPacket.toJSON(message.ack) : undefined);
    message.nav !== undefined &&
      (obj.nav = message.nav
        ? NavigationPacket.toJSON(message.nav)
        : undefined);
    message.pong !== undefined &&
      (obj.pong = message.pong ? PongPacket.toJSON(message.pong) : undefined);
    message.info !== undefined &&
      (obj.info = message.info ? InfoPacket.toJSON(message.info) : undefined);
    message.pidTuning !== undefined &&
      (obj.pidTuning = message.pidTuning
        ? PidTuningInfo.toJSON(message.pidTuning)
        : undefined);
    message.mazeState !== undefined &&
      (obj.mazeState = message.mazeState
        ? MazeStatePacket.toJSON(message.mazeState)
        : undefined);
    message.mausConfig !== undefined &&
      (obj.mausConfig = message.mausConfig
        ? MausConfigPacket.toJSON(message.mausConfig)
        : undefined);
    message.mausCommandStatus !== undefined &&
      (obj.mausCommandStatus = message.mausCommandStatus
        ? MausCommandStatus.toJSON(message.mausCommandStatus)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MausOutgoingMessage>, I>>(
    object: I
  ): MausOutgoingMessage {
    const message = createBaseMausOutgoingMessage();
    message.ack =
      object.ack !== undefined && object.ack !== null
        ? AckPacket.fromPartial(object.ack)
        : undefined;
    message.nav =
      object.nav !== undefined && object.nav !== null
        ? NavigationPacket.fromPartial(object.nav)
        : undefined;
    message.pong =
      object.pong !== undefined && object.pong !== null
        ? PongPacket.fromPartial(object.pong)
        : undefined;
    message.info =
      object.info !== undefined && object.info !== null
        ? InfoPacket.fromPartial(object.info)
        : undefined;
    message.pidTuning =
      object.pidTuning !== undefined && object.pidTuning !== null
        ? PidTuningInfo.fromPartial(object.pidTuning)
        : undefined;
    message.mazeState =
      object.mazeState !== undefined && object.mazeState !== null
        ? MazeStatePacket.fromPartial(object.mazeState)
        : undefined;
    message.mausConfig =
      object.mausConfig !== undefined && object.mausConfig !== null
        ? MausConfigPacket.fromPartial(object.mausConfig)
        : undefined;
    message.mausCommandStatus =
      object.mausCommandStatus !== undefined &&
      object.mausCommandStatus !== null
        ? MausCommandStatus.fromPartial(object.mausCommandStatus)
        : undefined;
    return message;
  },
};

function createBaseMsgInit(): MsgInit {
  return { version: 0 };
}

export const MsgInit = {
  encode(
    message: MsgInit,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.version !== 0) {
      writer.uint32(8).int32(message.version);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgInit {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgInit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.version = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgInit {
    return {
      version: isSet(object.version) ? Number(object.version) : 0,
    };
  },

  toJSON(message: MsgInit): unknown {
    const obj: any = {};
    message.version !== undefined &&
      (obj.version = Math.round(message.version));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgInit>, I>>(object: I): MsgInit {
    const message = createBaseMsgInit();
    message.version = object.version ?? 0;
    return message;
  },
};

function createBaseMsgPing(): MsgPing {
  return {};
}

export const MsgPing = {
  encode(_: MsgPing, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgPing {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPing();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgPing {
    return {};
  },

  toJSON(_: MsgPing): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgPing>, I>>(_: I): MsgPing {
    const message = createBaseMsgPing();
    return message;
  },
};

function createBaseMsgControl(): MsgControl {
  return { direction: 0, speed: 0 };
}

export const MsgControl = {
  encode(
    message: MsgControl,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.direction !== 0) {
      writer.uint32(13).float(message.direction);
    }
    if (message.speed !== 0) {
      writer.uint32(16).int32(message.speed);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgControl {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgControl();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.direction = reader.float();
          break;
        case 2:
          message.speed = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgControl {
    return {
      direction: isSet(object.direction) ? Number(object.direction) : 0,
      speed: isSet(object.speed) ? Number(object.speed) : 0,
    };
  },

  toJSON(message: MsgControl): unknown {
    const obj: any = {};
    message.direction !== undefined && (obj.direction = message.direction);
    message.speed !== undefined && (obj.speed = Math.round(message.speed));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgControl>, I>>(
    object: I
  ): MsgControl {
    const message = createBaseMsgControl();
    message.direction = object.direction ?? 0;
    message.speed = object.speed ?? 0;
    return message;
  },
};

function createBaseMsgDrive(): MsgDrive {
  return { type: 0, value: 0, speed: 0 };
}

export const MsgDrive = {
  encode(
    message: MsgDrive,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.value !== 0) {
      writer.uint32(21).float(message.value);
    }
    if (message.speed !== 0) {
      writer.uint32(29).float(message.speed);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDrive {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDrive();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.value = reader.float();
          break;
        case 3:
          message.speed = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDrive {
    return {
      type: isSet(object.type) ? driveCmdTypeFromJSON(object.type) : 0,
      value: isSet(object.value) ? Number(object.value) : 0,
      speed: isSet(object.speed) ? Number(object.speed) : 0,
    };
  },

  toJSON(message: MsgDrive): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = driveCmdTypeToJSON(message.type));
    message.value !== undefined && (obj.value = message.value);
    message.speed !== undefined && (obj.speed = message.speed);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDrive>, I>>(object: I): MsgDrive {
    const message = createBaseMsgDrive();
    message.type = object.type ?? 0;
    message.value = object.value ?? 0;
    message.speed = object.speed ?? 0;
    return message;
  },
};

function createBaseMsgSolve(): MsgSolve {
  return { type: 0, speed: 0 };
}

export const MsgSolve = {
  encode(
    message: MsgSolve,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.speed !== 0) {
      writer.uint32(21).float(message.speed);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSolve {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSolve();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.speed = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSolve {
    return {
      type: isSet(object.type) ? solveCmdTypeFromJSON(object.type) : 0,
      speed: isSet(object.speed) ? Number(object.speed) : 0,
    };
  },

  toJSON(message: MsgSolve): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = solveCmdTypeToJSON(message.type));
    message.speed !== undefined && (obj.speed = message.speed);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSolve>, I>>(object: I): MsgSolve {
    const message = createBaseMsgSolve();
    message.type = object.type ?? 0;
    message.speed = object.speed ?? 0;
    return message;
  },
};

function createBaseMsgSetPosition(): MsgSetPosition {
  return { x: 0, y: 0, heading: 0 };
}

export const MsgSetPosition = {
  encode(
    message: MsgSetPosition,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.x !== 0) {
      writer.uint32(13).float(message.x);
    }
    if (message.y !== 0) {
      writer.uint32(21).float(message.y);
    }
    if (message.heading !== 0) {
      writer.uint32(29).float(message.heading);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetPosition {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetPosition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.x = reader.float();
          break;
        case 2:
          message.y = reader.float();
          break;
        case 3:
          message.heading = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetPosition {
    return {
      x: isSet(object.x) ? Number(object.x) : 0,
      y: isSet(object.y) ? Number(object.y) : 0,
      heading: isSet(object.heading) ? Number(object.heading) : 0,
    };
  },

  toJSON(message: MsgSetPosition): unknown {
    const obj: any = {};
    message.x !== undefined && (obj.x = message.x);
    message.y !== undefined && (obj.y = message.y);
    message.heading !== undefined && (obj.heading = message.heading);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetPosition>, I>>(
    object: I
  ): MsgSetPosition {
    const message = createBaseMsgSetPosition();
    message.x = object.x ?? 0;
    message.y = object.y ?? 0;
    message.heading = object.heading ?? 0;
    return message;
  },
};

function createBaseMsgStop(): MsgStop {
  return {};
}

export const MsgStop = {
  encode(_: MsgStop, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgStop {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStop();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgStop {
    return {};
  },

  toJSON(_: MsgStop): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgStop>, I>>(_: I): MsgStop {
    const message = createBaseMsgStop();
    return message;
  },
};

function createBaseMausIncomingMessage(): MausIncomingMessage {
  return {
    init: undefined,
    control: undefined,
    motorCalibration: undefined,
    ping: undefined,
    stop: undefined,
    drive: undefined,
    setPosition: undefined,
    solve: undefined,
    laneCalibration: undefined,
  };
}

export const MausIncomingMessage = {
  encode(
    message: MausIncomingMessage,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.init !== undefined) {
      MsgInit.encode(message.init, writer.uint32(18).fork()).ldelim();
    }
    if (message.control !== undefined) {
      MsgControl.encode(message.control, writer.uint32(26).fork()).ldelim();
    }
    if (message.motorCalibration !== undefined) {
      MsgMotorCalibration.encode(
        message.motorCalibration,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.ping !== undefined) {
      MsgPing.encode(message.ping, writer.uint32(42).fork()).ldelim();
    }
    if (message.stop !== undefined) {
      MsgStop.encode(message.stop, writer.uint32(50).fork()).ldelim();
    }
    if (message.drive !== undefined) {
      MsgDrive.encode(message.drive, writer.uint32(58).fork()).ldelim();
    }
    if (message.setPosition !== undefined) {
      MsgSetPosition.encode(
        message.setPosition,
        writer.uint32(66).fork()
      ).ldelim();
    }
    if (message.solve !== undefined) {
      MsgSolve.encode(message.solve, writer.uint32(74).fork()).ldelim();
    }
    if (message.laneCalibration !== undefined) {
      MsgEncoderCalibration.encode(
        message.laneCalibration,
        writer.uint32(82).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MausIncomingMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMausIncomingMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.init = MsgInit.decode(reader, reader.uint32());
          break;
        case 3:
          message.control = MsgControl.decode(reader, reader.uint32());
          break;
        case 4:
          message.motorCalibration = MsgMotorCalibration.decode(
            reader,
            reader.uint32()
          );
          break;
        case 5:
          message.ping = MsgPing.decode(reader, reader.uint32());
          break;
        case 6:
          message.stop = MsgStop.decode(reader, reader.uint32());
          break;
        case 7:
          message.drive = MsgDrive.decode(reader, reader.uint32());
          break;
        case 8:
          message.setPosition = MsgSetPosition.decode(reader, reader.uint32());
          break;
        case 9:
          message.solve = MsgSolve.decode(reader, reader.uint32());
          break;
        case 10:
          message.laneCalibration = MsgEncoderCalibration.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MausIncomingMessage {
    return {
      init: isSet(object.init) ? MsgInit.fromJSON(object.init) : undefined,
      control: isSet(object.control)
        ? MsgControl.fromJSON(object.control)
        : undefined,
      motorCalibration: isSet(object.motorCalibration)
        ? MsgMotorCalibration.fromJSON(object.motorCalibration)
        : undefined,
      ping: isSet(object.ping) ? MsgPing.fromJSON(object.ping) : undefined,
      stop: isSet(object.stop) ? MsgStop.fromJSON(object.stop) : undefined,
      drive: isSet(object.drive) ? MsgDrive.fromJSON(object.drive) : undefined,
      setPosition: isSet(object.setPosition)
        ? MsgSetPosition.fromJSON(object.setPosition)
        : undefined,
      solve: isSet(object.solve) ? MsgSolve.fromJSON(object.solve) : undefined,
      laneCalibration: isSet(object.laneCalibration)
        ? MsgEncoderCalibration.fromJSON(object.laneCalibration)
        : undefined,
    };
  },

  toJSON(message: MausIncomingMessage): unknown {
    const obj: any = {};
    message.init !== undefined &&
      (obj.init = message.init ? MsgInit.toJSON(message.init) : undefined);
    message.control !== undefined &&
      (obj.control = message.control
        ? MsgControl.toJSON(message.control)
        : undefined);
    message.motorCalibration !== undefined &&
      (obj.motorCalibration = message.motorCalibration
        ? MsgMotorCalibration.toJSON(message.motorCalibration)
        : undefined);
    message.ping !== undefined &&
      (obj.ping = message.ping ? MsgPing.toJSON(message.ping) : undefined);
    message.stop !== undefined &&
      (obj.stop = message.stop ? MsgStop.toJSON(message.stop) : undefined);
    message.drive !== undefined &&
      (obj.drive = message.drive ? MsgDrive.toJSON(message.drive) : undefined);
    message.setPosition !== undefined &&
      (obj.setPosition = message.setPosition
        ? MsgSetPosition.toJSON(message.setPosition)
        : undefined);
    message.solve !== undefined &&
      (obj.solve = message.solve ? MsgSolve.toJSON(message.solve) : undefined);
    message.laneCalibration !== undefined &&
      (obj.laneCalibration = message.laneCalibration
        ? MsgEncoderCalibration.toJSON(message.laneCalibration)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MausIncomingMessage>, I>>(
    object: I
  ): MausIncomingMessage {
    const message = createBaseMausIncomingMessage();
    message.init =
      object.init !== undefined && object.init !== null
        ? MsgInit.fromPartial(object.init)
        : undefined;
    message.control =
      object.control !== undefined && object.control !== null
        ? MsgControl.fromPartial(object.control)
        : undefined;
    message.motorCalibration =
      object.motorCalibration !== undefined &&
      object.motorCalibration !== null
        ? MsgMotorCalibration.fromPartial(object.motorCalibration)
        : undefined;
    message.ping =
      object.ping !== undefined && object.ping !== null
        ? MsgPing.fromPartial(object.ping)
        : undefined;
    message.stop =
      object.stop !== undefined && object.stop !== null
        ? MsgStop.fromPartial(object.stop)
        : undefined;
    message.drive =
      object.drive !== undefined && object.drive !== null
        ? MsgDrive.fromPartial(object.drive)
        : undefined;
    message.setPosition =
      object.setPosition !== undefined && object.setPosition !== null
        ? MsgSetPosition.fromPartial(object.setPosition)
        : undefined;
    message.solve =
      object.solve !== undefined && object.solve !== null
        ? MsgSolve.fromPartial(object.solve)
        : undefined;
    message.laneCalibration =
      object.laneCalibration !== undefined && object.laneCalibration !== null
        ? MsgEncoderCalibration.fromPartial(object.laneCalibration)
        : undefined;
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  arr.forEach((byte) => {
    bin.push(String.fromCharCode(byte));
  });
  return btoa(bin.join(""));
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
