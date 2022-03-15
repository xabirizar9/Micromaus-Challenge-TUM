import { MausOutgoingMessage } from "./proto/message";

export type CommunicatorOptions = {
  url: string | URL;
};

export class Communicator extends EventTarget {
  private socket?: WebSocket;

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

  constructor(options: CommunicatorOptions) {
    super();
    this.setupSocket(options);
  }
}
