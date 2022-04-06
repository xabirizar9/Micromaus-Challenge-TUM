<script lang="ts">
  import { Communicator } from "./Communicator";
  import Button from "./components/Button.svelte";
  import Grid from "./components/Grid.svelte";
  import Input from "./components/Input.svelte";
  import PidForm from "./components/PidForm.svelte";
  import { onMount } from "svelte";
  import { MausOutgoingMessage, MsgEncoderCallibration } from "./proto/message";

  export let com: Communicator;

  let motorPid: MsgEncoderCallibration;
  let lanePid: MsgEncoderCallibration;

  onMount(async () => {
    console.log("onMount", { motorPid, lanePid });
    if (com.config) {
      motorPid = com.config.motorPid;
      lanePid = com.config.lanePid;
    }
    com.addEventListener(
      "message",
      (evt: MessageEvent<MausOutgoingMessage>) => {
        if (evt.data.mausConfig) {
          lanePid = evt.data.mausConfig.lanePid;
          motorPid = evt.data.mausConfig.motorPid;
          console.log("gotConfig", { motorPid, lanePid });
        }
      }
    );
  });

  const onUpdateLaneCalibration = (config: MsgEncoderCallibration) => {
    com.send({
      laneCallibration: config,
    });
  };

  const onUpdateMotorCalibration = (config: MsgEncoderCallibration) => {
    com.send({
      encoderCallibration: config,
    });
  };
</script>

{#if motorPid}
  <PidForm
    title="Motor PID"
    bind:config={motorPid}
    onSubmit={onUpdateMotorCalibration}
  />{/if}

{#if lanePid}
  <PidForm
    title="Lane PID"
    config={lanePid}
    onSubmit={onUpdateLaneCalibration}
  />
{/if}
{#if !motorPid && !lanePid}
  <p>No lane PID configuration available. Please update the MAUS!</p>
{/if}

<style lang="scss">
</style>
