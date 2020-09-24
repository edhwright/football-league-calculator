<script>
  import { teamsStore, selected, view, tableUpdated } from "../../stores.js";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let matchdays = [];

  $: if ($view.mwCompletedList || ($view.mwCompletedList && $tableUpdated)) {
    matchdays = [];
    for (let i = 0; i < $selected.gw; i++) {
      let counter = 0;
      let weekStatus = "";
      let teamsAmount = $teamsStore.teams.length;
      for (let j = 0; j < teamsAmount; j++) {
        if ($teamsStore.teams[j].played[i] != null) {
          counter += 1;
        }
      }

      if (counter === 0) {
        weekStatus = "none";
      } else if (counter === teamsAmount) {
        weekStatus = "completed";
      } else {
        weekStatus = "partial";
      }

      matchdays.push(weekStatus);
    }
  }

  function handleClick(i) {
    dispatch("matchweekChanged", {
      matchweek: i + 1,
    });
  }
</script>

<style>
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 100%;
    font-size: 0.8em;
    padding: 0 3em;
    color: var(--theme-text);
  }

  .mwcompletedlist {
    list-style-type: none;
    padding: 0;
    max-width: 350px;
    margin: 0 auto;
  }

  li {
    margin: 0;
    height: 30px;
    background-color: var(--theme-background);
  }

  li:hover {
    background-color: var(--theme-foreground);
    cursor: pointer;
  }

  li:focus {
    outline: auto;
  }

  svg {
    height: 20px;
    width: 20px;
  }

  .dot-container {
    height: 20px;
    width: 20px;
    position: relative;
  }

  .dot {
    height: 10px;
    width: 10px;
    background-color: var(--theme-uninitiatedMW);
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -5px 0 0 -5px;
  }

  @media (min-width: 980px) {
    .mwcompletedlist {
      min-width: 280px;
      max-width: 280px;
      margin: 0 40px 0 0;
    }
  }
</style>

<ul class="mwcompletedlist" hidden={!$view.matches || !$view.mwCompletedList}>
  {#each matchdays as matchday, i}
    <li class="container" on:click={() => handleClick(i)}>
      <span class="text">Matchweek {i + 1}</span>
      {#if matchday === 'completed'}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="rgb(50,150,50)">
          <circle cx="10" cy="10" r="6" fill="white" />
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd" />
        </svg>
      {:else}
        <div class="dot-container">
          <div
            class="dot"
            style={matchday === 'partial' ? 'background-color: var(--theme-unfinishedMW)' : 'var(--theme-uninitiatedMW)'} />
        </div>
      {/if}
    </li>
  {/each}
</ul>
