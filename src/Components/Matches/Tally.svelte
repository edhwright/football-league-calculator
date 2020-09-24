<script>
  import { createEventDispatcher } from "svelte";
  import { teamsStore, selected, view, tableUpdated } from "../../stores.js";

  const dispatch = createEventDispatcher();

  let tally;

  $: if ($tableUpdated) {
    tally = 0;
    for (let i = 0; i < $teamsStore.teams.length; i++) {
      tally += $teamsStore.teams[i].played.reduce(function (a, b) {
        return a + b;
      }, 0);
    }
  }

  let total = $selected.gw * $teamsStore.teams.length * 0.5;

  function toggleMWs() {
    dispatch("toggleMWCompletedList");
  }
</script>

<style>
  button {
    font-size: 0.9rem;
    margin: 0 0 5px 0;
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
      margin: 0 7px 0 0;
      padding: 0 10px 0 10px;
    }
  }

  @media (min-width: 980px) {
    button {
      width: 83px;
      margin: 0 5px 0 0;
      padding: 0;
    }
  }

  @media (min-width: 1200px) {
    button {
      min-width: 108px;
      margin: 0 7px 0 0;
      padding: 0;
    }
  }
</style>

<button
  on:click={toggleMWs}
  hidden={!$view.matches}
  class={$view.mwCompletedList ? 'selected' : 'unselected'}>
  {Math.ceil(tally * 0.5)} &#47; {total}
</button>
