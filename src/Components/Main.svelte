<script>
  import {
    fetchState,
    matchesStore,
    teamsStore,
    selected,
    view,
  } from "../stores.js";
  import Spinner from "../Spinner.svelte";
  import MatchesTableToggle from "./MatchesTableToggle.svelte";
  import MatchweekCompletedList from "./Matches/MatchweekCompletedList.svelte";
  import Options from "./Options.svelte";
  import MatchesTable from "./Matches/MatchesTable.svelte";
  import Table from "./Table/Table.svelte";
  import MatchweekSelection from "./Matches/MatchweekSelection.svelte";

  import { getData } from "../fetchData.js";

  $: getData($selected);

  $: if (!$view.mobile || $view.mobileTabSelected === "matches") {
    $view.matches = true;
  } else {
    $view.matches = false;
  }

  $: if (!$view.mobile || $view.mobileTabSelected === "table") {
    $view.table = true;
  } else {
    $view.table = false;
  }

  let selectedMatchweek;

  //MatchesTableToggle
  function handleViewChange(event) {
    $view.mobileTabSelected = event.detail.view;
  }

  //Tally
  function handleMWCompletedList() {
    $view.mwCompletedList = !$view.mwCompletedList;
  }

  //MatchweekCompletedList
  function handleMatchweekChange(event) {
    selectedMatchweek = event.detail.matchweek;
    $view.mwCompletedList = false;
  }

  //MatchweekSelection
  function handleMWSelection(event) {
    selectedMatchweek = event.detail.matchweekSelection;
  }

  let matchweekMin = 1;
  let matchweekMax = $selected.gw;
  let isTableFilter = false;

  //TableFilter
  function handleTableFilterChange(event) {
    isTableFilter = event.detail.tableFilterChange;
  }

  //TableFilter
  function handleRangeChange(event) {
    matchweekMin = event.detail.min;
    matchweekMax = event.detail.max;
  }

  $: if ($fetchState === "DONE") {
    selectedMatchweek = null;
    matchweekMin = 1;
    matchweekMax = $selected.gw;
    isTableFilter = false;
    $view.mobileTabSelected = "matches";
    $view.mwCompletedList = false;
  }

  let mobile = window.matchMedia("(max-width: 979px)");

  function setView(mobile) {
    if (mobile.matches) {
      $view.mobile = true;
    } else {
      $view.mobile = false;
    }
  }

  setView(mobile);
  mobile.addListener(setView);
</script>

<style>
  .container {
    color: var(--theme-text);
  }

  .centered {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .options-flex {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  @media (min-width: 980px) {
    .flex {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      margin: 0 40px;
      justify-content: space-evenly;
    }

    .options-flex {
      height: 80px;
      align-items: start;
      width: auto;
      justify-content: stretch;
      flex-direction: row;
      margin: 0 40px;
      justify-content: space-evenly;
    }
  }

  @media (min-width: 1300px) {
    .flex {
      max-width: 1300px;
      margin: 0 auto;
    }

    .options-flex {
      max-width: 1300px;
      margin: 0 auto;
    }
  }
</style>

<main class="container">
  <div class="centered">
    {#if $fetchState === 'LOADING'}
      <Spinner />
    {:else if $fetchState === 'OFFSEASON'}
      The fixtures for {$selected.name} haven't been generated yet. 🕒
    {:else if $fetchState === 'ERROR'}
      Failed to reach server. Try again soon! 😟
    {/if}
  </div>

  {#if $selected !== 'selectInit' && $matchesStore && $teamsStore && $fetchState === 'DONE'}
    <MatchesTableToggle on:viewChange={handleViewChange} />
    <div class="options-flex">
      <MatchweekSelection
        on:matchWeekSelection={handleMWSelection}
        {selectedMatchweek} />
      <Options
        on:toggleMWCompletedList={handleMWCompletedList}
        on:tableFilterChange={handleTableFilterChange}
        on:selectedRange={handleRangeChange}
        {isTableFilter} />
    </div>
    <div class="flex">
      <MatchesTable
        {selectedMatchweek}
        {matchweekMin}
        {matchweekMax}
        {isTableFilter} />
      <MatchweekCompletedList on:matchweekChanged={handleMatchweekChange} />
      <Table {matchweekMin} {matchweekMax} {isTableFilter} />
    </div>
  {/if}
</main>
