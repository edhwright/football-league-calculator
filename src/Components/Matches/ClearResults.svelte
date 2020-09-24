<script>
  import { matchesStore, view, tableUpdated } from "../../stores.js";
  import { removeMatchData } from "../../utils.js";
  import { currentMatchday, teamIdToObjectLookup } from "../../fetchData.js";

  function clearResults() {
    for (let i = currentMatchday - 1; i < $matchesStore.length; i++) {
      for (let j = 0; j < $matchesStore[i].length; j++) {
        if ($matchesStore[i][j].status !== "FINISHED") {
          if (
            $matchesStore[i][j].score.fullTime.homeTeam != null ||
            $matchesStore[i][j].score.fullTime.awayTeam != null
          ) {
            let homeTeam = $matchesStore[i][j].homeTeam;
            let awayTeam = $matchesStore[i][j].awayTeam;
            $matchesStore[i][j].score.fullTime.homeTeam = null;
            $matchesStore[i][j].score.fullTime.awayTeam = null;
            let teamshome = teamIdToObjectLookup.get(homeTeam.id);
            let teamsaway = teamIdToObjectLookup.get(awayTeam.id);
            removeMatchData(teamshome, teamsaway, i);
          }
        }
      }
    }
    $tableUpdated = true;
  }
</script>

<style>
  button {
    font-size: 0.9rem;
    border: 1px solid var(--theme-outline);
    color: var(--theme-text);
    background-color: var(--theme-foreground);
    cursor: pointer;
  }

  button:hover {
    background-color: var(--theme-hover);
  }

  button:focus {
    outline: 2px solid var(--theme-highlight);
  }

  @media (min-width: 375px) {
    button {
      padding: 0 10px 0 10px;
    }
  }

  @media (min-width: 980px) {
    button {
      width: 100px;
      margin: 0 5px 0 0;
      padding: 0;
    }
  }

  @media (min-width: 1200px) {
    button {
      min-width: 125px;
      margin: 0 7px 0 0;
      padding: 0;
    }
  }
</style>

<button on:click={clearResults} hidden={!$view.matches}>Clear results</button>
