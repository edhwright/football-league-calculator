<script>
  import { selected, needTieBreaker } from "../../stores.js";

  export let champion;
  export let relegated;
  export let team;
  export let i;

  let crest = team.crestURL;

  $: p = team.played.reduce(function (a, b) {
    return a + b;
  }, 0);
  $: w = team.won.reduce(function (a, b) {
    return a + b;
  }, 0);
  $: d = team.drawn.reduce(function (a, b) {
    return a + b;
  }, 0);
  $: l = team.lost.reduce(function (a, b) {
    return a + b;
  }, 0);
  $: gf = team.goalsfor.reduce(function (a, b) {
    return a + b;
  }, 0);
  $: ga = team.goalsagainst.reduce(function (a, b) {
    return a + b;
  }, 0);
  $: gd = gf - ga;
  $: pts = team.points.reduce(function (a, b) {
    return a + b;
  }, 0);

  let idKey = team.id.toString();

  let bgcolour;
  let shadow = "2px 0px rgba(60, 64, 67, 0.15)";
  let textcolour = "var(--theme-text)";
  $: if (champion && i === 0) {
    bgcolour = $selected.borderCol[i];
    textcolour = "rgb(2,32,71)";
    shadow = "3px 0px " + $selected.borderCol[i];
  } else {
    bgcolour = "var(--theme-foreground)";
    textcolour = "var(--theme-text)";
    shadow = "2px 0px rgba(60, 64, 67, 0.15)";
  }

  let positionColour;
  $: if ($selected.borderCol[i]) {
    positionColour = $selected.borderCol[i];
  } else {
    positionColour = "var(--theme-foreground)";
  }

  $: for (let j = 0; j < relegated.length; j++) {
    if (i + 1 === $selected.rel[j]) {
      if (relegated[j]) {
        bgcolour = $selected.borderCol[i];
        textcolour = "#ffebee";
        shadow = "3px 0px " + $selected.borderCol[i];
      } else {
        bgcolour = "var(--theme-foreground)";
        textcolour = "var(--theme-text)";
        shadow = "2px 0px rgba(60, 64, 67, 0.15)";
      }
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
    box-sizing: border-box;
    border-top: 2px solid var(--theme-tableBorder);
    font-size: 0.9rem;
    color: var(--textcolour);
    background-color: var(--bgcolour);
    -webkit-box-shadow: 0px 1px var(--shadow);
    -moz-box-shadow: 0px 1px var(--shadow);
    box-shadow: 0px 1px var(--shadow);
  }

  .position-colour {
    min-width: 3px;
    background-color: var(--position-colour);
  }

  .club {
    width: 100%;
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

  img {
    max-width: 20px;
    max-height: 20px;
    height: auto;
    width: auto;
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
  }

  @media (min-width: 980px) {
    .name-short {
      display: none;
    }

    .name {
      display: table-cell;
    }
  }
</style>

<tr
  style="--shadow: {shadow}; --bgcolour: {bgcolour}; --textcolour: {textcolour};">
  <td class="position-colour" style="--position-colour: {positionColour}" />
  <td class="number position">
    {#if $needTieBreaker[idKey]}
      -
    {:else if champion && i === 0}🏆{:else}{i + 1}{/if}
  </td>
  <td class="crest number"><img src={crest} alt="" /></td>
  <td class="club name" style="--bg-color: {bgcolour}">{team.name}</td>
  <td class="club name-short">{team.shortName}</td>
  <td class="number played">{p}</td>
  <td class="number won">{w}</td>
  <td class="number drawn">{d}</td>
  <td class="number lost">{l}</td>
  <td class="number goals-for">{gf}</td>
  <td class="number goals-against">{ga}</td>
  <td class="number goal-difference">{gd}</td>
  <td class="number points">{pts}</td>
</tr>
