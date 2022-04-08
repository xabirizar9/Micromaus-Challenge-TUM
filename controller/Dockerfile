# syntax=docker/dockerfile:1

FROM golang:1.16-buster AS build


WORKDIR /app

COPY go.mod ./
COPY go.sum ./
RUN go mod download


COPY *.go ./
COPY proto/*.go ./proto/
COPY remote/*.go ./remote/
# CGO has to be disabled for alpine
RUN go build -o /app/micromaus

##
## Deploy
##
FROM gcr.io/distroless/base-debian10

WORKDIR /

COPY --from=build /app/micromaus /micromaus
# copy frontend
COPY ./frontend/dist /frontend/dist
COPY ./config.yaml ./


# USER nonroot:nonroot
# USER nonroot:nonroot

ENTRYPOINT ["/micromaus"]