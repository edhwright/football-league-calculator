<script>
  import Selection from "./Components/OnSelection.svelte";
  import ThemeContext from "./ThemeContext.svelte";
</script>

<style>
  :global(html) {
    background-color: var(--theme-background);
    color: var(--theme-text);
  }
</style>

<ThemeContext>
  <Selection />
</ThemeContext>
