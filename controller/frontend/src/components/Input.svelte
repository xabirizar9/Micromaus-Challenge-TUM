<script lang="ts">
  export let type: string | undefined = undefined;
  export let step: string | undefined = undefined;
  export let label: string | undefined = undefined;
  export let placeholder: string | undefined = undefined;
  export let value: string | number = undefined;
  export let onInput:
    | ((evt: Event & { currentTarget: EventTarget & HTMLInputElement }) => void)
    | undefined = undefined;

  let internalValue: string | number = value;
  let internalOnInput = (
    evt: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) => {
    if (onInput) {
      onInput(evt);
    }

    if (type === "number") {
      value = evt.currentTarget.valueAsNumber;
    } else {
      value = evt.currentTarget.value;
    }
  };
</script>

<div class="input">
  <span class="label">{label}</span>
  <input
    {type}
    size="2"
    {step}
    {placeholder}
    value={internalValue}
    on:input={internalOnInput}
  />
</div>

<style lang="scss">
  .input {
    min-width: 0;
    &:hover {
      input {
        border-color: var(--primary-color);
        background: var(--main-bg-tertiary);
      }
    }

    .label {
      display: block;
      padding-left: 1rem;
      color: var(--main-bg-tertiary);
    }

    input {
      max-width: 100%;
      box-sizing: border-box;
      display: inline-block;
      min-width: 0;
      color: var(--main-text-color);
      border: 2px solid var(--border-color);
      border-radius: 0.5rem;
      padding: 15px;
      background: var(--main-bg-secondary);
      margin: 0 0 10px 0;
    }
  }
</style>
