<script lang="ts">
  import { Communicator } from "./Communicator";
  import { Maus } from "./proto/dashboard";

  export let com: Communicator;

  let availableMauses: Array<Maus> = [];

  const fetchAvailableMouses = async () => {
    const response = await fetch("/maus");
    const mouses = await response.json();
    availableMauses = mouses.maus ?? [];
    return mouses;
  };

  const onRobotSelected = (maus: Maus) => {
    com.connectToMaus(maus);
  };

  fetchAvailableMouses();
</script>

<div>
  <ul>
    {#each availableMauses as maus}
      <li on:click={() => onRobotSelected(maus)}>{maus.ip}:{maus.mac}</li>
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
    padding: 0;
    margin: 0;
    list-style: none;
    max-width: 300px;
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    overflow: hidden;
  }

  li {
    cursor: pointer;
    padding: 1rem;
    &:not(:last-child) {
      border-bottom: 1px solid var(--border-color);
    }
    &:hover {
      background-color: var(--primary-color);
      color: var(--primary-text-color);
    }
  }
</style>
