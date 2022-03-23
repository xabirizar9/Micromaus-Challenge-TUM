import { MausIncomingMessage, MausOutgoingMessage } from "./proto/message";

export type CommunicatorOptions = {
  url: string | URL;
};

export class Communicator extends EventTarget {
  private socket?: WebSocket;

  constructor(options: CommunicatorOptions) {
    super();
    this.setupSocket(options);
  }

  send(message: Partial<MausIncomingMessage>) {
    const msg = MausIncomingMessage.encode(
      message as MausIncomingMessage
    ).finish();
    console.log(message, msg);
    this.socket?.send(msg);
  }

  private setupSocket(options: CommunicatorOptions) {
    this.socket = new WebSocket(options.url);

    this.socket.onopen = () => {
      this.socket.binaryType = "arraybuffer";
    };

    this.socket.onclose = () => {
      console.log("Closed");
    };

    this.socket.onmessage = (event) => {
      if (event.data instanceof ArrayBuffer) {
        // binary frame
        const message = MausOutgoingMessage.decode(new Uint8Array(event.data));
        this.dispatchEvent(new MessageEvent("message", { data: message }));
        //console.log({ ...message.nav });
      } else {
        // text frame
        // console.log(event.data);
      }
    };
  }
}
