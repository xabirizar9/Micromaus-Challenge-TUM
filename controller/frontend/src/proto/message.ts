/* eslint-disable */
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";

export const protobufPackage = "";

export interface SensorPacket {
  left: number;
  front: number;
  right: number;
}

export interface MausOutgoingMessage {
  packet?: SensorPacket | undefined;
}

export interface MausIncomingMessage {
  packet?: SensorPacket | undefined;
}

function createBaseSensorPacket(): SensorPacket {
  return { left: 0, front: 0, right: 0 };
}

export const SensorPacket = {
  encode(message: SensorPacket, writer: Writer = Writer.create()): Writer {
    if (message.left !== 0) {
      writer.uint32(8).int32(message.left);
    }
    if (message.front !== 0) {
      writer.uint32(16).int32(message.front);
    }
    if (message.right !== 0) {
      writer.uint32(24).int32(message.right);
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
          message.left = reader.int32();
          break;
        case 2:
          message.front = reader.int32();
          break;
        case 3:
          message.right = reader.int32();
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
    message.left !== undefined && (obj.left = Math.round(message.left));
    message.front !== undefined && (obj.front = Math.round(message.front));
    message.right !== undefined && (obj.right = Math.round(message.right));
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

function createBaseMausOutgoingMessage(): MausOutgoingMessage {
  return { packet: undefined };
}

export const MausOutgoingMessage = {
  encode(
    message: MausOutgoingMessage,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.packet !== undefined) {
      SensorPacket.encode(message.packet, writer.uint32(10).fork()).ldelim();
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
          message.packet = SensorPacket.decode(reader, reader.uint32());
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
      packet: isSet(object.packet)
        ? SensorPacket.fromJSON(object.packet)
        : undefined,
    };
  },

  toJSON(message: MausOutgoingMessage): unknown {
    const obj: any = {};
    message.packet !== undefined &&
      (obj.packet = message.packet
        ? SensorPacket.toJSON(message.packet)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MausOutgoingMessage>, I>>(
    object: I
  ): MausOutgoingMessage {
    const message = createBaseMausOutgoingMessage();
    message.packet =
      object.packet !== undefined && object.packet !== null
        ? SensorPacket.fromPartial(object.packet)
        : undefined;
    return message;
  },
};

function createBaseMausIncomingMessage(): MausIncomingMessage {
  return { packet: undefined };
}

export const MausIncomingMessage = {
  encode(
    message: MausIncomingMessage,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.packet !== undefined) {
      SensorPacket.encode(message.packet, writer.uint32(10).fork()).ldelim();
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
        case 1:
          message.packet = SensorPacket.decode(reader, reader.uint32());
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
      packet: isSet(object.packet)
        ? SensorPacket.fromJSON(object.packet)
        : undefined,
    };
  },

  toJSON(message: MausIncomingMessage): unknown {
    const obj: any = {};
    message.packet !== undefined &&
      (obj.packet = message.packet
        ? SensorPacket.toJSON(message.packet)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MausIncomingMessage>, I>>(
    object: I
  ): MausIncomingMessage {
    const message = createBaseMausIncomingMessage();
    message.packet =
      object.packet !== undefined && object.packet !== null
        ? SensorPacket.fromPartial(object.packet)
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
