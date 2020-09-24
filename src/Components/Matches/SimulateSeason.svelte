<script>
  import { matchesStore, view, tableUpdated } from "../../stores.js";
  import { addMatchData } from "../../utils.js";
  import { teamIdToObjectLookup } from "../../fetchData.js";

  function simulateSeason() {
    for (let i = 0; i < $matchesStore.length; i++) {
      for (let j = 0; j < $matchesStore[i].length; j++) {
        if ($matchesStore[i][j].status !== "FINISHED") {
          if (
            $matchesStore[i][j].score.fullTime.homeTeam == null ||
            $matchesStore[i][j].score.fullTime.awayTeam == null
          ) {
            let homeTeam = $matchesStore[i][j].homeTeam;
            let awayTeam = $matchesStore[i][j].awayTeam;

            let teamshome = teamIdToObjectLookup.get(homeTeam.id);
            let teamsaway = teamIdToObjectLookup.get(awayTeam.id);

            let homeTeamSPIScore = teamshome.spiData;
            let awayTeamSPIScore = teamsaway.spiData;

            ////////////////////////////////

            let homeGoalsCalc =
              homeTeamSPIScore.off * 100 * awayTeamSPIScore.def;
            //(3.3 * 100) * 0.8 = 264
            homeGoalsCalc *= 0.01;
            //2.64
            let homeGoalsDecimal = homeGoalsCalc - Math.floor(homeGoalsCalc);
            //2.64 - 2 = .64
            let homeScore = Math.floor(homeGoalsCalc);
            //2

            //less than 64% chance of another goal
            if (Math.random() <= homeGoalsDecimal * 0.8) {
              homeScore += 1;
            }

            //under 50% chance of another home goal, depending how good team is
            if (Math.random() > 0.6) {
              if (Math.random() < homeTeamSPIScore.spi) {
                homeScore += 1;
              }
            }

            ////////////////////////////////

            let awayGoalsCalc =
              awayTeamSPIScore.off * 100 * homeTeamSPIScore.def;
            awayGoalsCalc *= 0.01;
            let awayGoalsDecimal = awayGoalsCalc - Math.floor(awayGoalsCalc);
            let awayScore = Math.floor(awayGoalsCalc);

            if (Math.random() <= awayGoalsDecimal * 0.8) {
              awayScore += 1;
            }

            if (Math.random() > 0.9) {
              if (Math.random() < awayTeamSPIScore.spi) {
                awayScore += 1;
              }
            }

            $matchesStore[i][j].score.fullTime.homeTeam = homeScore;
            $matchesStore[i][j].score.fullTime.awayTeam = awayScore;

            addMatchData(teamshome, homeScore, teamsaway, awayScore, i);
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
    margin: 0 0 5px 0;
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
      margin: 0 7px 0 0;
      padding: 0 10px 0 10px;
    }
  }

  @media (min-width: 980px) {
    button {
      margin: 0 5px 0 0;
      width: 125px;
      padding: 0;
    }
  }

  @media (min-width: 1200px) {
    button {
      margin: 0 7px 0 0;
      min-width: 150px;
      padding: 0;
    }
  }
</style>

<button on:click={simulateSeason} hidden={!$view.matches}>
  Simulate season
</button>
