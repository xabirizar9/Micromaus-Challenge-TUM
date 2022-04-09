<script lang="ts">
  import VirtualList from "@sveltejs/svelte-virtual-list";
  import { Communicator } from "./Communicator";
  import {
    MausCommandStatus,
    MausOutgoingMessage,
    NavigationPacket,
  } from "./proto/message";

  export let com: Communicator;

  export let mode: "nav" | "cmd" = "cmd";

  let data: NavigationPacket[] = [];
  let cmds: MausCommandStatus[] = [];
  com.addEventListener("message", (evt: MessageEvent<MausOutgoingMessage>) => {
    if (evt.data.nav) {
      data = [evt.data.nav, ...data];
    }
    if (evt.data.mausCommandStatus) {
      cmds = [evt.data.mausCommandStatus, ...cmds];
    }
  });

  const formatInfo = (item: NavigationPacket) => `pos=(${item.position.x},${
    item.position.y
  }) speed=(${item.leftMotorSpeed.toFixed(3)},${item.rightMotorSpeed.toFixed(
    3
  )}) dir=(${item.position.heading.toFixed(3)}) encTotal=(${
    item.leftEncoderTotal
  },${item.rightEncoderTotal}) sense=(${item.sensors.left.toFixed(
    3
  )},${item.sensors.front.toFixed(3)},${item.sensors.right.toFixed(3)})
  `;
</script>

<div class="logs">
  <button on:click={() => (mode = "cmd")}>DriveCmd</button><button
    on:click={() => (mode = "nav")}>Nav</button
  >
  {#if mode === "nav"}
    <VirtualList items={data} let:item>
      <!-- this will be rendered for each currently visible item -->
      <span class="entry">
        <span class="light">[{item.timestamp}]</span>
        {formatInfo(item)}
      </span>
    </VirtualList>
  {/if}
  {#if mode === "cmd"}
    <VirtualList items={cmds} let:item>
      <!-- this will be rendered for each currently visible item -->
      <span class="entry">
        [{item.cmd}] target:{item.target} actual:{item.actual}
      </span>
    </VirtualList>
  {/if}
</div>

<style lang="scss">
  .logs {
    font-family: monospace;
    height: 50vh;
  }

  .light {
    opacity: 0.4;
  }

  .entry {
    padding: 0.5rem;
    display: block;
    border-bottom: 1px solid var(--main-bg-color);
  }
</style>
