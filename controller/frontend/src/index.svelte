<script lang="ts">
  import Toaster from "./components/Toaster.svelte";
  import SensorTable from "./sensorTable.svelte";
  import MazeView from "./MazeViewCard.svelte";
  import Input from "./components/Input.svelte";
  import { Communicator } from "./Communicator";
  import Grid from "./components/Grid.svelte";
  import Button from "./components/Button.svelte";
  import { Joystick } from "./Joystick";
  import { testFloodFill } from "./utils/floodFill";
  import { DriveCmdType } from "./proto/message";

  export const com = new Communicator({
    url: "ws://localhost:8080/ws",
  });

  const controller = new Joystick(com);

  let kP = 0.4;
  let kD = 0.00001;
  let kI = 0.0;

  let direction = 0;
  let speed = 0;

  let driveValue = 0;
  let driveSpeed = 0;
  let driveCmdType = DriveCmdType.Move;

  const onUpdateMotorCalibration = (
    evt: SubmitEvent | CustomEvent<MouseEvent>
  ) => {
    evt.preventDefault();
    com.send({
      encoderCallibration: {
        kD,
        kI,
        kP,
        streamData: false,
      },
    });
  };

  const onUpdateControls = (evt: SubmitEvent | CustomEvent<MouseEvent>) => {
    console.log("onUpdateControls", { speed, direction });
    evt.preventDefault();
    evt.stopPropagation();
    com.send({
      control: {
        speed,
        direction,
      },
    });
  };

  const onDrive = (evt: SubmitEvent | CustomEvent<MouseEvent>) => {
    evt.preventDefault();
    com.send({
      drive: {
        type: DriveCmdType,
        value: driveValue,
        speed: driveSpeed,
      },
    });
  };

  const onStop = () => {
    console.log("STOP!");
    com.send({
      stop: {},
    });
  };

  let isPidTuningActive = false;

  const onTunePid = () => {
    com.send({
      encoderCallibration: {
        kD,
        kI,
        kP,
        streamData: !isPidTuningActive,
      },
    });
    isPidTuningActive = !isPidTuningActive;
  };

  // list of all valid drive commands
  const driveOptions = Object.entries(DriveCmdType).filter(
    ([key, value]) => typeof value === "number" && value >= 0
  );

  testFloodFill();
</script>

<Toaster />
<main>
  <MazeView {com} />

  <div class="subgrid">
    <div class="card">
      <h2>Controls</h2>
      <form on:submit={onUpdateControls}>
        <Grid>
          <Input label="Speed" type="number" bind:value={speed} />
          <Input label="heading" type="number" bind:value={direction} />
        </Grid>
        <Button type="submit">Update</Button>
      </form>
    </div>

    <div class="card">
      <h2>Tuning</h2>
      <form on:submit={onUpdateMotorCalibration}>
        <Grid>
          <Input step="0.000001" label="kP" type="number" bind:value={kP} />
          <Input step="0.000001" label="kD" type="number" bind:value={kD} />
          <Input step="0.000001" label="kI" type="number" bind:value={kI} />
        </Grid>
        <Button type="submit">Update</Button>
      </form>
    </div>

    <div class="card">
      <h2>Drive</h2>
      <form on:submit={onDrive}>
        <select bind:value={driveCmdType}>
          {#each driveOptions as [key, value], i}<option {value}>{key}</option
            >{/each}
        </select>
        <Grid>
          <Input
            label="Speed"
            step="0.001"
            type="number"
            bind:value={driveValue}
          />

          <Input
            label="Value"
            step="0.001"
            type="number"
            bind:value={driveValue}
          />
        </Grid>
        <Button type="submit">Drive</Button>
      </form>
    </div>
  </div>
  <div class="card">
    <h2>Actions</h2>
    <Button inline on:click={onStop}>STOP!</Button>
    <Button inline on:click={onTunePid}
      >{isPidTuningActive ? "STOP" : "START"} AutoTune PID</Button
    >
  </div>
  <div class="card full"><SensorTable {com} /></div>
</main>

<style lang="scss">
  :root {
    --primary-color: #0070f3;
    --primary-color-text: #fff;

    --error-color: #f56969;
    --error-color-text: #fff;

    --success-color: #77c97e;
    --success-color-text: #fff;

    --border-color: rgb(121, 121, 121);
    --main-bg-secondary: #e8e8e8;
    --main-bg-color: #dadada;
    --main-bg-tertiary: #aaaaaa;
    --main-text-color: #333;
    --main-shadow-color: #rgba(0, 0, 0, 0.1);
    --main-shadow-secondary-color: rgba(0, 0, 0, 0.05);

    @media (prefers-color-scheme: dark) {
      --border-color: #333;
      --main-bg-secondary: rgb(40, 40, 40);
      --main-bg-color: #181818;
      --main-bg-tertiary: #434343;
      --main-text-color: rgb(235, 235, 235);
      --main-shadow-color: #222222;
      --main-shadow-secondary-color: #171717;
    }
  }

  :global(html),
  :global(body) {
    padding: 0;
    margin: 0;
    font-size: 18px;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    box-sizing: border-box;
  }

  :global(body) {
    background-color: var(--main-bg-color);
    padding: 1rem;
    color: var(--main-text-color);

    .card {
      background-color: var(--main-bg-secondary);
      border-radius: 1.25rem;
      box-shadow: 20px 20px 60px var(--main-shadow-color),
        -20px -20px 60px var(--main-shadow-secondary-color);
      padding: 0.5rem;
    }

    .subgrid {
      > .card {
        background-color: var(--main-bg-secondary);
        box-shadow: none;
      }

      gap: 0.5rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
  main {
    background-color: var(--main-bg-color);
    display: grid;

    > .full {
      grid-column: 1 / -1;
    }

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }

    @media (min-width: 1024px) {
      grid-template-columns: 1fr 2fr;
    }
    gap: 2rem;
  }
</style>
