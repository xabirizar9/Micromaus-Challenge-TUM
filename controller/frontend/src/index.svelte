<script lang="ts">
  import SensorTable from "./sensorTable.svelte";
  import MazeView from "./MazeViewCard.svelte";
  import { Communicator } from "./Communicator";
  import { MausOutgoingMessage, NavigationPacket } from "./proto/message";

  export const com = new Communicator({
    url: "ws://localhost:8080/ws",
  });

  let kD = 0.0;
  let kI = 0.0;
  let kP = 0.0;

  let direction = 0;
  let speed = 0;

  let turnDegree = 0;
  let turnSpeed = 0;

  let driveDistance = 0;
  let driveSpeed = 0;

  const onUpdateMotorCalibration = () => {
    com.send({
      encoderCallibration: {
        kD,
        kI,
        kP,
      },
    });
  };

  const onUpdateControls = () => {
    com.send({
      control: {
        speed,
        direction,
      },
    });
  };

  const onTurn = () => {
    com.send({
      turn: {
        degree: turnDegree,
        speed: turnSpeed,
      },
    });
  };

  const onDrive = () => {
    com.send({
      drive: {
        distance: driveDistance,
        speed: driveSpeed,
      },
    });
  };

  const onStop = () => {
    com.send({
      stop: {},
    });
  };
</script>

<main>
  <MazeView {com} />
  <div class="card"><SensorTable {com} /></div>
  <div class="card">
    <h2>Controls</h2>
    <form on:submit={onUpdateMotorCalibration}>
      <div>
        <label>
          Speed:
          <input type="number" bind:value={speed} />
        </label>
        <label>
          Direction:
          <input type="number" bind:value={direction} />
        </label>
      </div>
      <button on:click={onUpdateControls}>Update</button>
    </form>

    <h2>Turn</h2>
    <form on:submit={onTurn}>
      <div>
        <label>
          <span>Degree:</span>
          <input step="0.001" type="number" bind:value={turnDegree} />
        </label>
        <label>
          <span>Speed:</span>
          <input step="0.001" type="number" bind:value={turnSpeed} />
        </label>
      </div>
      <button type="submit">Turn</button>
    </form>

    <h2>Drive</h2>
    <form on:submit={onDrive}>
      <div>
        <label>
          <span>Degree:</span>
          <input step="0.001" type="number" bind:value={driveDistance} />
        </label>
        <label>
          <span>Speed:</span>
          <input step="0.001" type="number" bind:value={driveSpeed} />
        </label>
      </div>
      <button type="submit">Drive</button>
    </form>

    <h2>Tuning</h2>
    <form on:submit={onUpdateMotorCalibration}>
      <div>
        <label>
          <span>kP:</span>
          <input step="0.001" type="number" bind:value={kP} />
        </label>
        <label>
          <span>kD:</span>

          <input step="0.001" type="number" bind:value={kD} />
        </label>
        <label>
          <span> kI:</span>
          <input step="0.001" type="number" bind:value={kI} />
        </label>
      </div>
      <button type="submit">Update</button>
    </form>
  </div>

  <div class="card">
    <h2>Actions</h2>
    <button on:click={onStop}>STOP!</button>
  </div>
</main>

<style lang="scss">
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
    --main-bg-secondary: #dadada;
    --main-bg-color: #e8e8e8;
    --main-text-color: #333;
    background-color: var(--main-bg-color);
    padding: 1rem;
    color: var(--main-text-color);
    background: #e8e8e8;

    .card {
      background-color: var(--main-bg-secondary);
      border-radius: 1.25rem;
      box-shadow: 20px 20px 60px #c5c5c5, -20px -20px 60px #ffffff;
      padding: 0.5rem;
    }
  }

  label {
    display: block;
  }

  main {
    background-color: var(--main-bg-color);
    display: grid;

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }

    @media (min-width: 1024px) {
      grid-template-columns: 1fr 2fr;
    }
    gap: 2rem;
  }
</style>
