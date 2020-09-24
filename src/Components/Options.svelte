<script>
  import Tally from "./Matches/Tally.svelte";
  import SimulateSeason from "./Matches/SimulateSeason.svelte";
  import ClearResults from "./Matches/ClearResults.svelte";
  import TableFilterButton from "./Table/TableFilterButton.svelte";
  import TableFilterRange from "./Table/TableFilterRange.svelte";
  export let isTableFilter;
</script>

<style>
  .options {
    display: flex;
    flex-direction: column;
    align-items: center;
    order: 1;
    margin: 0 0 15px 0;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    width: 80%;
    max-width: 200px;
    min-width: 180px;
  }

  @media (min-width: 320px) {
    .options {
      width: 100%;
      max-width: 350px;
      order: 1;
    }

    .buttons {
      min-width: auto;
    }
  }

  @media (min-width: 375px) {
    .buttons {
      flex-direction: row;
      width: auto;
      max-width: 350px;
    }
  }

  @media (min-width: 980px) {
    .buttons {
      margin: 0;
      max-width: none;
    }

    .options {
      flex-direction: row;
      flex-wrap: wrap;
      align-items: start;
      justify-content: center;
      order: 2;
      min-width: 600px;
      max-width: 600px;
      margin: 0;
    }
  }

  @media (min-width: 1200px) {
    .options {
      min-width: 797px;
      max-width: 797px;
    }
  }
</style>

<div class="options">
  <div class="buttons">
    <Tally on:toggleMWCompletedList />
    <SimulateSeason />
    <ClearResults />
    <TableFilterButton on:tableFilterChange {isTableFilter} />
  </div>
  <TableFilterRange on:selectedRange {isTableFilter} />
</div>
