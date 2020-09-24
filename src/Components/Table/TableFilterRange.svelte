<script>
  import { fly } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import { selected, view, tableUpdated } from "../../stores.js";
  export let isTableFilter;

  const dispatch = createEventDispatcher();

  let minRange = 1;
  let maxRange = $selected.gw;

  let inputBG = "var(--theme-input)";
  let inputText = "var(--theme-text)";

  function handleMinChange() {
    if (minRange < 1) {
      minRange = 1;
    } else if (minRange > $selected.gw) {
      minRange = $selected.gw;
    }
  }

  function handleMaxChange() {
    if (maxRange > $selected.gw) {
      maxRange = $selected.gw;
    } else if (maxRange < 1) {
      maxRange = 1;
    }
  }

  $: if (minRange != null && maxRange) {
    dispatch("selectedRange", {
      min: minRange,
      max: maxRange,
    });
    $tableUpdated = true;
  }
</script>

<style>
  .filter {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    margin: 10px 0 0 0;
    color: var(--theme-text);
  }

  .wrapper {
    width: auto;
  }

  input {
    vertical-align: middle;
    box-sizing: border-box;
    margin: 0 7px 0 7px;
    padding: 0;
    border-width: 0 0 2px 0;
    border-color: var(--theme-highlight);
    color: var(--theme-text);
    border-radius: 0;
    text-align: center;
    width: 45px;
    height: 38px;
    background-color: var(--theme-background);
  }

  input:focus {
    background-color: var(--theme-foreground);
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  @media (min-width: 980px) {
    .filter {
      flex-direction: row;
      align-items: center;
      margin: 5px 0 5px 0;
      font-size: 0.8rem;
    }

    .wrapper {
      width: 220px;
    }

    input {
      width: 40px;
      height: 30px;
      margin: 0 3px 0 3px;
    }
  }
</style>

<div class="wrapper">
  {#if isTableFilter}
    <div
      class="filter"
      style={$view.table ? 'display: flex' : 'display: none'}
      transition:fly={{ y: 50, duration: 500 }}>
      <label class="range" for="from">from Matchweek: </label>
      <input
        id="from"
        type="number"
        bind:value={minRange}
        on:change={handleMinChange}
        style=" --bg-color: {inputBG}; --text-color: {inputText}" />
      <label class="range" for="to">to: </label>
      <input
        id="to"
        type="number"
        bind:value={maxRange}
        on:change={handleMaxChange}
        style=" --bg-color: {inputBG}; --text-color: {inputText}" />
    </div>
  {/if}
</div>
