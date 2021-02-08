<script>
  import { tableUpdated } from "../../stores.js";
  import { teamIdToObjectLookup } from "../../fetchData.js";
  import { addMatchData, removeMatchData } from "../../utils.js";

  export let status;
  export let score;
  export let homeTeam;
  export let awayTeam;
  export let matchweek;

  $: homeScore = score.fullTime.homeTeam;
  $: awayScore = score.fullTime.awayTeam;

  $: teamshome = teamIdToObjectLookup.get(homeTeam.id);
  $: teamsaway = teamIdToObjectLookup.get(awayTeam.id);

  let canEdit;

  let homeactive = false;
  let awayactive = false;

  $: if (status === "FINISHED") {
    canEdit = false;
  } else {
    canEdit = true;
  }

  let homeInputBG;
  let homeInputText;

  let awayInputBG;
  let awayInputText;

  $: if (canEdit === false) {
    homeInputBG = "var(--theme-foreground)";
    homeInputText = "var(--theme-text)";

    awayInputBG = "var(--theme-foreground)";
    awayInputText = "var(--theme-text)";
  }

  $: if (
    score.fullTime.homeTeam == null &&
    homeactive === false &&
    canEdit === true
  ) {
    homeInputBG = "var(--theme-inputNull)";
  } else if (homeactive === false && canEdit === true) {
    homeInputBG = "var(--theme-input)";
    homeInputText = "var(--theme-inputText)";
  }

  $: if (
    score.fullTime.awayTeam == null &&
    awayactive === false &&
    canEdit === true
  ) {
    awayInputBG = "var(--theme-inputNull)";
  } else if (awayactive === false && canEdit === true) {
    awayInputBG = "var(--theme-input)";
    awayInputText = "var(--theme-inputText)";
  }

  $: if (homeactive === true) {
    homeInputBG = "var(--theme-inputSelected)";
    homeInputText = "var(--theme-inputText)";
  }

  $: if (awayactive === true) {
    awayInputBG = "var(--theme-inputSelected)";
    awayInputText = "var(--theme-inputText)";
  }

  $: if (homeScore != null && awayScore != null && canEdit) {
    addMatchData(teamshome, homeScore, teamsaway, awayScore, matchweek - 1);
    $tableUpdated = true;
  }

  $: if (homeScore == null || awayScore == null) {
    removeMatchData(teamshome, teamsaway, matchweek - 1);
    $tableUpdated = true;
  }

  function onHomeChange() {
    if (score.fullTime.homeTeam > 9) {
      score.fullTime.homeTeam = 9;
    }

    if (score.fullTime.homeTeam < 0) {
      score.fullTime.homeTeam = 0;
    }
  }

  function onAwayChange() {
    if (score.fullTime.awayTeam > 9) {
      score.fullTime.awayTeam = 9;
    }

    if (score.fullTime.awayTeam < 0) {
      score.fullTime.awayTeam = 0;
    }
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
    -webkit-box-shadow: 0px 1px 2px 0px rgba(60, 64, 67, 0.15);
    -moz-box-shadow: 0px 1px 2px 0px rgba(60, 64, 67, 0.15);
    box-shadow: 0px 1px 2px 0px rgba(60, 64, 67, 0.15);
    font-size: 0.9rem;
    color: var(--theme-text);
    background: var(--theme-foreground);
  }

  td img {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  img {
    max-width: 20px;
    max-height: 20px;
    height: auto;
    width: auto;
  }

  .crest {
    min-width: 30px;
  }

  .name {
    width: 100%;
    min-width: 200px;
  }

  .home-border-name {
    border-top: 2px solid var(--theme-matchesBorder);
    border-bottom: 2px solid var(--theme-foreground);
  }

  .away-border-name {
    border-top: 2px solid var(--theme-foreground);
  }

  .home-border-score {
    border-top: 2px solid var(--theme-matchesBorder);
    border-bottom: 2px solid var(--bg-color);
  }

  .away-border-score {
    border-top: 2px solid var(--bg-color);
    /* border-bottom: 2px solid var(--theme-matchesBorder); */
  }

  .scoreContainer {
    min-width: 40px !important;
  }

  .team-score {
    margin: 0px;
    padding: 0px;
    width: 100%;
    height: 100%;
    border: 0px;
    border-radius: 0px;
    text-align: center;
  }

  .home-score {
    background: var(--bg-color);
    color: var(--text-color);
    -webkit-text-fill-color: var(--text-color);
    opacity: 1; /* required on iOS */
  }

  .away-score {
    background: var(--bg-color);
    color: var(--text-color);
    -webkit-text-fill-color: var(--text-color);
    opacity: 1; /* required on iOS */
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }

  input:focus {
    z-index: 1;
    position: relative;
    outline: 2px solid auto;
  }
</style>

<tr class="home">
  <td class="crest club home-border-name">
    <img src={teamshome.crestURL} alt="" />
  </td>
  <td class="name club home-border-name">{teamshome.name}</td>
  <td
    class="scoreContainer home-border-score"
    style=" --bg-color: {homeInputBG}; --text-color: {homeInputText}">
    <input
      type="number"
      min="0"
      max="9"
      class="team-score home-score"
      bind:value={score.fullTime.homeTeam}
      on:focusin={() => (homeactive = true)}
      on:focusout={() => (homeactive = false)}
      on:change={onHomeChange}
      disabled={!canEdit} />
  </td>
</tr>
<tr class="away">
  <td class="crest club away-border-name">
    <img src={teamsaway.crestURL} alt="" />
  </td>
  <td class="name club away-border-name">{teamsaway.name}</td>
  <td
    class="scoreContainer away-border-score"
    style="--bg-color: {awayInputBG}; --text-color: {awayInputText}">
    <input
      type="number"
      min="0"
      max="9"
      class="team-score away-score"
      bind:value={score.fullTime.awayTeam}
      on:focusin={() => (awayactive = true)}
      on:focusout={() => (awayactive = false)}
      on:change={onAwayChange}
      disabled={!canEdit} />
  </td>
</tr>
