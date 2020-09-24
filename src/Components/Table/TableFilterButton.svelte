<script>
  import { createEventDispatcher } from "svelte";
  import { view, tableUpdated } from "../../stores.js";
  export let isTableFilter;

  const dispatch = createEventDispatcher();

  function handleChange() {
    isTableFilter = !isTableFilter;
    dispatch("tableFilterChange", {
      tableFilterChange: isTableFilter,
    });
    $tableUpdated = true;
  }
</script>

<style>
  button {
    font-size: 0.9rem;
    border: 1px solid var(--theme-outline);
    color: var(--theme-text);
    cursor: pointer;
  }

  button:hover {
    background-color: var(--theme-hover);
  }

  button:focus {
    outline: 2px solid var(--theme-highlight);
  }

  .unselected {
    background-color: var(--theme-foreground);
  }

  .selected {
    background-color: var(--theme-hover);
    font-weight: 500;
  }

  @media (min-width: 375px) {
    button {
      padding: 0 10px 0 10px;
    }
  }

  @media (min-width: 980px) {
    button {
      width: 141px;
      margin: 0;
      padding: 0;
    }
  }

  @media (min-width: 1200px) {
    button {
      min-width: 166px;
      margin: 0 7px 0 0;
      padding: 0;
    }
  }
</style>

<button
  on:click={handleChange}
  hidden={!$view.table}
  class={isTableFilter ? 'selected' : 'unselected'}>Modify table range</button>
