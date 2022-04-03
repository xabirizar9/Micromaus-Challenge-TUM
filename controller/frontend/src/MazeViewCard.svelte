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

  const sensorOffsets = {
    left: { x: -25, y: 0 },
    front: { x: 0, y: 25 },
    right: { x: 25, y: 0 },
  };

  let canvas: HTMLCanvasElement;
  let maus: HTMLDivElement;
  let pathChart: ReturnType<typeof ConnectedScatterplot>;

  let ctx: CanvasRenderingContext2D;
  const data: Vector2D[] = [];
  let currentRotationInRad = 0.0;

  const fromMmToUnits = (mm: number) => mm / 180 / mazeSize.width;
  const fromUnitToMms = (unit: number) => unit * 180 * mazeSize.width;

  const getRenderPosUnit = (pos: Position) => {
    const x = (fromMmToUnits(pos.x) + 0.5) / 6;
    const y = (fromMmToUnits(pos.y) - 0.5) / 6;
    return { x, y };
  };

  const drawSensorDot = (nav: NavigationPacket, sensor: keyof SensorPacket) => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // discard sensor reading if out of range
    if (nav.sensors[sensor] < 1) {
      return;
    }

    // add static offset from wall
    let { x, y } = getRenderPosUnit(nav.position);
    x *= width;
    y = height - (y + 1 / 6) * height;

    ctx.beginPath();

    let sensorX =
      x + fromMmToUnits(sensorOffsets[sensor].x) * canvas.clientWidth;
    let sensorY =
      y + fromMmToUnits(sensorOffsets[sensor].y) * canvas.clientHeight;

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
    currentRotationInRad = nav.position.heading;
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
            const x = fromMmToUnits(evt.data.nav.position.x) + 0.5;
            const y = fromMmToUnits(evt.data.nav.position.y) + 0.5;
            maus.style.left = `${100 * (x / mazeSize.width)}%`;
            maus.style.bottom = `${100 * ((y - 0.5) / mazeSize.height)}%`;

            pathChart.appendPoint({
              x: x,
              y: y,
            });
          }
        }
      }
    );
  }

  function MausEl(node: HTMLDivElement) {
    maus = node;
  }

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

  const setPosition = (x: number, y: number) => {
    com.send({
      setPosition: {
        heading: 0,
        x: fromUnitToMms(x),
        y: fromUnitToMms(5 - y),
      },
    });
  };
</script>

<div class="card map">
  <div class="maze-grid">
    {#each Array(mazeSize.width * mazeSize.width) as _, i}
      <div
        on:click={() =>
          setPosition(i % mazeSize.width, Math.floor(i / mazeSize.width))}
        class="maze-item"
      >
        {0}
      </div>
    {/each}
  </div>

  <div class="path" use:RobotPath />
  <!-- <div class="path">
    <button on:click={addPoint}>Add point test</button>
  </div> -->
  <div class="path">
    <div
      class="maus"
      style={`transform: translate(-50%, -50%) rotate(${currentRotationInRad}rad)`}
      use:MausEl
    >
      <div class="head" />
    </div>
  </div>
  <canvas class="sensor" use:CanvasEl />
</div>

<style lang="scss">
  .maus {
    position: absolute;
    display: block;
    content: " ";
    left: 15px;
    bottom: 30px;
    width: 30px;
    transform: translate(-50%, -50%);
    height: 30px;
    border-radius: 17px;
    background-color: white;
    border: 2px solid black;
    opacity: 0.9;

    .head {
      display: block;
      position: absolute;
      left: 15px;
      top: 0px;
      width: 10px;
      transform: translate(-50%, -50%);
      border-radius: 15px;
      height: 10px;
      background-color: black;
      border: 1px solid #eee;
    }
  }

  .sensor,
  .path {
    box-sizing: border-box;
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
      width: 100%;
      height: 100%;
    }
  }
</style>
