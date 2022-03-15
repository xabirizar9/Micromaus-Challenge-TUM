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

  function drawGrid(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    gap: number
  ) {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const y = 10 + (height + gap) * i;
        const x = 10 + (width + gap) * j;
        ctx.fillStyle = "#2c3e50";
        ctx.fillRect(x, y, width, height);
      }
    }
  }

  function CanvasEl(node: HTMLCanvasElement) {
    canvas = node;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    var ctx = canvas.getContext("2d");

    drawGrid(ctx, (width - 10) / 10 - 10, (height - 10) / 10 - 10, 10);

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
        ctx.strokeStyle = "#ffffff";
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
        ctx.fillStyle = "rgba(52, 200, 219, 0.3)";
        ctx.fill();
        ctx.closePath();
      }
    );
  }
</script>

<main>
  <canvas use:CanvasEl />
  <div>{coords}</div>
</main>

<style lang="scss">
  :global(html),
  :global(body) {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  :global(body) {
    --main-bg-secondary: #34495e;
    --main-bg-color: #2c3e50;
    --main-text-color: #eee;
    background-color: var(--main-bg-color);
    padding: 1rem;
    color: #eee;
  }

  main {
    background-color: var(--main-bg-color);
  }
  canvas {
    width: 90vw;
    height: 50vh;
    background-color: var(--main-bg-secondary);
    border-radius: 0.5rem;
  }
</style>
