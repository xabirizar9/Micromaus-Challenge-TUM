/* eslint-disable */
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";

export const protobufPackage = "";

export enum MsgType {
  Init = 0,
  SensorData = 1,
  Control = 2,
  UNRECOGNIZED = -1,
}

export function msgTypeFromJSON(object: any): MsgType {
  switch (object) {
    case 0:
    case "Init":
      return MsgType.Init;
    case 1:
    case "SensorData":
      return MsgType.SensorData;
    case 2:
    case "Control":
      return MsgType.Control;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MsgType.UNRECOGNIZED;
  }
}

export function msgTypeToJSON(object: MsgType): string {
  switch (object) {
    case MsgType.Init:
      return "Init";
    case MsgType.SensorData:
      return "SensorData";
    case MsgType.Control:
      return "Control";
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

export interface SensorPacket {
  left: number;
  front: number;
  right: number;
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
}

export interface MausOutgoingMessage {
  ack: AckPacket | undefined;
  nav: NavigationPacket | undefined;
}

/** command indicates remote client connection */
export interface MsgInit {
  version: number;
}

export interface MsgControl {
  direction: number;
  speed: number;
}

export interface MsgEncoderCallibration {
  kP: number;
  kI: number;
  kD: number;
}

export interface MausIncomingMessage {
  init: MsgInit | undefined;
  control: MsgControl | undefined;
  encoderCallibration: MsgEncoderCallibration | undefined;
}

function createBaseAckPacket(): AckPacket {
  return {};
}

export const AckPacket = {
  encode(_: AckPacket, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): AckPacket {
    const reader = input instanceof Reader ? input : new Reader(input);
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
  encode(message: Position, writer: Writer = Writer.create()): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): Position {
    const reader = input instanceof Reader ? input : new Reader(input);
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

function createBaseSensorPacket(): SensorPacket {
  return { left: 0, front: 0, right: 0 };
}

export const SensorPacket = {
  encode(message: SensorPacket, writer: Writer = Writer.create()): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): SensorPacket {
    const reader = input instanceof Reader ? input : new Reader(input);
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
  };
}

export const NavigationPacket = {
  encode(message: NavigationPacket, writer: Writer = Writer.create()): Writer {
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
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): NavigationPacket {
    const reader = input instanceof Reader ? input : new Reader(input);
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
    return message;
  },
};

function createBaseMausOutgoingMessage(): MausOutgoingMessage {
  return { ack: undefined, nav: undefined };
}

export const MausOutgoingMessage = {
  encode(
    message: MausOutgoingMessage,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.ack !== undefined) {
      AckPacket.encode(message.ack, writer.uint32(10).fork()).ldelim();
    }
    if (message.nav !== undefined) {
      NavigationPacket.encode(message.nav, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MausOutgoingMessage {
    const reader = input instanceof Reader ? input : new Reader(input);
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
    return message;
  },
};

function createBaseMsgInit(): MsgInit {
  return { version: 0 };
}

export const MsgInit = {
  encode(message: MsgInit, writer: Writer = Writer.create()): Writer {
    if (message.version !== 0) {
      writer.uint32(8).int32(message.version);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgInit {
    const reader = input instanceof Reader ? input : new Reader(input);
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

function createBaseMsgControl(): MsgControl {
  return { direction: 0, speed: 0 };
}

export const MsgControl = {
  encode(message: MsgControl, writer: Writer = Writer.create()): Writer {
    if (message.direction !== 0) {
      writer.uint32(13).float(message.direction);
    }
    if (message.speed !== 0) {
      writer.uint32(16).int32(message.speed);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgControl {
    const reader = input instanceof Reader ? input : new Reader(input);
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

function createBaseMsgEncoderCallibration(): MsgEncoderCallibration {
  return { kP: 0, kI: 0, kD: 0 };
}

export const MsgEncoderCallibration = {
  encode(
    message: MsgEncoderCallibration,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.kP !== 0) {
      writer.uint32(13).float(message.kP);
    }
    if (message.kI !== 0) {
      writer.uint32(21).float(message.kI);
    }
    if (message.kD !== 0) {
      writer.uint32(29).float(message.kD);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgEncoderCallibration {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgEncoderCallibration();
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
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgEncoderCallibration {
    return {
      kP: isSet(object.kP) ? Number(object.kP) : 0,
      kI: isSet(object.kI) ? Number(object.kI) : 0,
      kD: isSet(object.kD) ? Number(object.kD) : 0,
    };
  },

  toJSON(message: MsgEncoderCallibration): unknown {
    const obj: any = {};
    message.kP !== undefined && (obj.kP = message.kP);
    message.kI !== undefined && (obj.kI = message.kI);
    message.kD !== undefined && (obj.kD = message.kD);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgEncoderCallibration>, I>>(
    object: I
  ): MsgEncoderCallibration {
    const message = createBaseMsgEncoderCallibration();
    message.kP = object.kP ?? 0;
    message.kI = object.kI ?? 0;
    message.kD = object.kD ?? 0;
    return message;
  },
};

function createBaseMausIncomingMessage(): MausIncomingMessage {
  return {
    init: undefined,
    control: undefined,
    encoderCallibration: undefined,
  };
}

export const MausIncomingMessage = {
  encode(
    message: MausIncomingMessage,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.init !== undefined) {
      MsgInit.encode(message.init, writer.uint32(18).fork()).ldelim();
    }
    if (message.control !== undefined) {
      MsgControl.encode(message.control, writer.uint32(26).fork()).ldelim();
    }
    if (message.encoderCallibration !== undefined) {
      MsgEncoderCallibration.encode(
        message.encoderCallibration,
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MausIncomingMessage {
    const reader = input instanceof Reader ? input : new Reader(input);
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
          message.encoderCallibration = MsgEncoderCallibration.decode(
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
      encoderCallibration: isSet(object.encoderCallibration)
        ? MsgEncoderCallibration.fromJSON(object.encoderCallibration)
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
    message.encoderCallibration !== undefined &&
      (obj.encoderCallibration = message.encoderCallibration
        ? MsgEncoderCallibration.toJSON(message.encoderCallibration)
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
    message.encoderCallibration =
      object.encoderCallibration !== undefined &&
      object.encoderCallibration !== null
        ? MsgEncoderCallibration.fromPartial(object.encoderCallibration)
        : undefined;
    return message;
  },
};

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
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
