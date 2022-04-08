#!/bin/bash

# gen nanopb files
python3 .pio/libdeps/esp32-s2-maus/Nanopb/generator/nanopb_generator.py proto/message.proto --strip-path
mv ./proto/message.pb.c ./src/message.pb.c
mv ./proto/message.pb.h ./include/message.pb.h

# gen go files
protoc -I=./proto/ --go_out=controller ./proto/message.proto
protoc -I=./proto/ --go_out=controller ./proto/dashboard.proto
