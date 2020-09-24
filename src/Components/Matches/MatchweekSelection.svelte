<script>
  import { createEventDispatcher } from "svelte";
  import { currentMatchday } from "../../fetchData.js";
  import { selected, view } from "../../stores.js";

  export let selectedMatchweek;

  const dispatch = createEventDispatcher();

  let matchweek;
  let max_matchweek = $selected.gw;
  let nextDisabled = false;
  let prevDisabled = false;
  let inputBG = "var(--theme-input)";
  let inputText = "var(--theme-text)";

  if (currentMatchday) {
    matchweek = currentMatchday;
  } else {
    matchweek = 1;
  }

  $: if (selectedMatchweek) {
    matchweek = selectedMatchweek;
  }

  function handleFocusIn() {
    inputBG = "var(--theme-inputSelected)";
    inputText = "var(--theme-text)";
  }

  function handleFocusOut() {
    if (!matchweek) {
      inputBG = "var(--theme-inputNull)";
      inputText = "var(--theme-text)";
    } else {
      inputBG = "var(--theme-input)";
      inputText = "var(--theme-text)";
    }
  }

  function onInputChange() {
    if (matchweek < 1) {
      matchweek = 1;
    }

    if (matchweek > max_matchweek) {
      matchweek = max_matchweek;
    }
  }

  $: if (matchweek < 2) {
    prevDisabled = true;
  }

  $: if (matchweek > 1) {
    prevDisabled = false;
  }

  $: if (matchweek > max_matchweek - 1) {
    nextDisabled = true;
  }

  $: if (matchweek < max_matchweek) {
    nextDisabled = false;
  }

  $: {
    dispatch("matchWeekSelection", {
      matchweekSelection: matchweek,
    });
  }
</script>

<style>
  input {
    vertical-align: middle;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border-width: 0 0 2px 0;
    border-color: var(--theme-highlight);
    color: var(--theme-text);
    border-radius: 0;
    text-align: center;
    width: 40px;
    height: 30px;
    background-color: var(--theme-background);
  }

  input:focus {
    background-color: var(--theme-foreground);
    outline: 2px solid var(--theme-highlight);
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    border: 0;
    background-color: var(--theme-background);
  }

  button:hover {
    background-color: var(--theme-foreground);
  }

  button:focus {
    border: 2px solid var(--theme-highlight);
  }

  button:disabled {
    opacity: 0.5;
    cursor: auto;
  }

  button:disabled:hover {
    background-color: var(--theme-background);
  }

  svg {
    width: 20px;
    height: 20px;
  }

  button,
  svg {
    display: inline-block;
    vertical-align: middle;
  }

  .container {
    font-size: 0.9rem;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin: 0 0 15px 0;
    padding: 0px;
    width: 100%;
    max-width: 350px;
    background-color: var(--theme-background);
    color: var(--theme-text);
    order: 2;
  }

  .matchday {
    margin: 0px;
    padding: 0px;
    height: 20px;
  }

  .matchday-text {
    padding-right: 1px;
  }

  @media (min-width: 980px) {
    .container {
      min-width: 280px;
      max-width: 280px;
      margin: 0 40px 0 0;
      order: 1;
    }
  }
</style>

<div
  class="container"
  style={$view.matches ? 'display: flex' : 'display: none'}>
  <button
    id="n-button"
    on:click={() => (matchweek -= 1)}
    disabled={prevDisabled}>
    <svg
      id="previous-icon"
      class="previous-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 22 22">
      <path
        d="m345.44 248.29l-194.29 194.28c-12.359 12.365-32.397 12.365-44.75
        0-12.354-12.354-12.354-32.391
        0-44.744l171.91-171.91-171.91-171.9c-12.354-12.359-12.354-32.394
        0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.29 194.28c6.177 6.18
        9.262 14.271 9.262 22.366 0 8.099-3.091 16.196-9.267 22.373"
        transform="matrix(-.03541-.00013-.00013.03541 19.02 3.02)"
        fill="var(--theme-icon)" />
    </svg>
  </button>

  <div class="matchday">
    <span class="matchday-text">Matchweek</span>
    <span class="matchday-input">
      <input
        type="number"
        min="1"
        max={max_matchweek}
        class="m-input"
        bind:value={matchweek}
        on:focusin={handleFocusIn}
        on:focusout={handleFocusOut}
        on:change={onInputChange}
        style=" --bg-color: {inputBG}; --text-color: {inputText}" />
    </span>
  </div>

  <button
    id="n-button"
    on:click={() => (matchweek += 1)}
    disabled={nextDisabled}>
    <svg
      id="next-icon"
      class="next-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 22 22">
      <path
        d="m345.44 248.29l-194.29 194.28c-12.359 12.365-32.397 12.365-44.75
        0-12.354-12.354-12.354-32.391
        0-44.744l171.91-171.91-171.91-171.9c-12.354-12.359-12.354-32.394
        0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.29 194.28c6.177 6.18
        9.262 14.271 9.262 22.366 0 8.099-3.091 16.196-9.267 22.373"
        transform="matrix(.03541-.00013.00013.03541 2.98 3.02)"
        fill="var(--theme-icon)" />
    </svg>
  </button>
</div>
