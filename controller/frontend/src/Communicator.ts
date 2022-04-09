import {
  MausConfigPacket,
  MausIncomingMessage,
  MausOutgoingMessage,
} from "./proto/message";
import {
  ClientMessage,
  DashboardClientMessage,
  Maus,
  ServerMessage,
} from "./proto/dashboard";
import { toast } from "@zerodevx/svelte-toast";
import * as toaster from "./utils/notifications";

export type CommunicatorOptions = {
  url: string | URL;
};

export class Communicator extends EventTarget {
  private socket?: WebSocket;

  public selectedMouse?: Maus;

  public config?: MausConfigPacket;

  constructor(private options: CommunicatorOptions) {
    super();
    this.setupSocket(options);
  }

  connectToMaus(maus: Maus) {
    this.selectedMouse = maus;
    this.sendClientMsg({
      selectDevice: {
        deviceId: maus.id,
      },
    });
  }

  sendClientMsg(message: Partial<DashboardClientMessage>) {
    const msg = ClientMessage.encode({
      dashboard: message as DashboardClientMessage,
      maus: undefined,
    }).finish();

    toaster.success(`send client CMD: size=${msg.length}`);
    this.socket?.send(msg);
  }

  send(message: Partial<MausIncomingMessage>) {
    const msg = ClientMessage.encode({
      maus: message as MausIncomingMessage,
      dashboard: undefined,
    }).finish();
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

      // if a robot was selected send reconnect event
      if (this.selectedMouse) {
        this.connectToMaus(this.selectedMouse);
      }
    };

    this.socket.onerror = (error) => {
      toaster.error(`communication error`, {
        duration: 500,
      });
      console.error(error);
    };

    this.socket.onclose = (err) => {
      console.log(err);
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
      if (!(event.data instanceof ArrayBuffer)) {
        return;
      }
      // binary frame
      const { maus, dashboard } = ServerMessage.decode(
        new Uint8Array(event.data)
      );

      console.log(maus, dashboard);

      if (maus) {
        if (maus.mausConfig) {
          this.config = maus.mausConfig;
        }
        this.dispatchEvent(new MessageEvent("message", { data: maus }));
        return;
      }
      if (dashboard) {
        if (dashboard.selected) {
          console.log("selected", dashboard.selected);
          this.dispatchEvent(
            new MessageEvent("connected", { data: this.selectedMouse })
          );
          return;
        }
      } else {
        this.dispatchEvent(new MessageEvent("dashboard", { data: dashboard }));
      }
    };

    // console.log(message.nav);
  }
}
