<div class="grid">
  <slot />
</div>

<style lang="scss">
  .grid {
    display: grid;
    grid-auto-flow: column;
    gap: 0.5rem;

    > * {
      min-width: 0;
    }
  }
</style>
