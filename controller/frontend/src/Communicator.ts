import { MausOutgoingMessage } from "./proto/message";

export type CommunicatorOptions = {
  url: string | URL;
};

export class Communicator {
  private socket?: WebSocket;

  constructor(options: CommunicatorOptions) {
    this.socket = new WebSocket(options.url);

    this.socket.onopen = () => {
      console.log("Connected to server");
      const message = MausOutgoingMessage.fromPartial({
        packet: {
          left: 1,
          front: 2,
          right: 3,
        },
      });
      const buffer = MausOutgoingMessage.encode(message).finish();
      const test = MausOutgoingMessage.decode(buffer);
      console.log({ message, test });
      this.socket.send(buffer);
    };

    this.socket.onclose = () => {
      console.log("Closed");
    };

    this.socket.onmessage = (event) => {
      const message = MausOutgoingMessage.decode(event.data);
      console.log(message);
    };
  }
}
