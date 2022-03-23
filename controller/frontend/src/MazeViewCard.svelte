<script lang="ts">
  import { Communicator } from "./Communicator";

  import { ConnectedScatterplot } from "./plot/ConnectedScatterplot";

  import { MausOutgoingMessage, NavigationPacket } from "./proto/message";
  import { drawGrid } from "./utils/canvas";
  import { mazeSize, Vector2D } from "./utils/geo";

  export let com: Communicator;

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let lastCoords: [number, number];

  const onNavPacket = (nav: NavigationPacket) => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    const x = (nav.position.x + 2) * (canvas.clientWidth / 5);
    const y = (nav.position.y + 2) * (canvas.clientHeight / 5);
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
      x + nav.sensors.left * (width / 20),
      y + nav.sensors.left * (height / 20),
      14,
      0,
      2 * Math.PI,
      false
    );
    ctx.fillStyle = "rgba(52, 200, 219, 0.3)";
    ctx.fill();
    ctx.closePath();
  };

  function CanvasEl(node: HTMLCanvasElement) {
    canvas = node;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    ctx = canvas.getContext("2d");
    const gap = 5;
    drawGrid(
      ctx,
      (width - gap) / mazeSize.width - gap,
      (height - gap) / mazeSize.height - gap,
      gap,
      mazeSize
    );

    ctx.beginPath();
    ctx.moveTo(0, 0);

    com.addEventListener(
      "message",
      (evt: MessageEvent<MausOutgoingMessage>) => {
        if (evt.data.nav) {
          onNavPacket(evt.data.nav);
        }
      }
    );
  }

  function RobotPath(node: HTMLElement) {
    const data: Vector2D[] = [
      {
        x: 0.5,
        y: 0,
      },
      {
        x: 0.55,
        y: 0.5,
      },
      {
        x: 0.49,
        y: 1,
      },
      {
        x: 0.6,
        y: 1.2,
      },
      {
        x: 1.6,
        y: 1.2,
      },
      {
        x: 2.6,
        y: 4.2,
      },

      {
        x: 6.0,
        y: 4.2,
      },
    ];
    const rect = node.getBoundingClientRect();
    let chart = ConnectedScatterplot(data, {
      x: (d) => d.x,
      y: (d) => d.y,
      title: (d) => d.year,
      orient: (d) => d.side,
      xDomain: [0, 6],
      yDomain: [0, 6],
      width: rect.width,
      height: rect.height,
      duration: 0, // for the intro animation; 0 to disable
    });
    node.appendChild(chart);
  }
</script>

<div class="card map">
  <canvas use:CanvasEl />
  <div use:RobotPath />
</div>

<style lang="scss">
  .map {
    padding: 0;
    position: relative;
    aspect-ratio: 1 / 1;

    > * {
      position: absolute;
      margin: 0.5rem;
      width: calc(100% - 1rem);
      height: calc(100% - 1rem);
    }
  }
</style>
