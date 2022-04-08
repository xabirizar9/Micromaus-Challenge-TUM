/* eslint-disable */
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";

export const protobufPackage = "";

export interface SelectDeviceClientMessage {
  deviceId: string;
}

export interface DashboardClientMessage {
  selectDevice: SelectDeviceClientMessage | undefined;
}

function createBaseSelectDeviceClientMessage(): SelectDeviceClientMessage {
  return { deviceId: "" };
}

export const SelectDeviceClientMessage = {
  encode(
    message: SelectDeviceClientMessage,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.deviceId !== "") {
      writer.uint32(10).string(message.deviceId);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): SelectDeviceClientMessage {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSelectDeviceClientMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.deviceId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SelectDeviceClientMessage {
    return {
      deviceId: isSet(object.deviceId) ? String(object.deviceId) : "",
    };
  },

  toJSON(message: SelectDeviceClientMessage): unknown {
    const obj: any = {};
    message.deviceId !== undefined && (obj.deviceId = message.deviceId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SelectDeviceClientMessage>, I>>(
    object: I
  ): SelectDeviceClientMessage {
    const message = createBaseSelectDeviceClientMessage();
    message.deviceId = object.deviceId ?? "";
    return message;
  },
};

function createBaseDashboardClientMessage(): DashboardClientMessage {
  return { selectDevice: undefined };
}

export const DashboardClientMessage = {
  encode(
    message: DashboardClientMessage,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.selectDevice !== undefined) {
      SelectDeviceClientMessage.encode(
        message.selectDevice,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DashboardClientMessage {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDashboardClientMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.selectDevice = SelectDeviceClientMessage.decode(
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

  fromJSON(object: any): DashboardClientMessage {
    return {
      selectDevice: isSet(object.selectDevice)
        ? SelectDeviceClientMessage.fromJSON(object.selectDevice)
        : undefined,
    };
  },

  toJSON(message: DashboardClientMessage): unknown {
    const obj: any = {};
    message.selectDevice !== undefined &&
      (obj.selectDevice = message.selectDevice
        ? SelectDeviceClientMessage.toJSON(message.selectDevice)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DashboardClientMessage>, I>>(
    object: I
  ): DashboardClientMessage {
    const message = createBaseDashboardClientMessage();
    message.selectDevice =
      object.selectDevice !== undefined && object.selectDevice !== null
        ? SelectDeviceClientMessage.fromPartial(object.selectDevice)
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
