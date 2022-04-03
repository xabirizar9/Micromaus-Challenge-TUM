<script lang="ts">
  import { Communicator } from "../Communicator";

  import { ConnectedScatterplot } from "../plot/ConnectedScatterplot";

  import {
    MausOutgoingMessage,
    NavigationPacket,
    Position,
    SensorPacket,
  } from "../proto/message";
  import { drawGrid } from "../utils/canvas";
  import { mazeSize, Vector2D } from "../utils/geo";

  export let com: Communicator;

  let voltage: number;
  let percentage: number;

  com.addEventListener("message", (evt: MessageEvent<MausOutgoingMessage>) => {
    if (evt.data.nav) {
      voltage = evt.data.nav.voltage;
      percentage = evt.data.nav.batPercentage;
    }
  });
</script>

<div>
  <div>Voltage: {voltage}</div>
  <div>Percentage: {percentage}</div>
</div>
