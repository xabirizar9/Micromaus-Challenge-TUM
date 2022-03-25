<script lang="ts">
  import VirtualList from "@sveltejs/svelte-virtual-list";
  import { Communicator } from "./Communicator";
  import { MausOutgoingMessage, NavigationPacket } from "./proto/message";

  export let com: Communicator;

  let data: NavigationPacket[] = [];
  com.addEventListener("message", (evt: MessageEvent<MausOutgoingMessage>) => {
    if (evt.data.nav) {
      data = [evt.data.nav, ...data];
    }
  });

  const formatInfo = (item: NavigationPacket) => `pos=(${item.position.x},${
    item.position.y
  }) speed=(${item.leftMotorSpeed.toFixed(3)},${item.rightMotorSpeed.toFixed(
    3
  )}) dir=(${item.position.heading.toFixed(3)}) encTotal=(${
    item.leftEncoderTotal
  },${item.rightEncoderTotal})
  `;
</script>

<div class="logs">
  <VirtualList items={data} let:item>
    <!-- this will be rendered for each currently visible item -->
    <span class="entry">
      <span class="light">[{item.timestamp}]</span>
      {formatInfo(item)}
    </span>
  </VirtualList>
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
