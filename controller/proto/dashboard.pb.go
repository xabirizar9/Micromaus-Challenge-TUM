// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.27.1
// 	protoc        v3.19.4
// source: dashboard.proto

package proto

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type SelectDeviceClientMessage struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	DeviceId string `protobuf:"bytes,1,opt,name=deviceId,proto3" json:"deviceId,omitempty"`
}

func (x *SelectDeviceClientMessage) Reset() {
	*x = SelectDeviceClientMessage{}
	if protoimpl.UnsafeEnabled {
		mi := &file_dashboard_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *SelectDeviceClientMessage) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*SelectDeviceClientMessage) ProtoMessage() {}

func (x *SelectDeviceClientMessage) ProtoReflect() protoreflect.Message {
	mi := &file_dashboard_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use SelectDeviceClientMessage.ProtoReflect.Descriptor instead.
func (*SelectDeviceClientMessage) Descriptor() ([]byte, []int) {
	return file_dashboard_proto_rawDescGZIP(), []int{0}
}

func (x *SelectDeviceClientMessage) GetDeviceId() string {
	if x != nil {
		return x.DeviceId
	}
	return ""
}

type DashboardClientMessage struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// Types that are assignable to Payload:
	//	*DashboardClientMessage_SelectDevice
	Payload isDashboardClientMessage_Payload `protobuf_oneof:"payload"`
}

func (x *DashboardClientMessage) Reset() {
	*x = DashboardClientMessage{}
	if protoimpl.UnsafeEnabled {
		mi := &file_dashboard_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *DashboardClientMessage) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*DashboardClientMessage) ProtoMessage() {}

func (x *DashboardClientMessage) ProtoReflect() protoreflect.Message {
	mi := &file_dashboard_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use DashboardClientMessage.ProtoReflect.Descriptor instead.
func (*DashboardClientMessage) Descriptor() ([]byte, []int) {
	return file_dashboard_proto_rawDescGZIP(), []int{1}
}

func (m *DashboardClientMessage) GetPayload() isDashboardClientMessage_Payload {
	if m != nil {
		return m.Payload
	}
	return nil
}

func (x *DashboardClientMessage) GetSelectDevice() *SelectDeviceClientMessage {
	if x, ok := x.GetPayload().(*DashboardClientMessage_SelectDevice); ok {
		return x.SelectDevice
	}
	return nil
}

type isDashboardClientMessage_Payload interface {
	isDashboardClientMessage_Payload()
}

type DashboardClientMessage_SelectDevice struct {
	SelectDevice *SelectDeviceClientMessage `protobuf:"bytes,1,opt,name=selectDevice,proto3,oneof"`
}

func (*DashboardClientMessage_SelectDevice) isDashboardClientMessage_Payload() {}

type DeviceSelected struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *DeviceSelected) Reset() {
	*x = DeviceSelected{}
	if protoimpl.UnsafeEnabled {
		mi := &file_dashboard_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *DeviceSelected) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*DeviceSelected) ProtoMessage() {}

func (x *DeviceSelected) ProtoReflect() protoreflect.Message {
	mi := &file_dashboard_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use DeviceSelected.ProtoReflect.Descriptor instead.
func (*DeviceSelected) Descriptor() ([]byte, []int) {
	return file_dashboard_proto_rawDescGZIP(), []int{2}
}

type DeviceLostMessage struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *DeviceLostMessage) Reset() {
	*x = DeviceLostMessage{}
	if protoimpl.UnsafeEnabled {
		mi := &file_dashboard_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *DeviceLostMessage) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*DeviceLostMessage) ProtoMessage() {}

func (x *DeviceLostMessage) ProtoReflect() protoreflect.Message {
	mi := &file_dashboard_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use DeviceLostMessage.ProtoReflect.Descriptor instead.
func (*DeviceLostMessage) Descriptor() ([]byte, []int) {
	return file_dashboard_proto_rawDescGZIP(), []int{3}
}

type NewDeviceMessage struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *NewDeviceMessage) Reset() {
	*x = NewDeviceMessage{}
	if protoimpl.UnsafeEnabled {
		mi := &file_dashboard_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *NewDeviceMessage) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*NewDeviceMessage) ProtoMessage() {}

func (x *NewDeviceMessage) ProtoReflect() protoreflect.Message {
	mi := &file_dashboard_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use NewDeviceMessage.ProtoReflect.Descriptor instead.
func (*NewDeviceMessage) Descriptor() ([]byte, []int) {
	return file_dashboard_proto_rawDescGZIP(), []int{4}
}

type DashboardServerMessage struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// Types that are assignable to Payload:
	//	*DashboardServerMessage_Selected
	//	*DashboardServerMessage_DeviceLost
	//	*DashboardServerMessage_NewDevice
	Payload isDashboardServerMessage_Payload `protobuf_oneof:"payload"`
}

func (x *DashboardServerMessage) Reset() {
	*x = DashboardServerMessage{}
	if protoimpl.UnsafeEnabled {
		mi := &file_dashboard_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *DashboardServerMessage) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*DashboardServerMessage) ProtoMessage() {}

func (x *DashboardServerMessage) ProtoReflect() protoreflect.Message {
	mi := &file_dashboard_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use DashboardServerMessage.ProtoReflect.Descriptor instead.
func (*DashboardServerMessage) Descriptor() ([]byte, []int) {
	return file_dashboard_proto_rawDescGZIP(), []int{5}
}

func (m *DashboardServerMessage) GetPayload() isDashboardServerMessage_Payload {
	if m != nil {
		return m.Payload
	}
	return nil
}

func (x *DashboardServerMessage) GetSelected() *DeviceSelected {
	if x, ok := x.GetPayload().(*DashboardServerMessage_Selected); ok {
		return x.Selected
	}
	return nil
}

func (x *DashboardServerMessage) GetDeviceLost() *DeviceLostMessage {
	if x, ok := x.GetPayload().(*DashboardServerMessage_DeviceLost); ok {
		return x.DeviceLost
	}
	return nil
}

func (x *DashboardServerMessage) GetNewDevice() *NewDeviceMessage {
	if x, ok := x.GetPayload().(*DashboardServerMessage_NewDevice); ok {
		return x.NewDevice
	}
	return nil
}

type isDashboardServerMessage_Payload interface {
	isDashboardServerMessage_Payload()
}

type DashboardServerMessage_Selected struct {
	Selected *DeviceSelected `protobuf:"bytes,1,opt,name=selected,proto3,oneof"`
}

type DashboardServerMessage_DeviceLost struct {
	DeviceLost *DeviceLostMessage `protobuf:"bytes,2,opt,name=deviceLost,proto3,oneof"`
}

type DashboardServerMessage_NewDevice struct {
	NewDevice *NewDeviceMessage `protobuf:"bytes,3,opt,name=newDevice,proto3,oneof"`
}

func (*DashboardServerMessage_Selected) isDashboardServerMessage_Payload() {}

func (*DashboardServerMessage_DeviceLost) isDashboardServerMessage_Payload() {}

func (*DashboardServerMessage_NewDevice) isDashboardServerMessage_Payload() {}

type ClientMessage struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// Types that are assignable to Payload:
	//	*ClientMessage_Dashboard
	//	*ClientMessage_Maus
	Payload isClientMessage_Payload `protobuf_oneof:"payload"`
}

func (x *ClientMessage) Reset() {
	*x = ClientMessage{}
	if protoimpl.UnsafeEnabled {
		mi := &file_dashboard_proto_msgTypes[6]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ClientMessage) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ClientMessage) ProtoMessage() {}

func (x *ClientMessage) ProtoReflect() protoreflect.Message {
	mi := &file_dashboard_proto_msgTypes[6]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ClientMessage.ProtoReflect.Descriptor instead.
func (*ClientMessage) Descriptor() ([]byte, []int) {
	return file_dashboard_proto_rawDescGZIP(), []int{6}
}

func (m *ClientMessage) GetPayload() isClientMessage_Payload {
	if m != nil {
		return m.Payload
	}
	return nil
}

func (x *ClientMessage) GetDashboard() *DashboardClientMessage {
	if x, ok := x.GetPayload().(*ClientMessage_Dashboard); ok {
		return x.Dashboard
	}
	return nil
}

func (x *ClientMessage) GetMaus() *MausIncomingMessage {
	if x, ok := x.GetPayload().(*ClientMessage_Maus); ok {
		return x.Maus
	}
	return nil
}

type isClientMessage_Payload interface {
	isClientMessage_Payload()
}

type ClientMessage_Dashboard struct {
	Dashboard *DashboardClientMessage `protobuf:"bytes,1,opt,name=dashboard,proto3,oneof"`
}

type ClientMessage_Maus struct {
	Maus *MausIncomingMessage `protobuf:"bytes,2,opt,name=maus,proto3,oneof"`
}

func (*ClientMessage_Dashboard) isClientMessage_Payload() {}

func (*ClientMessage_Maus) isClientMessage_Payload() {}

type ServerMessage struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// Types that are assignable to Payload:
	//	*ServerMessage_Maus
	//	*ServerMessage_Dashboard
	Payload isServerMessage_Payload `protobuf_oneof:"payload"`
}

func (x *ServerMessage) Reset() {
	*x = ServerMessage{}
	if protoimpl.UnsafeEnabled {
		mi := &file_dashboard_proto_msgTypes[7]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ServerMessage) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ServerMessage) ProtoMessage() {}

func (x *ServerMessage) ProtoReflect() protoreflect.Message {
	mi := &file_dashboard_proto_msgTypes[7]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ServerMessage.ProtoReflect.Descriptor instead.
func (*ServerMessage) Descriptor() ([]byte, []int) {
	return file_dashboard_proto_rawDescGZIP(), []int{7}
}

func (m *ServerMessage) GetPayload() isServerMessage_Payload {
	if m != nil {
		return m.Payload
	}
	return nil
}

func (x *ServerMessage) GetMaus() *MausOutgoingMessage {
	if x, ok := x.GetPayload().(*ServerMessage_Maus); ok {
		return x.Maus
	}
	return nil
}

func (x *ServerMessage) GetDashboard() *DashboardServerMessage {
	if x, ok := x.GetPayload().(*ServerMessage_Dashboard); ok {
		return x.Dashboard
	}
	return nil
}

type isServerMessage_Payload interface {
	isServerMessage_Payload()
}

type ServerMessage_Maus struct {
	Maus *MausOutgoingMessage `protobuf:"bytes,1,opt,name=maus,proto3,oneof"`
}

type ServerMessage_Dashboard struct {
	Dashboard *DashboardServerMessage `protobuf:"bytes,2,opt,name=dashboard,proto3,oneof"`
}

func (*ServerMessage_Maus) isServerMessage_Payload() {}

func (*ServerMessage_Dashboard) isServerMessage_Payload() {}

var File_dashboard_proto protoreflect.FileDescriptor

var file_dashboard_proto_rawDesc = []byte{
	0x0a, 0x0f, 0x64, 0x61, 0x73, 0x68, 0x62, 0x6f, 0x61, 0x72, 0x64, 0x2e, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x1a, 0x0d, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x22, 0x37, 0x0a, 0x19, 0x53, 0x65, 0x6c, 0x65, 0x63, 0x74, 0x44, 0x65, 0x76, 0x69, 0x63, 0x65,
	0x43, 0x6c, 0x69, 0x65, 0x6e, 0x74, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x12, 0x1a, 0x0a,
	0x08, 0x64, 0x65, 0x76, 0x69, 0x63, 0x65, 0x49, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52,
	0x08, 0x64, 0x65, 0x76, 0x69, 0x63, 0x65, 0x49, 0x64, 0x22, 0x65, 0x0a, 0x16, 0x44, 0x61, 0x73,
	0x68, 0x62, 0x6f, 0x61, 0x72, 0x64, 0x43, 0x6c, 0x69, 0x65, 0x6e, 0x74, 0x4d, 0x65, 0x73, 0x73,
	0x61, 0x67, 0x65, 0x12, 0x40, 0x0a, 0x0c, 0x73, 0x65, 0x6c, 0x65, 0x63, 0x74, 0x44, 0x65, 0x76,
	0x69, 0x63, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1a, 0x2e, 0x53, 0x65, 0x6c, 0x65,
	0x63, 0x74, 0x44, 0x65, 0x76, 0x69, 0x63, 0x65, 0x43, 0x6c, 0x69, 0x65, 0x6e, 0x74, 0x4d, 0x65,
	0x73, 0x73, 0x61, 0x67, 0x65, 0x48, 0x00, 0x52, 0x0c, 0x73, 0x65, 0x6c, 0x65, 0x63, 0x74, 0x44,
	0x65, 0x76, 0x69, 0x63, 0x65, 0x42, 0x09, 0x0a, 0x07, 0x70, 0x61, 0x79, 0x6c, 0x6f, 0x61, 0x64,
	0x22, 0x10, 0x0a, 0x0e, 0x44, 0x65, 0x76, 0x69, 0x63, 0x65, 0x53, 0x65, 0x6c, 0x65, 0x63, 0x74,
	0x65, 0x64, 0x22, 0x13, 0x0a, 0x11, 0x44, 0x65, 0x76, 0x69, 0x63, 0x65, 0x4c, 0x6f, 0x73, 0x74,
	0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x22, 0x12, 0x0a, 0x10, 0x4e, 0x65, 0x77, 0x44, 0x65,
	0x76, 0x69, 0x63, 0x65, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x22, 0xbb, 0x01, 0x0a, 0x16,
	0x44, 0x61, 0x73, 0x68, 0x62, 0x6f, 0x61, 0x72, 0x64, 0x53, 0x65, 0x72, 0x76, 0x65, 0x72, 0x4d,
	0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x12, 0x2d, 0x0a, 0x08, 0x73, 0x65, 0x6c, 0x65, 0x63, 0x74,
	0x65, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x0f, 0x2e, 0x44, 0x65, 0x76, 0x69, 0x63,
	0x65, 0x53, 0x65, 0x6c, 0x65, 0x63, 0x74, 0x65, 0x64, 0x48, 0x00, 0x52, 0x08, 0x73, 0x65, 0x6c,
	0x65, 0x63, 0x74, 0x65, 0x64, 0x12, 0x34, 0x0a, 0x0a, 0x64, 0x65, 0x76, 0x69, 0x63, 0x65, 0x4c,
	0x6f, 0x73, 0x74, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x12, 0x2e, 0x44, 0x65, 0x76, 0x69,
	0x63, 0x65, 0x4c, 0x6f, 0x73, 0x74, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x48, 0x00, 0x52,
	0x0a, 0x64, 0x65, 0x76, 0x69, 0x63, 0x65, 0x4c, 0x6f, 0x73, 0x74, 0x12, 0x31, 0x0a, 0x09, 0x6e,
	0x65, 0x77, 0x44, 0x65, 0x76, 0x69, 0x63, 0x65, 0x18, 0x03, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x11,
	0x2e, 0x4e, 0x65, 0x77, 0x44, 0x65, 0x76, 0x69, 0x63, 0x65, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67,
	0x65, 0x48, 0x00, 0x52, 0x09, 0x6e, 0x65, 0x77, 0x44, 0x65, 0x76, 0x69, 0x63, 0x65, 0x42, 0x09,
	0x0a, 0x07, 0x70, 0x61, 0x79, 0x6c, 0x6f, 0x61, 0x64, 0x22, 0x7f, 0x0a, 0x0d, 0x43, 0x6c, 0x69,
	0x65, 0x6e, 0x74, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x12, 0x37, 0x0a, 0x09, 0x64, 0x61,
	0x73, 0x68, 0x62, 0x6f, 0x61, 0x72, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x17, 0x2e,
	0x44, 0x61, 0x73, 0x68, 0x62, 0x6f, 0x61, 0x72, 0x64, 0x43, 0x6c, 0x69, 0x65, 0x6e, 0x74, 0x4d,
	0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x48, 0x00, 0x52, 0x09, 0x64, 0x61, 0x73, 0x68, 0x62, 0x6f,
	0x61, 0x72, 0x64, 0x12, 0x2a, 0x0a, 0x04, 0x6d, 0x61, 0x75, 0x73, 0x18, 0x02, 0x20, 0x01, 0x28,
	0x0b, 0x32, 0x14, 0x2e, 0x4d, 0x61, 0x75, 0x73, 0x49, 0x6e, 0x63, 0x6f, 0x6d, 0x69, 0x6e, 0x67,
	0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x48, 0x00, 0x52, 0x04, 0x6d, 0x61, 0x75, 0x73, 0x42,
	0x09, 0x0a, 0x07, 0x70, 0x61, 0x79, 0x6c, 0x6f, 0x61, 0x64, 0x22, 0x7f, 0x0a, 0x0d, 0x53, 0x65,
	0x72, 0x76, 0x65, 0x72, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x12, 0x2a, 0x0a, 0x04, 0x6d,
	0x61, 0x75, 0x73, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x14, 0x2e, 0x4d, 0x61, 0x75, 0x73,
	0x4f, 0x75, 0x74, 0x67, 0x6f, 0x69, 0x6e, 0x67, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x48,
	0x00, 0x52, 0x04, 0x6d, 0x61, 0x75, 0x73, 0x12, 0x37, 0x0a, 0x09, 0x64, 0x61, 0x73, 0x68, 0x62,
	0x6f, 0x61, 0x72, 0x64, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x17, 0x2e, 0x44, 0x61, 0x73,
	0x68, 0x62, 0x6f, 0x61, 0x72, 0x64, 0x53, 0x65, 0x72, 0x76, 0x65, 0x72, 0x4d, 0x65, 0x73, 0x73,
	0x61, 0x67, 0x65, 0x48, 0x00, 0x52, 0x09, 0x64, 0x61, 0x73, 0x68, 0x62, 0x6f, 0x61, 0x72, 0x64,
	0x42, 0x09, 0x0a, 0x07, 0x70, 0x61, 0x79, 0x6c, 0x6f, 0x61, 0x64, 0x42, 0x09, 0x5a, 0x07, 0x2e,
	0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_dashboard_proto_rawDescOnce sync.Once
	file_dashboard_proto_rawDescData = file_dashboard_proto_rawDesc
)

func file_dashboard_proto_rawDescGZIP() []byte {
	file_dashboard_proto_rawDescOnce.Do(func() {
		file_dashboard_proto_rawDescData = protoimpl.X.CompressGZIP(file_dashboard_proto_rawDescData)
	})
	return file_dashboard_proto_rawDescData
}

var file_dashboard_proto_msgTypes = make([]protoimpl.MessageInfo, 8)
var file_dashboard_proto_goTypes = []interface{}{
	(*SelectDeviceClientMessage)(nil), // 0: SelectDeviceClientMessage
	(*DashboardClientMessage)(nil),    // 1: DashboardClientMessage
	(*DeviceSelected)(nil),            // 2: DeviceSelected
	(*DeviceLostMessage)(nil),         // 3: DeviceLostMessage
	(*NewDeviceMessage)(nil),          // 4: NewDeviceMessage
	(*DashboardServerMessage)(nil),    // 5: DashboardServerMessage
	(*ClientMessage)(nil),             // 6: ClientMessage
	(*ServerMessage)(nil),             // 7: ServerMessage
	(*MausIncomingMessage)(nil),       // 8: MausIncomingMessage
	(*MausOutgoingMessage)(nil),       // 9: MausOutgoingMessage
}
var file_dashboard_proto_depIdxs = []int32{
	0, // 0: DashboardClientMessage.selectDevice:type_name -> SelectDeviceClientMessage
	2, // 1: DashboardServerMessage.selected:type_name -> DeviceSelected
	3, // 2: DashboardServerMessage.deviceLost:type_name -> DeviceLostMessage
	4, // 3: DashboardServerMessage.newDevice:type_name -> NewDeviceMessage
	1, // 4: ClientMessage.dashboard:type_name -> DashboardClientMessage
	8, // 5: ClientMessage.maus:type_name -> MausIncomingMessage
	9, // 6: ServerMessage.maus:type_name -> MausOutgoingMessage
	5, // 7: ServerMessage.dashboard:type_name -> DashboardServerMessage
	8, // [8:8] is the sub-list for method output_type
	8, // [8:8] is the sub-list for method input_type
	8, // [8:8] is the sub-list for extension type_name
	8, // [8:8] is the sub-list for extension extendee
	0, // [0:8] is the sub-list for field type_name
}

func init() { file_dashboard_proto_init() }
func file_dashboard_proto_init() {
	if File_dashboard_proto != nil {
		return
	}
	file_message_proto_init()
	if !protoimpl.UnsafeEnabled {
		file_dashboard_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*SelectDeviceClientMessage); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_dashboard_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*DashboardClientMessage); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_dashboard_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*DeviceSelected); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_dashboard_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*DeviceLostMessage); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_dashboard_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*NewDeviceMessage); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_dashboard_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*DashboardServerMessage); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_dashboard_proto_msgTypes[6].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ClientMessage); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_dashboard_proto_msgTypes[7].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ServerMessage); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	file_dashboard_proto_msgTypes[1].OneofWrappers = []interface{}{
		(*DashboardClientMessage_SelectDevice)(nil),
	}
	file_dashboard_proto_msgTypes[5].OneofWrappers = []interface{}{
		(*DashboardServerMessage_Selected)(nil),
		(*DashboardServerMessage_DeviceLost)(nil),
		(*DashboardServerMessage_NewDevice)(nil),
	}
	file_dashboard_proto_msgTypes[6].OneofWrappers = []interface{}{
		(*ClientMessage_Dashboard)(nil),
		(*ClientMessage_Maus)(nil),
	}
	file_dashboard_proto_msgTypes[7].OneofWrappers = []interface{}{
		(*ServerMessage_Maus)(nil),
		(*ServerMessage_Dashboard)(nil),
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_dashboard_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   8,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_dashboard_proto_goTypes,
		DependencyIndexes: file_dashboard_proto_depIdxs,
		MessageInfos:      file_dashboard_proto_msgTypes,
	}.Build()
	File_dashboard_proto = out.File
	file_dashboard_proto_rawDesc = nil
	file_dashboard_proto_goTypes = nil
	file_dashboard_proto_depIdxs = nil
}