# syntax=docker/dockerfile:1

FROM golang:1.16-alpine as build


WORKDIR /app

COPY go.mod ./
# COPY go.sum ./
RUN go mod download

COPY *.go ./
# CGO has to be disabled for alpine
ENV CGO_ENABLED=0
RUN go build -o /maus

##
## Deploy
##
FROM gcr.io/distroless/base-debian10

WORKDIR /

COPY --from=build /maus /maus

EXPOSE 8888/udp

USER nonroot:nonroot
# CGO has to be disabled for alpine
ENV CGO_ENABLED=0

ENTRYPOINT ["/maus"]