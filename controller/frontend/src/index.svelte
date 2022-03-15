<script lang="ts">
  import { Communicator } from "./Communicator";
  import { MausOutgoingMessage } from "./proto/message";
  const com = new Communicator({
    url: "ws://localhost:8080/ws",
  });

  let canvas: HTMLCanvasElement;
  let lastCoords: [number, number] | false = false;
  $: coords = lastCoords
    ? `x: ${lastCoords[0]},y:${lastCoords[1]}`
    : "no coords recevied";

  function CanvasEl(node: HTMLCanvasElement) {
    canvas = node;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    var ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(0, 0);

    com.addEventListener(
      "message",
      (evt: MessageEvent<MausOutgoingMessage>) => {
        const x = (evt.data.nav.position.x + 2) * (width / 5);
        const y = (evt.data.nav.position.y + 2) * (height / 5);
        if (!lastCoords) {
          lastCoords = [x, y];
        }
        ctx.beginPath();
        ctx.strokeStyle = "#000000";
        ctx.moveTo(...lastCoords);
        ctx.lineTo(x, y);
        ctx.stroke();
        lastCoords = [x, y];

        ctx.beginPath();

        ctx.arc(
          x + evt.data.nav.sensors.left * (width / 20),
          y + evt.data.nav.sensors.left * (height / 20),
          14,
          0,
          2 * Math.PI,
          false
        );
        ctx.fillStyle = "rgba(52, 152, 219, 0.3)";
        ctx.fill();
        ctx.closePath();
      }
    );
  }
</script>

<div>
  <canvas use:CanvasEl />
  <div>{coords}</div>
</div>

<style>
  canvas {
    width: 80vw;
    height: 80vh;
  }
</style>
