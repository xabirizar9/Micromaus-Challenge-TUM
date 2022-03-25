// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.27.1
// 	protoc        v3.19.4
// source: message.proto

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

type MsgType int32

const (
	MsgType_Init       MsgType = 0
	MsgType_SensorData MsgType = 1
	MsgType_Control    MsgType = 2
)

// Enum value maps for MsgType.
var (
	MsgType_name = map[int32]string{
		0: "Init",
		1: "SensorData",
		2: "Control",
	}
	MsgType_value = map[string]int32{
		"Init":       0,
		"SensorData": 1,
		"Control":    2,
	}
)

func (x MsgType) Enum() *MsgType {
	p := new(MsgType)
	*p = x
	return p
}

func (x MsgType) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (MsgType) Descriptor() protoreflect.EnumDescriptor {
	return file_message_proto_enumTypes[0].Descriptor()
}

func (MsgType) Type() protoreflect.EnumType {
	return &file_message_proto_enumTypes[0]
}

func (x MsgType) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use MsgType.Descriptor instead.
func (MsgType) EnumDescriptor() ([]byte, []int) {
	return file_message_proto_rawDescGZIP(), []int{0}
}

type AckPacket struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *AckPacket) Reset() {
	*x = AckPacket{}
	if protoimpl.UnsafeEnabled {
		mi := &file_message_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *AckPacket) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*AckPacket) ProtoMessage() {}

func (x *AckPacket) ProtoReflect() protoreflect.Message {
	mi := &file_message_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use AckPacket.ProtoReflect.Descriptor instead.
func (*AckPacket) Descriptor() ([]byte, []int) {
	return file_message_proto_rawDescGZIP(), []int{0}
}

type Position struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	X       float32 `protobuf:"fixed32,1,opt,name=x,proto3" json:"x,omitempty"`
	Y       float32 `protobuf:"fixed32,2,opt,name=y,proto3" json:"y,omitempty"`
	Heading float32 `protobuf:"fixed32,3,opt,name=heading,proto3" json:"heading,omitempty"`
}

func (x *Position) Reset() {
	*x = Position{}
	if protoimpl.UnsafeEnabled {
		mi := &file_message_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Position) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Position) ProtoMessage() {}

func (x *Position) ProtoReflect() protoreflect.Message {
	mi := &file_message_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Position.ProtoReflect.Descriptor instead.
func (*Position) Descriptor() ([]byte, []int) {
	return file_message_proto_rawDescGZIP(), []int{1}
}

func (x *Position) GetX() float32 {
	if x != nil {
		return x.X
	}
	return 0
}

func (x *Position) GetY() float32 {
	if x != nil {
		return x.Y
	}
	return 0
}

func (x *Position) GetHeading() float32 {
	if x != nil {
		return x.Heading
	}
	return 0
}

type PongPacket struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *PongPacket) Reset() {
	*x = PongPacket{}
	if protoimpl.UnsafeEnabled {
		mi := &file_message_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *PongPacket) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*PongPacket) ProtoMessage() {}

func (x *PongPacket) ProtoReflect() protoreflect.Message {
	mi := &file_message_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use PongPacket.ProtoReflect.Descriptor instead.
func (*PongPacket) Descriptor() ([]byte, []int) {
	return file_message_proto_rawDescGZIP(), []int{2}
}

type SensorPacket struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Left  float32 `protobuf:"fixed32,1,opt,name=left,proto3" json:"left,omitempty"`
	Front float32 `protobuf:"fixed32,2,opt,name=front,proto3" json:"front,omitempty"`
	Right float32 `protobuf:"fixed32,3,opt,name=right,proto3" json:"right,omitempty"`
}

func (x *SensorPacket) Reset() {
	*x = SensorPacket{}
	if protoimpl.UnsafeEnabled {
		mi := &file_message_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *SensorPacket) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*SensorPacket) ProtoMessage() {}

func (x *SensorPacket) ProtoReflect() protoreflect.Message {
	mi := &file_message_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use SensorPacket.ProtoReflect.Descriptor instead.
func (*SensorPacket) Descriptor() ([]byte, []int) {
	return file_message_proto_rawDescGZIP(), []int{3}
}

func (x *SensorPacket) GetLeft() float32 {
	if x != nil {
		return x.Left
	}
	return 0
}

func (x *SensorPacket) GetFront() float32 {
	if x != nil {
		return x.Front
	}
	return 0
}

func (x *SensorPacket) GetRight() float32 {
	if x != nil {
		return x.Right
	}
	return 0
}

type NavigationPacket struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Sensors           *SensorPacket `protobuf:"bytes,1,opt,name=sensors,proto3" json:"sensors,omitempty"`
	Position          *Position     `protobuf:"bytes,2,opt,name=position,proto3" json:"position,omitempty"`
	LeftMotorSpeed    float32       `protobuf:"fixed32,3,opt,name=leftMotorSpeed,proto3" json:"leftMotorSpeed,omitempty"`
	RightMotorSpeed   float32       `protobuf:"fixed32,4,opt,name=rightMotorSpeed,proto3" json:"rightMotorSpeed,omitempty"`
	LeftEncoderTotal  int32         `protobuf:"varint,5,opt,name=leftEncoderTotal,proto3" json:"leftEncoderTotal,omitempty"`
	RightEncoderTotal int32         `protobuf:"varint,6,opt,name=rightEncoderTotal,proto3" json:"rightEncoderTotal,omitempty"`
	Voltage           float32       `protobuf:"fixed32,7,opt,name=voltage,proto3" json:"voltage,omitempty"`
	BatPercentage     float32       `protobuf:"fixed32,8,opt,name=batPercentage,proto3" json:"batPercentage,omitempty"`
	Timestamp         uint32        `protobuf:"varint,9,opt,name=timestamp,proto3" json:"timestamp,omitempty"`
}

func (x *NavigationPacket) Reset() {
	*x = NavigationPacket{}
	if protoimpl.UnsafeEnabled {
		mi := &file_message_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *NavigationPacket) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*NavigationPacket) ProtoMessage() {}

func (x *NavigationPacket) ProtoReflect() protoreflect.Message {
	mi := &file_message_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use NavigationPacket.ProtoReflect.Descriptor instead.
func (*NavigationPacket) Descriptor() ([]byte, []int) {
	return file_message_proto_rawDescGZIP(), []int{4}
}

func (x *NavigationPacket) GetSensors() *SensorPacket {
	if x != nil {
		return x.Sensors
	}
	return nil
}

func (x *NavigationPacket) GetPosition() *Position {
	if x != nil {
		return x.Position
	}
	return nil
}

func (x *NavigationPacket) GetLeftMotorSpeed() float32 {
	if x != nil {
		return x.LeftMotorSpeed
	}
	return 0
}

func (x *NavigationPacket) GetRightMotorSpeed() float32 {
	if x != nil {
		return x.RightMotorSpeed
	}
	return 0
}

func (x *NavigationPacket) GetLeftEncoderTotal() int32 {
	if x != nil {
		return x.LeftEncoderTotal
	}
	return 0
}

func (x *NavigationPacket) GetRightEncoderTotal() int32 {
	if x != nil {
		return x.RightEncoderTotal
	}
	return 0
}

func (x *NavigationPacket) GetVoltage() float32 {
	if x != nil {
		return x.Voltage
	}
	return 0
}

func (x *NavigationPacket) GetBatPercentage() float32 {
	if x != nil {
		return x.BatPercentage
	}
	return 0
}

func (x *NavigationPacket) GetTimestamp() uint32 {
	if x != nil {
		return x.Timestamp
	}
	return 0
}

type MausOutgoingMessage struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// Types that are assignable to Payload:
	//	*MausOutgoingMessage_Ack
	//	*MausOutgoingMessage_Nav
	//	*MausOutgoingMessage_Pong
	Payload isMausOutgoingMessage_Payload `protobuf_oneof:"payload"`
}

func (x *MausOutgoingMessage) Reset() {
	*x = MausOutgoingMessage{}
	if protoimpl.UnsafeEnabled {
		mi := &file_message_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *MausOutgoingMessage) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*MausOutgoingMessage) ProtoMessage() {}

func (x *MausOutgoingMessage) ProtoReflect() protoreflect.Message {
	mi := &file_message_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use MausOutgoingMessage.ProtoReflect.Descriptor instead.
func (*MausOutgoingMessage) Descriptor() ([]byte, []int) {
	return file_message_proto_rawDescGZIP(), []int{5}
}

func (m *MausOutgoingMessage) GetPayload() isMausOutgoingMessage_Payload {
	if m != nil {
		return m.Payload
	}
	return nil
}

func (x *MausOutgoingMessage) GetAck() *AckPacket {
	if x, ok := x.GetPayload().(*MausOutgoingMessage_Ack); ok {
		return x.Ack
	}
	return nil
}

func (x *MausOutgoingMessage) GetNav() *NavigationPacket {
	if x, ok := x.GetPayload().(*MausOutgoingMessage_Nav); ok {
		return x.Nav
	}
	return nil
}

func (x *MausOutgoingMessage) GetPong() *PongPacket {
	if x, ok := x.GetPayload().(*MausOutgoingMessage_Pong); ok {
		return x.Pong
	}
	return nil
}

type isMausOutgoingMessage_Payload interface {
	isMausOutgoingMessage_Payload()
}

type MausOutgoingMessage_Ack struct {
	Ack *AckPacket `protobuf:"bytes,1,opt,name=ack,proto3,oneof"`
}

type MausOutgoingMessage_Nav struct {
	Nav *NavigationPacket `protobuf:"bytes,2,opt,name=nav,proto3,oneof"`
}

type MausOutgoingMessage_Pong struct {
	Pong *PongPacket `protobuf:"bytes,3,opt,name=pong,proto3,oneof"`
}

func (*MausOutgoingMessage_Ack) isMausOutgoingMessage_Payload() {}

func (*MausOutgoingMessage_Nav) isMausOutgoingMessage_Payload() {}

func (*MausOutgoingMessage_Pong) isMausOutgoingMessage_Payload() {}

// command indicates remote client connection
type MsgInit struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Version int32 `protobuf:"varint,1,opt,name=version,proto3" json:"version,omitempty"`
}

func (x *MsgInit) Reset() {
	*x = MsgInit{}
	if protoimpl.UnsafeEnabled {
		mi := &file_message_proto_msgTypes[6]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *MsgInit) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*MsgInit) ProtoMessage() {}

func (x *MsgInit) ProtoReflect() protoreflect.Message {
	mi := &file_message_proto_msgTypes[6]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use MsgInit.ProtoReflect.Descriptor instead.
func (*MsgInit) Descriptor() ([]byte, []int) {
	return file_message_proto_rawDescGZIP(), []int{6}
}

func (x *MsgInit) GetVersion() int32 {
	if x != nil {
		return x.Version
	}
	return 0
}

type MsgPing struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *MsgPing) Reset() {
	*x = MsgPing{}
	if protoimpl.UnsafeEnabled {
		mi := &file_message_proto_msgTypes[7]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *MsgPing) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*MsgPing) ProtoMessage() {}

func (x *MsgPing) ProtoReflect() protoreflect.Message {
	mi := &file_message_proto_msgTypes[7]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use MsgPing.ProtoReflect.Descriptor instead.
func (*MsgPing) Descriptor() ([]byte, []int) {
	return file_message_proto_rawDescGZIP(), []int{7}
}

type MsgControl struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Direction float32 `protobuf:"fixed32,1,opt,name=direction,proto3" json:"direction,omitempty"`
	Speed     int32   `protobuf:"varint,2,opt,name=speed,proto3" json:"speed,omitempty"`
}

func (x *MsgControl) Reset() {
	*x = MsgControl{}
	if protoimpl.UnsafeEnabled {
		mi := &file_message_proto_msgTypes[8]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *MsgControl) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*MsgControl) ProtoMessage() {}

func (x *MsgControl) ProtoReflect() protoreflect.Message {
	mi := &file_message_proto_msgTypes[8]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use MsgControl.ProtoReflect.Descriptor instead.
func (*MsgControl) Descriptor() ([]byte, []int) {
	return file_message_proto_rawDescGZIP(), []int{8}
}

func (x *MsgControl) GetDirection() float32 {
	if x != nil {
		return x.Direction
	}
	return 0
}

func (x *MsgControl) GetSpeed() int32 {
	if x != nil {
		return x.Speed
	}
	return 0
}

type MsgTurn struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Degree float32 `protobuf:"fixed32,1,opt,name=degree,proto3" json:"degree,omitempty"`
	Speed  int32   `protobuf:"varint,2,opt,name=speed,proto3" json:"speed,omitempty"`
}

func (x *MsgTurn) Reset() {
	*x = MsgTurn{}
	if protoimpl.UnsafeEnabled {
		mi := &file_message_proto_msgTypes[9]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *MsgTurn) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*MsgTurn) ProtoMessage() {}

func (x *MsgTurn) ProtoReflect() protoreflect.Message {
	mi := &file_message_proto_msgTypes[9]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use MsgTurn.ProtoReflect.Descriptor instead.
func (*MsgTurn) Descriptor() ([]byte, []int) {
	return file_message_proto_rawDescGZIP(), []int{9}
}

func (x *MsgTurn) GetDegree() float32 {
	if x != nil {
		return x.Degree
	}
	return 0
}

func (x *MsgTurn) GetSpeed() int32 {
	if x != nil {
		return x.Speed
	}
	return 0
}

type MsgDrive struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Distance int32 `protobuf:"varint,1,opt,name=distance,proto3" json:"distance,omitempty"`
	Speed    int32 `protobuf:"varint,2,opt,name=speed,proto3" json:"speed,omitempty"`
}

func (x *MsgDrive) Reset() {
	*x = MsgDrive{}
	if protoimpl.UnsafeEnabled {
		mi := &file_message_proto_msgTypes[10]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *MsgDrive) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*MsgDrive) ProtoMessage() {}

func (x *MsgDrive) ProtoReflect() protoreflect.Message {
	mi := &file_message_proto_msgTypes[10]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use MsgDrive.ProtoReflect.Descriptor instead.
func (*MsgDrive) Descriptor() ([]byte, []int) {
	return file_message_proto_rawDescGZIP(), []int{10}
}

func (x *MsgDrive) GetDistance() int32 {
	if x != nil {
		return x.Distance
	}
	return 0
}

func (x *MsgDrive) GetSpeed() int32 {
	if x != nil {
		return x.Speed
	}
	return 0
}

type MsgStop struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *MsgStop) Reset() {
	*x = MsgStop{}
	if protoimpl.UnsafeEnabled {
		mi := &file_message_proto_msgTypes[11]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *MsgStop) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*MsgStop) ProtoMessage() {}

func (x *MsgStop) ProtoReflect() protoreflect.Message {
	mi := &file_message_proto_msgTypes[11]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use MsgStop.ProtoReflect.Descriptor instead.
func (*MsgStop) Descriptor() ([]byte, []int) {
	return file_message_proto_rawDescGZIP(), []int{11}
}

type MsgEncoderCallibration struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	KP float32 `protobuf:"fixed32,1,opt,name=kP,proto3" json:"kP,omitempty"`
	KI float32 `protobuf:"fixed32,2,opt,name=kI,proto3" json:"kI,omitempty"`
	KD float32 `protobuf:"fixed32,3,opt,name=kD,proto3" json:"kD,omitempty"`
}

func (x *MsgEncoderCallibration) Reset() {
	*x = MsgEncoderCallibration{}
	if protoimpl.UnsafeEnabled {
		mi := &file_message_proto_msgTypes[12]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *MsgEncoderCallibration) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*MsgEncoderCallibration) ProtoMessage() {}

func (x *MsgEncoderCallibration) ProtoReflect() protoreflect.Message {
	mi := &file_message_proto_msgTypes[12]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use MsgEncoderCallibration.ProtoReflect.Descriptor instead.
func (*MsgEncoderCallibration) Descriptor() ([]byte, []int) {
	return file_message_proto_rawDescGZIP(), []int{12}
}

func (x *MsgEncoderCallibration) GetKP() float32 {
	if x != nil {
		return x.KP
	}
	return 0
}

func (x *MsgEncoderCallibration) GetKI() float32 {
	if x != nil {
		return x.KI
	}
	return 0
}

func (x *MsgEncoderCallibration) GetKD() float32 {
	if x != nil {
		return x.KD
	}
	return 0
}

type MausIncomingMessage struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// Types that are assignable to Payload:
	//	*MausIncomingMessage_Init
	//	*MausIncomingMessage_Control
	//	*MausIncomingMessage_EncoderCallibration
	//	*MausIncomingMessage_Ping
	//	*MausIncomingMessage_Turn
	//	*MausIncomingMessage_Stop
	//	*MausIncomingMessage_Drive
	Payload isMausIncomingMessage_Payload `protobuf_oneof:"payload"`
}

func (x *MausIncomingMessage) Reset() {
	*x = MausIncomingMessage{}
	if protoimpl.UnsafeEnabled {
		mi := &file_message_proto_msgTypes[13]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *MausIncomingMessage) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*MausIncomingMessage) ProtoMessage() {}

func (x *MausIncomingMessage) ProtoReflect() protoreflect.Message {
	mi := &file_message_proto_msgTypes[13]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use MausIncomingMessage.ProtoReflect.Descriptor instead.
func (*MausIncomingMessage) Descriptor() ([]byte, []int) {
	return file_message_proto_rawDescGZIP(), []int{13}
}

func (m *MausIncomingMessage) GetPayload() isMausIncomingMessage_Payload {
	if m != nil {
		return m.Payload
	}
	return nil
}

func (x *MausIncomingMessage) GetInit() *MsgInit {
	if x, ok := x.GetPayload().(*MausIncomingMessage_Init); ok {
		return x.Init
	}
	return nil
}

func (x *MausIncomingMessage) GetControl() *MsgControl {
	if x, ok := x.GetPayload().(*MausIncomingMessage_Control); ok {
		return x.Control
	}
	return nil
}

func (x *MausIncomingMessage) GetEncoderCallibration() *MsgEncoderCallibration {
	if x, ok := x.GetPayload().(*MausIncomingMessage_EncoderCallibration); ok {
		return x.EncoderCallibration
	}
	return nil
}

func (x *MausIncomingMessage) GetPing() *MsgPing {
	if x, ok := x.GetPayload().(*MausIncomingMessage_Ping); ok {
		return x.Ping
	}
	return nil
}

func (x *MausIncomingMessage) GetTurn() *MsgTurn {
	if x, ok := x.GetPayload().(*MausIncomingMessage_Turn); ok {
		return x.Turn
	}
	return nil
}

func (x *MausIncomingMessage) GetStop() *MsgStop {
	if x, ok := x.GetPayload().(*MausIncomingMessage_Stop); ok {
		return x.Stop
	}
	return nil
}

func (x *MausIncomingMessage) GetDrive() *MsgDrive {
	if x, ok := x.GetPayload().(*MausIncomingMessage_Drive); ok {
		return x.Drive
	}
	return nil
}

type isMausIncomingMessage_Payload interface {
	isMausIncomingMessage_Payload()
}

type MausIncomingMessage_Init struct {
	Init *MsgInit `protobuf:"bytes,2,opt,name=init,proto3,oneof"`
}

type MausIncomingMessage_Control struct {
	Control *MsgControl `protobuf:"bytes,3,opt,name=control,proto3,oneof"`
}

type MausIncomingMessage_EncoderCallibration struct {
	EncoderCallibration *MsgEncoderCallibration `protobuf:"bytes,4,opt,name=encoderCallibration,proto3,oneof"`
}

type MausIncomingMessage_Ping struct {
	Ping *MsgPing `protobuf:"bytes,5,opt,name=ping,proto3,oneof"`
}

type MausIncomingMessage_Turn struct {
	Turn *MsgTurn `protobuf:"bytes,6,opt,name=turn,proto3,oneof"`
}

type MausIncomingMessage_Stop struct {
	Stop *MsgStop `protobuf:"bytes,7,opt,name=stop,proto3,oneof"`
}

type MausIncomingMessage_Drive struct {
	Drive *MsgDrive `protobuf:"bytes,8,opt,name=drive,proto3,oneof"`
}

func (*MausIncomingMessage_Init) isMausIncomingMessage_Payload() {}

func (*MausIncomingMessage_Control) isMausIncomingMessage_Payload() {}

func (*MausIncomingMessage_EncoderCallibration) isMausIncomingMessage_Payload() {}

func (*MausIncomingMessage_Ping) isMausIncomingMessage_Payload() {}

func (*MausIncomingMessage_Turn) isMausIncomingMessage_Payload() {}

func (*MausIncomingMessage_Stop) isMausIncomingMessage_Payload() {}

func (*MausIncomingMessage_Drive) isMausIncomingMessage_Payload() {}

var File_message_proto protoreflect.FileDescriptor

var file_message_proto_rawDesc = []byte{
	0x0a, 0x0d, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x22,
	0x0b, 0x0a, 0x09, 0x41, 0x63, 0x6b, 0x50, 0x61, 0x63, 0x6b, 0x65, 0x74, 0x22, 0x40, 0x0a, 0x08,
	0x50, 0x6f, 0x73, 0x69, 0x74, 0x69, 0x6f, 0x6e, 0x12, 0x0c, 0x0a, 0x01, 0x78, 0x18, 0x01, 0x20,
	0x01, 0x28, 0x02, 0x52, 0x01, 0x78, 0x12, 0x0c, 0x0a, 0x01, 0x79, 0x18, 0x02, 0x20, 0x01, 0x28,
	0x02, 0x52, 0x01, 0x79, 0x12, 0x18, 0x0a, 0x07, 0x68, 0x65, 0x61, 0x64, 0x69, 0x6e, 0x67, 0x18,
	0x03, 0x20, 0x01, 0x28, 0x02, 0x52, 0x07, 0x68, 0x65, 0x61, 0x64, 0x69, 0x6e, 0x67, 0x22, 0x0c,
	0x0a, 0x0a, 0x50, 0x6f, 0x6e, 0x67, 0x50, 0x61, 0x63, 0x6b, 0x65, 0x74, 0x22, 0x4e, 0x0a, 0x0c,
	0x53, 0x65, 0x6e, 0x73, 0x6f, 0x72, 0x50, 0x61, 0x63, 0x6b, 0x65, 0x74, 0x12, 0x12, 0x0a, 0x04,
	0x6c, 0x65, 0x66, 0x74, 0x18, 0x01, 0x20, 0x01, 0x28, 0x02, 0x52, 0x04, 0x6c, 0x65, 0x66, 0x74,
	0x12, 0x14, 0x0a, 0x05, 0x66, 0x72, 0x6f, 0x6e, 0x74, 0x18, 0x02, 0x20, 0x01, 0x28, 0x02, 0x52,
	0x05, 0x66, 0x72, 0x6f, 0x6e, 0x74, 0x12, 0x14, 0x0a, 0x05, 0x72, 0x69, 0x67, 0x68, 0x74, 0x18,
	0x03, 0x20, 0x01, 0x28, 0x02, 0x52, 0x05, 0x72, 0x69, 0x67, 0x68, 0x74, 0x22, 0xec, 0x02, 0x0a,
	0x10, 0x4e, 0x61, 0x76, 0x69, 0x67, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x50, 0x61, 0x63, 0x6b, 0x65,
	0x74, 0x12, 0x27, 0x0a, 0x07, 0x73, 0x65, 0x6e, 0x73, 0x6f, 0x72, 0x73, 0x18, 0x01, 0x20, 0x01,
	0x28, 0x0b, 0x32, 0x0d, 0x2e, 0x53, 0x65, 0x6e, 0x73, 0x6f, 0x72, 0x50, 0x61, 0x63, 0x6b, 0x65,
	0x74, 0x52, 0x07, 0x73, 0x65, 0x6e, 0x73, 0x6f, 0x72, 0x73, 0x12, 0x25, 0x0a, 0x08, 0x70, 0x6f,
	0x73, 0x69, 0x74, 0x69, 0x6f, 0x6e, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x09, 0x2e, 0x50,
	0x6f, 0x73, 0x69, 0x74, 0x69, 0x6f, 0x6e, 0x52, 0x08, 0x70, 0x6f, 0x73, 0x69, 0x74, 0x69, 0x6f,
	0x6e, 0x12, 0x26, 0x0a, 0x0e, 0x6c, 0x65, 0x66, 0x74, 0x4d, 0x6f, 0x74, 0x6f, 0x72, 0x53, 0x70,
	0x65, 0x65, 0x64, 0x18, 0x03, 0x20, 0x01, 0x28, 0x02, 0x52, 0x0e, 0x6c, 0x65, 0x66, 0x74, 0x4d,
	0x6f, 0x74, 0x6f, 0x72, 0x53, 0x70, 0x65, 0x65, 0x64, 0x12, 0x28, 0x0a, 0x0f, 0x72, 0x69, 0x67,
	0x68, 0x74, 0x4d, 0x6f, 0x74, 0x6f, 0x72, 0x53, 0x70, 0x65, 0x65, 0x64, 0x18, 0x04, 0x20, 0x01,
	0x28, 0x02, 0x52, 0x0f, 0x72, 0x69, 0x67, 0x68, 0x74, 0x4d, 0x6f, 0x74, 0x6f, 0x72, 0x53, 0x70,
	0x65, 0x65, 0x64, 0x12, 0x2a, 0x0a, 0x10, 0x6c, 0x65, 0x66, 0x74, 0x45, 0x6e, 0x63, 0x6f, 0x64,
	0x65, 0x72, 0x54, 0x6f, 0x74, 0x61, 0x6c, 0x18, 0x05, 0x20, 0x01, 0x28, 0x05, 0x52, 0x10, 0x6c,
	0x65, 0x66, 0x74, 0x45, 0x6e, 0x63, 0x6f, 0x64, 0x65, 0x72, 0x54, 0x6f, 0x74, 0x61, 0x6c, 0x12,
	0x2c, 0x0a, 0x11, 0x72, 0x69, 0x67, 0x68, 0x74, 0x45, 0x6e, 0x63, 0x6f, 0x64, 0x65, 0x72, 0x54,
	0x6f, 0x74, 0x61, 0x6c, 0x18, 0x06, 0x20, 0x01, 0x28, 0x05, 0x52, 0x11, 0x72, 0x69, 0x67, 0x68,
	0x74, 0x45, 0x6e, 0x63, 0x6f, 0x64, 0x65, 0x72, 0x54, 0x6f, 0x74, 0x61, 0x6c, 0x12, 0x18, 0x0a,
	0x07, 0x76, 0x6f, 0x6c, 0x74, 0x61, 0x67, 0x65, 0x18, 0x07, 0x20, 0x01, 0x28, 0x02, 0x52, 0x07,
	0x76, 0x6f, 0x6c, 0x74, 0x61, 0x67, 0x65, 0x12, 0x24, 0x0a, 0x0d, 0x62, 0x61, 0x74, 0x50, 0x65,
	0x72, 0x63, 0x65, 0x6e, 0x74, 0x61, 0x67, 0x65, 0x18, 0x08, 0x20, 0x01, 0x28, 0x02, 0x52, 0x0d,
	0x62, 0x61, 0x74, 0x50, 0x65, 0x72, 0x63, 0x65, 0x6e, 0x74, 0x61, 0x67, 0x65, 0x12, 0x1c, 0x0a,
	0x09, 0x74, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x18, 0x09, 0x20, 0x01, 0x28, 0x0d,
	0x52, 0x09, 0x74, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x22, 0x8a, 0x01, 0x0a, 0x13,
	0x4d, 0x61, 0x75, 0x73, 0x4f, 0x75, 0x74, 0x67, 0x6f, 0x69, 0x6e, 0x67, 0x4d, 0x65, 0x73, 0x73,
	0x61, 0x67, 0x65, 0x12, 0x1e, 0x0a, 0x03, 0x61, 0x63, 0x6b, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b,
	0x32, 0x0a, 0x2e, 0x41, 0x63, 0x6b, 0x50, 0x61, 0x63, 0x6b, 0x65, 0x74, 0x48, 0x00, 0x52, 0x03,
	0x61, 0x63, 0x6b, 0x12, 0x25, 0x0a, 0x03, 0x6e, 0x61, 0x76, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b,
	0x32, 0x11, 0x2e, 0x4e, 0x61, 0x76, 0x69, 0x67, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x50, 0x61, 0x63,
	0x6b, 0x65, 0x74, 0x48, 0x00, 0x52, 0x03, 0x6e, 0x61, 0x76, 0x12, 0x21, 0x0a, 0x04, 0x70, 0x6f,
	0x6e, 0x67, 0x18, 0x03, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x0b, 0x2e, 0x50, 0x6f, 0x6e, 0x67, 0x50,
	0x61, 0x63, 0x6b, 0x65, 0x74, 0x48, 0x00, 0x52, 0x04, 0x70, 0x6f, 0x6e, 0x67, 0x42, 0x09, 0x0a,
	0x07, 0x70, 0x61, 0x79, 0x6c, 0x6f, 0x61, 0x64, 0x22, 0x23, 0x0a, 0x07, 0x4d, 0x73, 0x67, 0x49,
	0x6e, 0x69, 0x74, 0x12, 0x18, 0x0a, 0x07, 0x76, 0x65, 0x72, 0x73, 0x69, 0x6f, 0x6e, 0x18, 0x01,
	0x20, 0x01, 0x28, 0x05, 0x52, 0x07, 0x76, 0x65, 0x72, 0x73, 0x69, 0x6f, 0x6e, 0x22, 0x09, 0x0a,
	0x07, 0x4d, 0x73, 0x67, 0x50, 0x69, 0x6e, 0x67, 0x22, 0x40, 0x0a, 0x0a, 0x4d, 0x73, 0x67, 0x43,
	0x6f, 0x6e, 0x74, 0x72, 0x6f, 0x6c, 0x12, 0x1c, 0x0a, 0x09, 0x64, 0x69, 0x72, 0x65, 0x63, 0x74,
	0x69, 0x6f, 0x6e, 0x18, 0x01, 0x20, 0x01, 0x28, 0x02, 0x52, 0x09, 0x64, 0x69, 0x72, 0x65, 0x63,
	0x74, 0x69, 0x6f, 0x6e, 0x12, 0x14, 0x0a, 0x05, 0x73, 0x70, 0x65, 0x65, 0x64, 0x18, 0x02, 0x20,
	0x01, 0x28, 0x05, 0x52, 0x05, 0x73, 0x70, 0x65, 0x65, 0x64, 0x22, 0x37, 0x0a, 0x07, 0x4d, 0x73,
	0x67, 0x54, 0x75, 0x72, 0x6e, 0x12, 0x16, 0x0a, 0x06, 0x64, 0x65, 0x67, 0x72, 0x65, 0x65, 0x18,
	0x01, 0x20, 0x01, 0x28, 0x02, 0x52, 0x06, 0x64, 0x65, 0x67, 0x72, 0x65, 0x65, 0x12, 0x14, 0x0a,
	0x05, 0x73, 0x70, 0x65, 0x65, 0x64, 0x18, 0x02, 0x20, 0x01, 0x28, 0x05, 0x52, 0x05, 0x73, 0x70,
	0x65, 0x65, 0x64, 0x22, 0x3c, 0x0a, 0x08, 0x4d, 0x73, 0x67, 0x44, 0x72, 0x69, 0x76, 0x65, 0x12,
	0x1a, 0x0a, 0x08, 0x64, 0x69, 0x73, 0x74, 0x61, 0x6e, 0x63, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28,
	0x05, 0x52, 0x08, 0x64, 0x69, 0x73, 0x74, 0x61, 0x6e, 0x63, 0x65, 0x12, 0x14, 0x0a, 0x05, 0x73,
	0x70, 0x65, 0x65, 0x64, 0x18, 0x02, 0x20, 0x01, 0x28, 0x05, 0x52, 0x05, 0x73, 0x70, 0x65, 0x65,
	0x64, 0x22, 0x09, 0x0a, 0x07, 0x4d, 0x73, 0x67, 0x53, 0x74, 0x6f, 0x70, 0x22, 0x48, 0x0a, 0x16,
	0x4d, 0x73, 0x67, 0x45, 0x6e, 0x63, 0x6f, 0x64, 0x65, 0x72, 0x43, 0x61, 0x6c, 0x6c, 0x69, 0x62,
	0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x12, 0x0e, 0x0a, 0x02, 0x6b, 0x50, 0x18, 0x01, 0x20, 0x01,
	0x28, 0x02, 0x52, 0x02, 0x6b, 0x50, 0x12, 0x0e, 0x0a, 0x02, 0x6b, 0x49, 0x18, 0x02, 0x20, 0x01,
	0x28, 0x02, 0x52, 0x02, 0x6b, 0x49, 0x12, 0x0e, 0x0a, 0x02, 0x6b, 0x44, 0x18, 0x03, 0x20, 0x01,
	0x28, 0x02, 0x52, 0x02, 0x6b, 0x44, 0x22, 0xb9, 0x02, 0x0a, 0x13, 0x4d, 0x61, 0x75, 0x73, 0x49,
	0x6e, 0x63, 0x6f, 0x6d, 0x69, 0x6e, 0x67, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x12, 0x1e,
	0x0a, 0x04, 0x69, 0x6e, 0x69, 0x74, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x08, 0x2e, 0x4d,
	0x73, 0x67, 0x49, 0x6e, 0x69, 0x74, 0x48, 0x00, 0x52, 0x04, 0x69, 0x6e, 0x69, 0x74, 0x12, 0x27,
	0x0a, 0x07, 0x63, 0x6f, 0x6e, 0x74, 0x72, 0x6f, 0x6c, 0x18, 0x03, 0x20, 0x01, 0x28, 0x0b, 0x32,
	0x0b, 0x2e, 0x4d, 0x73, 0x67, 0x43, 0x6f, 0x6e, 0x74, 0x72, 0x6f, 0x6c, 0x48, 0x00, 0x52, 0x07,
	0x63, 0x6f, 0x6e, 0x74, 0x72, 0x6f, 0x6c, 0x12, 0x4b, 0x0a, 0x13, 0x65, 0x6e, 0x63, 0x6f, 0x64,
	0x65, 0x72, 0x43, 0x61, 0x6c, 0x6c, 0x69, 0x62, 0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x18, 0x04,
	0x20, 0x01, 0x28, 0x0b, 0x32, 0x17, 0x2e, 0x4d, 0x73, 0x67, 0x45, 0x6e, 0x63, 0x6f, 0x64, 0x65,
	0x72, 0x43, 0x61, 0x6c, 0x6c, 0x69, 0x62, 0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x48, 0x00, 0x52,
	0x13, 0x65, 0x6e, 0x63, 0x6f, 0x64, 0x65, 0x72, 0x43, 0x61, 0x6c, 0x6c, 0x69, 0x62, 0x72, 0x61,
	0x74, 0x69, 0x6f, 0x6e, 0x12, 0x1e, 0x0a, 0x04, 0x70, 0x69, 0x6e, 0x67, 0x18, 0x05, 0x20, 0x01,
	0x28, 0x0b, 0x32, 0x08, 0x2e, 0x4d, 0x73, 0x67, 0x50, 0x69, 0x6e, 0x67, 0x48, 0x00, 0x52, 0x04,
	0x70, 0x69, 0x6e, 0x67, 0x12, 0x1e, 0x0a, 0x04, 0x74, 0x75, 0x72, 0x6e, 0x18, 0x06, 0x20, 0x01,
	0x28, 0x0b, 0x32, 0x08, 0x2e, 0x4d, 0x73, 0x67, 0x54, 0x75, 0x72, 0x6e, 0x48, 0x00, 0x52, 0x04,
	0x74, 0x75, 0x72, 0x6e, 0x12, 0x1e, 0x0a, 0x04, 0x73, 0x74, 0x6f, 0x70, 0x18, 0x07, 0x20, 0x01,
	0x28, 0x0b, 0x32, 0x08, 0x2e, 0x4d, 0x73, 0x67, 0x53, 0x74, 0x6f, 0x70, 0x48, 0x00, 0x52, 0x04,
	0x73, 0x74, 0x6f, 0x70, 0x12, 0x21, 0x0a, 0x05, 0x64, 0x72, 0x69, 0x76, 0x65, 0x18, 0x08, 0x20,
	0x01, 0x28, 0x0b, 0x32, 0x09, 0x2e, 0x4d, 0x73, 0x67, 0x44, 0x72, 0x69, 0x76, 0x65, 0x48, 0x00,
	0x52, 0x05, 0x64, 0x72, 0x69, 0x76, 0x65, 0x42, 0x09, 0x0a, 0x07, 0x70, 0x61, 0x79, 0x6c, 0x6f,
	0x61, 0x64, 0x2a, 0x30, 0x0a, 0x07, 0x4d, 0x73, 0x67, 0x54, 0x79, 0x70, 0x65, 0x12, 0x08, 0x0a,
	0x04, 0x49, 0x6e, 0x69, 0x74, 0x10, 0x00, 0x12, 0x0e, 0x0a, 0x0a, 0x53, 0x65, 0x6e, 0x73, 0x6f,
	0x72, 0x44, 0x61, 0x74, 0x61, 0x10, 0x01, 0x12, 0x0b, 0x0a, 0x07, 0x43, 0x6f, 0x6e, 0x74, 0x72,
	0x6f, 0x6c, 0x10, 0x02, 0x42, 0x09, 0x5a, 0x07, 0x2e, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62,
	0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_message_proto_rawDescOnce sync.Once
	file_message_proto_rawDescData = file_message_proto_rawDesc
)

func file_message_proto_rawDescGZIP() []byte {
	file_message_proto_rawDescOnce.Do(func() {
		file_message_proto_rawDescData = protoimpl.X.CompressGZIP(file_message_proto_rawDescData)
	})
	return file_message_proto_rawDescData
}

var file_message_proto_enumTypes = make([]protoimpl.EnumInfo, 1)
var file_message_proto_msgTypes = make([]protoimpl.MessageInfo, 14)
var file_message_proto_goTypes = []interface{}{
	(MsgType)(0),                   // 0: MsgType
	(*AckPacket)(nil),              // 1: AckPacket
	(*Position)(nil),               // 2: Position
	(*PongPacket)(nil),             // 3: PongPacket
	(*SensorPacket)(nil),           // 4: SensorPacket
	(*NavigationPacket)(nil),       // 5: NavigationPacket
	(*MausOutgoingMessage)(nil),    // 6: MausOutgoingMessage
	(*MsgInit)(nil),                // 7: MsgInit
	(*MsgPing)(nil),                // 8: MsgPing
	(*MsgControl)(nil),             // 9: MsgControl
	(*MsgTurn)(nil),                // 10: MsgTurn
	(*MsgDrive)(nil),               // 11: MsgDrive
	(*MsgStop)(nil),                // 12: MsgStop
	(*MsgEncoderCallibration)(nil), // 13: MsgEncoderCallibration
	(*MausIncomingMessage)(nil),    // 14: MausIncomingMessage
}
var file_message_proto_depIdxs = []int32{
	4,  // 0: NavigationPacket.sensors:type_name -> SensorPacket
	2,  // 1: NavigationPacket.position:type_name -> Position
	1,  // 2: MausOutgoingMessage.ack:type_name -> AckPacket
	5,  // 3: MausOutgoingMessage.nav:type_name -> NavigationPacket
	3,  // 4: MausOutgoingMessage.pong:type_name -> PongPacket
	7,  // 5: MausIncomingMessage.init:type_name -> MsgInit
	9,  // 6: MausIncomingMessage.control:type_name -> MsgControl
	13, // 7: MausIncomingMessage.encoderCallibration:type_name -> MsgEncoderCallibration
	8,  // 8: MausIncomingMessage.ping:type_name -> MsgPing
	10, // 9: MausIncomingMessage.turn:type_name -> MsgTurn
	12, // 10: MausIncomingMessage.stop:type_name -> MsgStop
	11, // 11: MausIncomingMessage.drive:type_name -> MsgDrive
	12, // [12:12] is the sub-list for method output_type
	12, // [12:12] is the sub-list for method input_type
	12, // [12:12] is the sub-list for extension type_name
	12, // [12:12] is the sub-list for extension extendee
	0,  // [0:12] is the sub-list for field type_name
}

func init() { file_message_proto_init() }
func file_message_proto_init() {
	if File_message_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_message_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*AckPacket); i {
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
		file_message_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Position); i {
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
		file_message_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*PongPacket); i {
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
		file_message_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*SensorPacket); i {
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
		file_message_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*NavigationPacket); i {
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
		file_message_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*MausOutgoingMessage); i {
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
		file_message_proto_msgTypes[6].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*MsgInit); i {
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
		file_message_proto_msgTypes[7].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*MsgPing); i {
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
		file_message_proto_msgTypes[8].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*MsgControl); i {
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
		file_message_proto_msgTypes[9].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*MsgTurn); i {
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
		file_message_proto_msgTypes[10].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*MsgDrive); i {
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
		file_message_proto_msgTypes[11].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*MsgStop); i {
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
		file_message_proto_msgTypes[12].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*MsgEncoderCallibration); i {
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
		file_message_proto_msgTypes[13].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*MausIncomingMessage); i {
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
	file_message_proto_msgTypes[5].OneofWrappers = []interface{}{
		(*MausOutgoingMessage_Ack)(nil),
		(*MausOutgoingMessage_Nav)(nil),
		(*MausOutgoingMessage_Pong)(nil),
	}
	file_message_proto_msgTypes[13].OneofWrappers = []interface{}{
		(*MausIncomingMessage_Init)(nil),
		(*MausIncomingMessage_Control)(nil),
		(*MausIncomingMessage_EncoderCallibration)(nil),
		(*MausIncomingMessage_Ping)(nil),
		(*MausIncomingMessage_Turn)(nil),
		(*MausIncomingMessage_Stop)(nil),
		(*MausIncomingMessage_Drive)(nil),
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_message_proto_rawDesc,
			NumEnums:      1,
			NumMessages:   14,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_message_proto_goTypes,
		DependencyIndexes: file_message_proto_depIdxs,
		EnumInfos:         file_message_proto_enumTypes,
		MessageInfos:      file_message_proto_msgTypes,
	}.Build()
	File_message_proto = out.File
	file_message_proto_rawDesc = nil
	file_message_proto_goTypes = nil
	file_message_proto_depIdxs = nil
}
