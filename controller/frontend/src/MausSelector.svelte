<script lang="ts">
  import { Communicator } from "./Communicator";

  export let com: Communicator;

  let availableMauses: Array<{ id: string; mac: string; ip: string }> = [];

  const fetchAvailableMouses = async () => {
    const response = await fetch("/maus");
    const mouses = await response.json();
    availableMauses = mouses.maus ?? [];
    return mouses;
  };

  const onRobotSelected = (id: string) => {
    com.sendClientMsg({
      selectDevice: {
        deviceId: id,
      },
    });
  };

  fetchAvailableMouses();
</script>

<div>
  <ul>
    {#each availableMauses as maus}
      <li on:click={() => onRobotSelected(maus.id)}>{maus.ip}:{maus.mac}</li>
    {/each}
  </ul>
</div>

<style lang="scss">
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  ul {
    max-width: 300px;
    border: 1px solid var(--border-color);
    border-radius: 1.5rem;
  }

  li {
    padding: 1rem;
    border-bottom: 1px solid var(--border-color);
  }
</style>
