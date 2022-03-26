<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let type: string | undefined = undefined;
  export let inline: boolean = false;

  const dispatch = createEventDispatcher<{ click: MouseEvent }>();

  function forward(event: MouseEvent) {
    dispatch("click", event);
  }
</script>

<button class="btn" on:click={forward} class:inline {type} {...$$restProps}
  ><slot /></button
>

<style lang="scss">
  .btn {
    display: block;
    width: 100%;
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    background-color: var(--main-bg-tertiary);
    color: var(--primary-color-text);
    outline: none;
    border: 2px solid var(--border-color);
    border-radius: 0.75rem;
    box-shadow: none;

    &.inline {
      display: inline;
      width: auto;
    }

    &:hover {
      background-color: var(--primary-color);
    }
  }
</style>
