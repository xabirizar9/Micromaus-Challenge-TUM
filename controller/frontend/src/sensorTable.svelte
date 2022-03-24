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
</script>

<div class="logs">
  <VirtualList items={data} let:item>
    <!-- this will be rendered for each currently visible item -->
    <span>
      [{item.timestamp}] pos=({item.position.x},{item.position.y}) speed=({item.leftMotorSpeed},{item.rightMotorSpeed})
      dir=({item.position.heading}) encTotal=({item.leftEncoderTotal},{item.rightEncoderTotal})
      bat={item.batteryLevel ?? 0}
    </span>
  </VirtualList>
</div>

<style lang="scss">
  .logs {
    font-family: monospace;
    height: 50vh;
  }
</style>
