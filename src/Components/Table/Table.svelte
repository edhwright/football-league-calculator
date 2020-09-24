<script>
  import { teamsStore, selected, tableUpdated, view } from "../../stores.js";
  import { sortTeams, isChampion, isRelegated } from "../../utils.js";
  import TableRow from "./TableRow.svelte";
  export let matchweekMin;
  export let matchweekMax;
  export let isTableFilter;

  $: min = matchweekMin;
  $: max = matchweekMax;
  $: modify = isTableFilter;

  let tableReady = false;
  let champion;
  let relegated;
  let teams;
  let totalmatches = $selected.gw;
  let relegationZone = $selected.rel;
  let lastSafePosition = $selected.lsp;

  $: if ($tableUpdated) {
    if (modify && min != null && max) {
      teams = JSON.parse(JSON.stringify($teamsStore.teams));

      for (let i = 0; i < teams.length; i++) {
        teams[i].played = $teamsStore.teams[i].played.slice(min - 1, max);
        teams[i].won = $teamsStore.teams[i].won.slice(min - 1, max);
        teams[i].drawn = $teamsStore.teams[i].drawn.slice(min - 1, max);
        teams[i].lost = $teamsStore.teams[i].lost.slice(min - 1, max);
        teams[i].goalsfor = $teamsStore.teams[i].goalsfor.slice(min - 1, max);
        teams[i].goalsagainst = $teamsStore.teams[i].goalsagainst.slice(
          min - 1,
          max
        );
        teams[i].points = $teamsStore.teams[i].points.slice(min - 1, max);
      }
    } else if (!modify) {
      teams = $teamsStore.teams;
    }
    sortTeams(teams, $selected.sort);
    setTable(teams);
    $tableUpdated = false;
    teams = teams;
    tableReady = true;
  }

  const setTable = (teams) => {
    champion = isChampion(teams, totalmatches);

    relegated = [];
    for (let i = 0; i < relegationZone.length; i++) {
      relegated.push(
        isRelegated(relegationZone[i], teams, totalmatches, lastSafePosition)
      );
    }
  };
</script>

<style>
  th {
    margin: 0px;
    padding: 0px;
    height: 40px !important;
    vertical-align: middle;
    box-sizing: border-box;
    font-weight: 500;
  }

  tr {
    box-sizing: border-box;
    border-top: 2px solid var(--theme-tableBorder);
    font-size: 0.9rem;
    color: var(--theme-text);
  }

  table {
    padding: 0;
    margin: 0;
    border-collapse: collapse;
    border-spacing: 0px;
    color: var(--theme-text);
  }

  .table-head {
    font-size: 0.8rem;
    border-top: 2px solid transparent;
  }

  .club {
    text-align: left;
    padding: 0 0 0 10px;
  }

  .number {
    min-width: 30px;
    text-align: center;
  }

  .name-short {
    display: table-cell;
  }

  .name {
    display: none;
  }

  .won {
    display: none;
  }

  .drawn {
    display: none;
  }

  .lost {
    display: none;
  }

  .goals-for {
    display: none;
  }

  .goals-against {
    display: none;
  }

  @media (min-width: 380px) {
    .number {
      min-width: 40px;
    }
  }

  @media (min-width: 500px) {
    .won {
      display: table-cell;
    }

    .drawn {
      display: table-cell;
    }

    .lost {
      display: table-cell;
    }
  }

  @media (min-width: 600px) {
    .goals-for {
      display: table-cell;
    }

    .goals-against {
      display: table-cell;
    }

    table {
      max-width: 600px;
      margin: 0 auto;
    }
  }

  @media (min-width: 980px) {
    .name-short {
      display: none;
    }

    .name {
      display: table-cell;
    }

    table {
      min-width: 600px;
      max-width: 600px;
      margin: 0;
    }
  }

  @media (min-width: 1200px) {
    table {
      min-width: 797px;
      max-width: 797px;
    }
  }
</style>

<table hidden={!$view.table}>
  <tr class="table-head">
    <th class="position-colour" />
    <th class="number position">P</th>
    <th class="club name" colspan="2">Club</th>
    <th class="club name-short" colspan="2">Club</th>
    <th class="number played">Pl</th>
    <th class="number won">W</th>
    <th class="number drawn">D</th>
    <th class="number lost">L</th>
    <th class="number goals-for">GF</th>
    <th class="number goals-against">GA</th>
    <th class="number goal-difference">GD</th>
    <th class="number points">Pts</th>
  </tr>

  {#if teams && tableReady}
    {#each teams as team, i (team.name)}
      <TableRow {champion} {relegated} {team} {i} />
    {/each}
  {/if}
</table>
