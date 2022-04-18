<script lang="ts">
  import { Communicator } from "./Communicator";
  import Button from "./components/Button.svelte";
  import Grid from "./components/Grid.svelte";
  import Input from "./components/Input.svelte";
  import PidForm from "./components/PidForm.svelte";
  import { onMount } from "svelte";
  import {
    MausOutgoingMessage,
    MotorPosition,
    MsgEncoderCalibration,
  } from "./proto/message";

  export let com: Communicator;

  let leftMotorPid: MsgEncoderCalibration;
  let rightMotorPid: MsgEncoderCalibration;
  let lanePid: MsgEncoderCalibration;

  onMount(async () => {
    if (com.config) {
      leftMotorPid = com.config.leftMotorPid;
      rightMotorPid = com.config.rightMotorPid;
      lanePid = com.config.lanePid;
    }
    com.addEventListener(
      "message",
      (evt: MessageEvent<MausOutgoingMessage>) => {
        if (evt.data.mausConfig) {
          lanePid = evt.data.mausConfig.lanePid;
          leftMotorPid = evt.data.mausConfig.leftMotorPid;
          rightMotorPid = evt.data.mausConfig.rightMotorPid;
          console.log("gotConfig", { rightMotorPid, leftMotorPid, lanePid });
        }
      }
    );
  });

  const onUpdateLaneCalibration = (config: MsgEncoderCalibration) => {
    com.send({
      laneCalibration: config,
    });
  };

  const onUpdateMotorCalibration = (
    motor: MotorPosition,
    config: MsgEncoderCalibration
  ) => {
    com.send({
      motorCalibration: {
        motor,
        config,
      },
    });
  };
</script>

{#if leftMotorPid}
  <PidForm
    title="Left Motor PID"
    bind:config={leftMotorPid}
    onSubmit={(config) => onUpdateMotorCalibration(MotorPosition.left, config)}
  />
  <PidForm
    title="Right Motor PID"
    bind:config={rightMotorPid}
    onSubmit={(config) => onUpdateMotorCalibration(MotorPosition.right, config)}
  />{/if}

{#if lanePid}
  <PidForm
    title="Lane PID"
    config={lanePid}
    onSubmit={onUpdateLaneCalibration}
  />
{/if}
{#if !leftMotorPid && !lanePid}
  <p>No lane PID configuration available. Please update the MAUS!</p>
{/if}

<style lang="scss">
</style>
