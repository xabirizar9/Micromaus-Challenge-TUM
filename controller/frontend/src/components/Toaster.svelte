<script lang="ts">
  import {
    SvelteToast,
    toast,
    SvelteToastOptions,
  } from "@zerodevx/svelte-toast";
  // Optionally set default options here
  const options: Partial<SvelteToastOptions> = {};
</script>

<SvelteToast {options} />

<style lang="scss">
  :root {
    --toastBackground: var(--primary-color);
    --toastColor: var(--primary-color-text);
    --toastBorderRadius: 0.5rem;
    --toastBarBackground: rgba(0, 0, 0, 0.2);
  }
</style>
