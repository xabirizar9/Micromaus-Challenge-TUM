/* eslint-disable */
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";
import { MausIncomingMessage, MausOutgoingMessage } from "./message";

export const protobufPackage = "";

export interface SelectDeviceClientMessage {
  deviceId: string;
}

export interface DashboardClientMessage {
  selectDevice: SelectDeviceClientMessage | undefined;
}

export interface DeviceSelected {}

export interface DeviceLostMessage {}

export interface NewDeviceMessage {}

export interface DashboardServerMessage {
  selected: DeviceSelected | undefined;
  deviceLost: DeviceLostMessage | undefined;
  newDevice: NewDeviceMessage | undefined;
}

export interface ClientMessage {
  dashboard: DashboardClientMessage | undefined;
  maus: MausIncomingMessage | undefined;
}

export interface ServerMessage {
  maus: MausOutgoingMessage | undefined;
  dashboard: DashboardServerMessage | undefined;
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

function createBaseDeviceSelected(): DeviceSelected {
  return {};
}

export const DeviceSelected = {
  encode(_: DeviceSelected, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DeviceSelected {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeviceSelected();
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

  fromJSON(_: any): DeviceSelected {
    return {};
  },

  toJSON(_: DeviceSelected): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DeviceSelected>, I>>(
    _: I
  ): DeviceSelected {
    const message = createBaseDeviceSelected();
    return message;
  },
};

function createBaseDeviceLostMessage(): DeviceLostMessage {
  return {};
}

export const DeviceLostMessage = {
  encode(_: DeviceLostMessage, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DeviceLostMessage {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeviceLostMessage();
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

  fromJSON(_: any): DeviceLostMessage {
    return {};
  },

  toJSON(_: DeviceLostMessage): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DeviceLostMessage>, I>>(
    _: I
  ): DeviceLostMessage {
    const message = createBaseDeviceLostMessage();
    return message;
  },
};

function createBaseNewDeviceMessage(): NewDeviceMessage {
  return {};
}

export const NewDeviceMessage = {
  encode(_: NewDeviceMessage, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): NewDeviceMessage {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNewDeviceMessage();
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

  fromJSON(_: any): NewDeviceMessage {
    return {};
  },

  toJSON(_: NewDeviceMessage): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NewDeviceMessage>, I>>(
    _: I
  ): NewDeviceMessage {
    const message = createBaseNewDeviceMessage();
    return message;
  },
};

function createBaseDashboardServerMessage(): DashboardServerMessage {
  return { selected: undefined, deviceLost: undefined, newDevice: undefined };
}

export const DashboardServerMessage = {
  encode(
    message: DashboardServerMessage,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.selected !== undefined) {
      DeviceSelected.encode(
        message.selected,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.deviceLost !== undefined) {
      DeviceLostMessage.encode(
        message.deviceLost,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.newDevice !== undefined) {
      NewDeviceMessage.encode(
        message.newDevice,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DashboardServerMessage {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDashboardServerMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.selected = DeviceSelected.decode(reader, reader.uint32());
          break;
        case 2:
          message.deviceLost = DeviceLostMessage.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.newDevice = NewDeviceMessage.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DashboardServerMessage {
    return {
      selected: isSet(object.selected)
        ? DeviceSelected.fromJSON(object.selected)
        : undefined,
      deviceLost: isSet(object.deviceLost)
        ? DeviceLostMessage.fromJSON(object.deviceLost)
        : undefined,
      newDevice: isSet(object.newDevice)
        ? NewDeviceMessage.fromJSON(object.newDevice)
        : undefined,
    };
  },

  toJSON(message: DashboardServerMessage): unknown {
    const obj: any = {};
    message.selected !== undefined &&
      (obj.selected = message.selected
        ? DeviceSelected.toJSON(message.selected)
        : undefined);
    message.deviceLost !== undefined &&
      (obj.deviceLost = message.deviceLost
        ? DeviceLostMessage.toJSON(message.deviceLost)
        : undefined);
    message.newDevice !== undefined &&
      (obj.newDevice = message.newDevice
        ? NewDeviceMessage.toJSON(message.newDevice)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DashboardServerMessage>, I>>(
    object: I
  ): DashboardServerMessage {
    const message = createBaseDashboardServerMessage();
    message.selected =
      object.selected !== undefined && object.selected !== null
        ? DeviceSelected.fromPartial(object.selected)
        : undefined;
    message.deviceLost =
      object.deviceLost !== undefined && object.deviceLost !== null
        ? DeviceLostMessage.fromPartial(object.deviceLost)
        : undefined;
    message.newDevice =
      object.newDevice !== undefined && object.newDevice !== null
        ? NewDeviceMessage.fromPartial(object.newDevice)
        : undefined;
    return message;
  },
};

function createBaseClientMessage(): ClientMessage {
  return { dashboard: undefined, maus: undefined };
}

export const ClientMessage = {
  encode(message: ClientMessage, writer: Writer = Writer.create()): Writer {
    if (message.dashboard !== undefined) {
      DashboardClientMessage.encode(
        message.dashboard,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.maus !== undefined) {
      MausIncomingMessage.encode(
        message.maus,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ClientMessage {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClientMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.dashboard = DashboardClientMessage.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.maus = MausIncomingMessage.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ClientMessage {
    return {
      dashboard: isSet(object.dashboard)
        ? DashboardClientMessage.fromJSON(object.dashboard)
        : undefined,
      maus: isSet(object.maus)
        ? MausIncomingMessage.fromJSON(object.maus)
        : undefined,
    };
  },

  toJSON(message: ClientMessage): unknown {
    const obj: any = {};
    message.dashboard !== undefined &&
      (obj.dashboard = message.dashboard
        ? DashboardClientMessage.toJSON(message.dashboard)
        : undefined);
    message.maus !== undefined &&
      (obj.maus = message.maus
        ? MausIncomingMessage.toJSON(message.maus)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ClientMessage>, I>>(
    object: I
  ): ClientMessage {
    const message = createBaseClientMessage();
    message.dashboard =
      object.dashboard !== undefined && object.dashboard !== null
        ? DashboardClientMessage.fromPartial(object.dashboard)
        : undefined;
    message.maus =
      object.maus !== undefined && object.maus !== null
        ? MausIncomingMessage.fromPartial(object.maus)
        : undefined;
    return message;
  },
};

function createBaseServerMessage(): ServerMessage {
  return { maus: undefined, dashboard: undefined };
}

export const ServerMessage = {
  encode(message: ServerMessage, writer: Writer = Writer.create()): Writer {
    if (message.maus !== undefined) {
      MausOutgoingMessage.encode(
        message.maus,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.dashboard !== undefined) {
      DashboardServerMessage.encode(
        message.dashboard,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ServerMessage {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseServerMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.maus = MausOutgoingMessage.decode(reader, reader.uint32());
          break;
        case 2:
          message.dashboard = DashboardServerMessage.decode(
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

  fromJSON(object: any): ServerMessage {
    return {
      maus: isSet(object.maus)
        ? MausOutgoingMessage.fromJSON(object.maus)
        : undefined,
      dashboard: isSet(object.dashboard)
        ? DashboardServerMessage.fromJSON(object.dashboard)
        : undefined,
    };
  },

  toJSON(message: ServerMessage): unknown {
    const obj: any = {};
    message.maus !== undefined &&
      (obj.maus = message.maus
        ? MausOutgoingMessage.toJSON(message.maus)
        : undefined);
    message.dashboard !== undefined &&
      (obj.dashboard = message.dashboard
        ? DashboardServerMessage.toJSON(message.dashboard)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ServerMessage>, I>>(
    object: I
  ): ServerMessage {
    const message = createBaseServerMessage();
    message.maus =
      object.maus !== undefined && object.maus !== null
        ? MausOutgoingMessage.fromPartial(object.maus)
        : undefined;
    message.dashboard =
      object.dashboard !== undefined && object.dashboard !== null
        ? DashboardServerMessage.fromPartial(object.dashboard)
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
