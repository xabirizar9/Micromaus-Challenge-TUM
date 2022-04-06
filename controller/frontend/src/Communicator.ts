import {
  MausConfigPacket,
  MausIncomingMessage,
  MausOutgoingMessage,
} from "./proto/message";
import { toast } from "@zerodevx/svelte-toast";
import * as toaster from "./utils/notifications";

export type CommunicatorOptions = {
  url: string | URL;
};

export class Communicator extends EventTarget {
  private socket?: WebSocket;

  public config?: MausConfigPacket;

  constructor(private options: CommunicatorOptions) {
    super();
    this.setupSocket(options);
  }

  send(message: Partial<MausIncomingMessage>) {
    const msg = MausIncomingMessage.encode(
      message as MausIncomingMessage
    ).finish();
    toaster.success(`CMD send: size=${msg.length}`);
    this.socket?.send(msg);
  }

  private setupSocket(options: CommunicatorOptions) {
    if (this.socket && this.socket.OPEN) {
      this.socket.close();
    }

    this.socket = new WebSocket(options.url);

    this.socket.onopen = () => {
      toaster.success(`connected to ${options.url}`);
      this.socket.binaryType = "arraybuffer";
    };

    this.socket.onerror = (error) => {
      toaster.error(`communication error`, {
        duration: 500,
      });
      console.error(error);
    };

    this.socket.onclose = () => {
      this.socket = undefined;
      toaster.error(`socket closed`, {
        duration: 500,
      });
      setTimeout(() => {
        toaster.info("reconnecting...");
        this.setupSocket(this.options);
      }, 2000);
    };

    this.socket.onmessage = (event) => {
      if (event.data instanceof ArrayBuffer) {
        // binary frame
        const message = MausOutgoingMessage.decode(new Uint8Array(event.data));

        if (message.mausConfig) {
          this.config = message.mausConfig;
        }

        if (message.mazeState) {
          console.log(message.mazeState);
        }

        this.dispatchEvent(new MessageEvent("message", { data: message }));
        // console.log(message.nav);
      } else {
        // text frame
        // console.log(event.data);
      }
    };
  }
}
