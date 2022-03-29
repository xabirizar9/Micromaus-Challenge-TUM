import { Communicator } from "./Communicator";
import * as toaster from "./utils/notifications";
export class Joystick {
  private gamepads: Record<number, Gamepad> = {};
  private loopIntervalHandle?: NodeJS.Timer | number;
  private internalSpeed: number = 0;
  private internalDirection: number = 0;

  constructor(private com: Communicator) {
    window.addEventListener(
      "gamepadconnected",
      (e) => {
        this.gamepadHandler(e, true);
      },
      false
    );
    window.addEventListener(
      "gamepaddisconnected",
      (e) => {
        this.gamepadHandler(e, false);
      },
      false
    );
    console.log("listening for gamepads");
  }

  gamepadHandler(event: GamepadEvent, connecting) {
    var gamepad = event.gamepad;

    toaster.info("Gamepad event for ID=" + event.gamepad.id);
    // Note:
    // gamepad === navigator.getGamepads()[gamepad.index]

    if (connecting) {
      this.gamepads[gamepad.index] = gamepad;
      this.startPolling();
    } else {
      delete this.gamepads[gamepad.index];
    }
  }

  startPolling() {
    if (this.loopIntervalHandle) {
      clearInterval(this.loopIntervalHandle as any);
    }
    this.loopIntervalHandle = setInterval(this.pollGamepad.bind(this), 100);
  }

  pollGamepad() {
    for (const gp of navigator.getGamepads()) {
      if (!gp) {
        continue;
      }

      const rt = gp.buttons[7].value;
      const lt = gp.buttons[6].value;
      const turbo = gp.buttons[0].value;
      const sign = Math.sign(gp.axes[0]);
      const newDirection =
        gp.axes[0] == 0
          ? 0
          : (4000 - Math.min(Math.abs(gp.axes[0]), 120) * 4000) * sign;
      const newSpeed = (rt ? 1 : lt ? -1 : 0) * (turbo ? 3000 : 500);

      if (
        newSpeed !== this.internalSpeed ||
        this.internalDirection !== newDirection
      ) {
        this.com.send({
          control: {
            speed: newSpeed,
            direction: -Math.round(newDirection),
          },
        });
        this.internalDirection = newDirection;
        this.internalSpeed = newSpeed;
      }
    }
  }
}
