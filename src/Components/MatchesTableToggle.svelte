<script>
  import { createEventDispatcher } from "svelte";
  import { view } from "../stores.js";

  const dispatch = createEventDispatcher();

  let selected = "matches";

  $: {
    dispatch("viewChange", {
      view: selected,
    });
  }
</script>

<style>
  .container input[type="radio"] {
    display: none;
  }

  .container {
    display: flex;
    width: 100%;
    max-width: 400px;
    margin: auto;
    margin-bottom: 20px;
    color: var(--theme-text);
  }

  .container label {
    display: inline-block;
    background-color: var(--theme-background);
    cursor: pointer;
    width: 100%;
    padding: 15px 0;
    font-size: 1em;
    line-height: 1em;
    text-align: center;
  }

  .container input[type="radio"]:checked + label {
    border-bottom: 2px solid var(--theme-highlight);
  }

  .container label:hover {
    background-color: var(--theme-foreground);
  }

  @media (min-width: 980px) {
    .container {
      display: none;
    }
  }
</style>

<div class="container" hide={!$view.mobile}>
  <input
    type="radio"
    id="matches"
    name="matches"
    value="matches"
    bind:group={selected} />
  <label for="matches">Matches</label>
  <input
    type="radio"
    id="table"
    name="table"
    value="table"
    bind:group={selected} />
  <label for="table">Table</label>
</div>
