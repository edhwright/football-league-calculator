<script>
  import { currentMatchday } from "../../fetchData.js";
  import { matchesStore, teamsStore, selected, view } from "../../stores.js";
  import MatchesRow from "./MatchesRow.svelte";

  export let selectedMatchweek;
  export let matchweekMin;
  export let matchweekMax;
  export let isTableFilter;

  let matchweek;

  $: if (selectedMatchweek) {
    matchweek = selectedMatchweek;
  }

  if (currentMatchday) {
    matchweek = currentMatchday;
  } else {
    matchweek = 1;
  }

  let end;
  let fromDate;
  let toDate;

  $: if ($matchesStore[matchweek - 1]) {
    end = $matchesStore[matchweek - 1].length;
    fromDate = new Date($matchesStore[matchweek - 1][0].utcDate);
    toDate = new Date($matchesStore[matchweek - 1][end - 1].utcDate);
  }

  let opacity = "1.0";

  $: if (isTableFilter && matchweekMin != null && matchweekMax) {
    if (matchweek > matchweekMax || matchweek < matchweekMin) {
      opacity = 0.5;
    } else {
      opacity = 1.0;
    }
  }

  $: if (!isTableFilter) {
    opacity = 1.0;
  }
</script>

<style>
  td {
    margin: 0px;
    padding: 0px;
    height: 40px !important;
    vertical-align: middle;
    box-sizing: border-box;
  }

  tr {
    box-sizing: border-box;
    text-align: center;
    font-size: 0.8rem;
    font-weight: 500;
    border-top: 2px solid transparent;
  }

  table {
    padding: 0px;
    border-collapse: collapse;
    border-spacing: 0px;
    max-width: 350px;
    margin: 0 auto;
    opacity: var(--opacity);
    color: var(--theme-text);
  }

  @media (min-width: 980px) {
    table {
      width: 280px;
      margin: 0 40px 0 0;
    }
  }
</style>

<table
  hidden={!$view.matches || $view.mwCompletedList}
  style="--opacity: {opacity}">
  {#if matchweek && matchweek > 0 && matchweek < $selected.gw + 1}
    <tr>
      <td colspan="3">
        {fromDate.toDateString() === toDate.toDateString() ? fromDate.toDateString() : fromDate.toDateString() + ' - ' + toDate.toDateString()}
      </td>
    </tr>
    {#each $matchesStore[matchweek - 1] as match}
      <MatchesRow
        status={match.status}
        score={match.score}
        homeTeam={match.homeTeam}
        awayTeam={match.awayTeam}
        {matchweek} />
    {/each}
  {/if}
</table>
