<script lang="ts">
  import { MsgEncoderCalibration } from "../proto/message";
  import Button from "./Button.svelte";
  import Grid from "./Grid.svelte";
  import Input from "./Input.svelte";

  export let config: MsgEncoderCalibration;
  export let title: string;
  export let onSubmit: (pid: MsgEncoderCalibration) => void;

  const internalOnSubmit = (evt: SubmitEvent | CustomEvent<MouseEvent>) => {
    evt.preventDefault();

    if (typeof config.kD === "string") {
      config.kD = parseFloat(config.kD);
    }
    if (typeof config.kP === "string") {
      config.kP = parseFloat(config.kP);
    }
    if (typeof config.kI === "string") {
      config.kI = parseFloat(config.kI);
    }

    onSubmit(config);
    console.log(config);
  };
</script>

<h2>{title}</h2>
<form on:submit={internalOnSubmit}>
  <Grid>
    <Input label="kP" bind:value={config.kP} />
    <Input label="kD" bind:value={config.kD} />
    <Input label="kI" bind:value={config.kI} />
  </Grid>
  <Button type="submit">Update</Button>
</form>
