<script lang="ts">
  import { Communicator } from "./Communicator";

  import { ConnectedScatterplot } from "./plot/ConnectedScatterplot";

  import {
    MausOutgoingMessage,
    NavigationPacket,
    Position,
    SensorPacket,
  } from "./proto/message";
  import { drawGrid } from "./utils/canvas";
  import { mazeSize, Vector2D } from "./utils/geo";

  export let com: Communicator;

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  const data: Vector2D[] = [];

  const fromMmToUnits = (mm: number) => mm / 180 / 6;

  const fromUnitToMms = (unit: number) => unit * 180 * 6;

  const drawSensorDot = (nav: NavigationPacket, sensor: keyof SensorPacket) => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // discard sensor reading if out of range
    if (nav.sensors[sensor] < 1) {
      return;
    }

    const x = fromMmToUnits(nav.position.x) * width;
    const y = height - fromMmToUnits(nav.position.y) * height;

    ctx.beginPath();

    let sensorX = x;
    let sensorY = y;

    switch (sensor) {
      case "left":
        sensorX -= fromMmToUnits(nav.sensors.left) * canvas.clientWidth;
        break;
      case "right":
        sensorX += fromMmToUnits(nav.sensors.right) * canvas.clientWidth;
        break;
      case "front":
        sensorY -= fromMmToUnits(nav.sensors.front) * canvas.clientHeight;
        break;
    }

    ctx.arc(sensorX, sensorY, 2, 0, 2 * Math.PI, false);
    ctx.fillStyle = "rgba(52, 200, 219, 0.3)";
    ctx.fill();
    ctx.closePath();
  };

  const onNavPacket = (nav: NavigationPacket) => {
    drawSensorDot(nav, "left");
    drawSensorDot(nav, "front");
    drawSensorDot(nav, "right");
    // addPoint();
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

    ctx.beginPath();
    ctx.moveTo(0, 0);

    com.addEventListener(
      "message",
      (evt: MessageEvent<MausOutgoingMessage>) => {
        if (evt.data.nav) {
          onNavPacket(evt.data.nav);
          if (maus) {
            maus.style.left = `${
              100 * (fromMmToUnits(evt.data.nav.position.x) / mazeSize.width)
            }%`;
            console.log(
              evt.data.nav.position.y,
              fromMmToUnits(evt.data.nav.position.y),

              mazeSize.height -
                fromMmToUnits(evt.data.nav.position.y) / mazeSize.height
            );
            maus.style.bottom = `${
              ((fromMmToUnits(evt.data.nav.position.y) - 1) / mazeSize.height) *
              100
            }%`;
          }
        }
      }
    );
  }

  let maus: HTMLDivElement;

  function MausEl(node: HTMLDivElement) {
    maus = node;
  }

  let pathChart: ReturnType<typeof ConnectedScatterplot>;

  function RobotPath(node: HTMLElement) {
    const rect = node.getBoundingClientRect();
    const data: Vector2D[] = [];

    pathChart = ConnectedScatterplot(data, {
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
    node.appendChild(pathChart);
  }

  const addPoint = () => {
    console.log("add point");
    pathChart.appendPoint({
      x: Math.random() * 6,
      y: Math.random() * 6,
    });
  };

  const setPosition = (x: number, y: number) => {
    com.send({
      setPosition: {
        heading: 0,
        x: fromUnitToMms(x + 0.5),
        y: fromUnitToMms(6 - y + 0.5),
      },
    });
  };
</script>

<div class="card map">
  <div class="maze-grid">
    {#each Array(36) as _, i}
      <div
        on:click={() => setPosition(i % 6, Math.floor(i / 6))}
        class="maze-item"
      >
        {i + 1}
      </div>
    {/each}
  </div>

  <div class="path" use:RobotPath />
  <canvas class="sensor" use:CanvasEl />
  <div class="path">
    <button on:click={addPoint}>Add point test</button>
  </div>
  <div class="path">
    <div class="maus" use:MausEl />
  </div>
</div>

<style lang="scss">
  .maus {
    position: absolute;
    display: block;
    content: " ";
    left: 0%;
    bottom: 0%;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    background-color: hotpink;
    opacity: 0.5;
  }

  .sensor,
  .path {
    position: relative;
    pointer-events: none;
  }

  .maze-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(6, 1fr);
    grid-gap: 5px;
  }

  .maze-item {
    aspect-ratio: 1;
    background-color: var(--main-bg-secondary);
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: var(--border-color);

    &:hover {
      background-color: var(--primary-color);
      color: var(--primary-color-text);
    }
  }

  .map {
    min-width: 25vw;
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
