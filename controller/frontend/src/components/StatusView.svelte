<script lang="ts">
  import { Communicator } from "../Communicator";

  import { MausOutgoingMessage, NavigationPacket } from "../proto/message";

  export let com: Communicator;

  let state: NavigationPacket;

  com.addEventListener("message", (evt: MessageEvent<MausOutgoingMessage>) => {
    if (evt.data.nav) {
      state = evt.data.nav;
    }
  });
</script>

<div>
  <table>
    {#if state}
      <tr>
        <td>Position: </td>
        <td
          >x={state.position.x}, y={state.position.y} h={state.position
            .heading}</td
        >
      </tr>
      <tr
        ><td>Speed:</td>
        <td>l={state.leftMotorSpeed} r={state.rightMotorSpeed}</td></tr
      >
    {/if}
  </table>
</div>
