<script lang="ts">
  import Toaster from "./components/Toaster.svelte";
  import SensorTable from "./SensorTable.svelte";
  import MazeView from "./MazeViewCard.svelte";
  import MausSelector from "./MausSelector.svelte";
  import Input from "./components/Input.svelte";
  import { Communicator } from "./Communicator";
  import Grid from "./components/Grid.svelte";
  import Button from "./components/Button.svelte";
  import { Joystick } from "./Joystick";
  import { DriveCmdType, SolveCmdType } from "./proto/message";
  import PowerView from "./components/PowerView.svelte";
  import StatusView from "./components/StatusView.svelte";
  import PidConfigCard from "./PidConfigCard.svelte";
  import { DashboardServerMessage, Maus } from "./proto/dashboard";

  export const com = new Communicator({
    url: `ws://${window.location.host}/ws`,
  });

  const controller = new Joystick(com);

  let mausConnected: Maus | false = false;
  let direction = 0;
  let speed = 0;

  let actionSpeed = 400;
  let driveValue = 0;
  let driveSpeed = 0;
  let driveCmdType = DriveCmdType.Move;

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
        type: driveCmdType,
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

  const onTunePid = () => {
    alert("currently disabled");
    // com.send({
    //   encoderCallibration: {
    //     kD,
    //     kI,
    //     kP,
    //     streamData: !isPidTuningActive,
    //   },
    // });
    // isPidTuningActive = !isPidTuningActive;
  };

  // list of all valid drive commands
  const driveOptions = Object.entries(DriveCmdType).filter(
    ([key, value]) => typeof value === "number" && value >= 0
  );

  const onFastRun = () => {
    com.send({
      solve: {
        type: SolveCmdType.FastRun,
        speed: actionSpeed,
      },
    });
  };

  const onStartExplore = () => {
    com.send({
      solve: {
        type: SolveCmdType.Explore,
        speed: actionSpeed,
      },
    });
  };

  const onGoToStart = () => {
    com.send({
      solve: {
        type: SolveCmdType.GoHome,
        speed: actionSpeed,
      },
    });
  };

  com.addEventListener("connected", (evt: MessageEvent<Maus>) => {
    if (evt.data) {
      mausConnected = evt.data;
    }
  });
</script>

<Toaster />
<nav>
  <a href="" class="brand-logo">WAXN</a>
  <div>
    {#if mausConnected}
      <a on:click={() => (mausConnected = false)}
        >{mausConnected.id}:{mausConnected.ip}</a
      >
    {/if}
  </div>
</nav>
<main>
  {#if mausConnected}
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
              bind:value={driveSpeed}
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

      <div class="card">
        <PidConfigCard {com} />
      </div>
    </div>

    <div class="card">
      <h2>Actions</h2>
      <div>
        <Input type="number" bind:value={actionSpeed} />
        <Button inline on:click={onStop}>STOP!</Button>
        <Button inline on:click={onStartExplore}>Explore</Button>
        <Button inline on:click={onGoToStart}>Go To Start</Button>
        <Button inline on:click={onFastRun}>Fast Run</Button>
        <Button inline on:click={onTunePid}>Tune PID</Button>
      </div>
    </div>

    <div class="subgrid">
      <div class="card">
        <h2>Status</h2>
        <StatusView {com} />
      </div>
      <div class="card">
        <h2>Power</h2>
        <PowerView {com} />
      </div>
    </div>

    <div class="card full"><SensorTable {com} /></div>
  {/if}
</main>

{#if !mausConnected}
  <div class="no-maus">No mouse connected</div>
  <MausSelector {com} />
{/if}

<style lang="scss">
  :root {
    --primary-color: #0070f3;
    --primary-color-text: #fff;

    --error-color: #f56969;
    --error-color-text: #fff;

    --success-color: #77c97e;
    --success-color-text: #fff;

    --nav-bg: #e8e8e8cc;
    --border-color: rgb(121, 121, 121);
    --main-bg-secondary: #e8e8e8;
    --main-bg-color: #dadada;
    --main-bg-tertiary: #aaaaaa;
    --main-text-color: #333;
    --main-shadow-color: #rgba(0, 0, 0, 0.1);
    --main-shadow-secondary-color: rgba(0, 0, 0, 0.05);

    @media (prefers-color-scheme: dark) {
      --nav-bg: rgba(51, 51, 51, 0.653);
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
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    box-sizing: border-box;

    h2 {
      font-size: 1.2rem;
      margin-top: 0;
      margin: 0.5rem 0.25rem;
    }
  }

  :global(body) {
    background-color: var(--main-bg-color);
    color: var(--main-text-color);

    a {
      color: var(--primary-color);
      text-decoration: none;
    }

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

  nav {
    position: sticky;
    top: 0;
    width: 100%;
    height: 40px;
    z-index: 100;
    display: flex;
    padding: 0 0.5rem;
    align-items: center;
    justify-content: space-between;
    background-color: var(--nav-bg);
    backdrop-filter: blur(10px);
    box-shadow: 0px 0px 10px var(--main-shadow-color);
    border-bottom: 1px solid var(--main-bg-tertiary);
  }

  .no-maus {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 1.5rem;
    padding: 1rem;
  }

  main {
    padding: 1rem;
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
