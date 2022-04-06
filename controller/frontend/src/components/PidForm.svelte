<script lang="ts">
  import { MsgEncoderCallibration } from "../proto/message";
  import Button from "./Button.svelte";
  import Grid from "./Grid.svelte";
  import Input from "./Input.svelte";

  export let config: MsgEncoderCallibration;
  export let title: string;
  export let onSubmit: (pid: MsgEncoderCallibration) => void;

  const internalOnSubmit = (evt: SubmitEvent | CustomEvent<MouseEvent>) => {
    evt.preventDefault();
    onSubmit(config);
  };
</script>

<h2>{title}</h2>
<form on:submit={internalOnSubmit}>
  <Grid>
    <Input
      step="0.0000000000000000001"
      label="kP"
      type="number"
      bind:value={config.kP}
    />
    <Input
      step="0.0000000000000000001"
      label="kD"
      type="number"
      bind:value={config.kD}
    />
    <Input
      step="0.0000000000000000001"
      label="kI"
      type="number"
      bind:value={config.kI}
    />
  </Grid>
  <Button type="submit">Update</Button>
</form>
