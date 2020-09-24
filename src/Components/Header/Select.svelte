<script>
  import {
    premBorCol,
    champBorCol,
    ligueBorCol,
    bundesBorCol,
  } from "../../borderColours.js";
  import { selected, fetchState } from "../../stores.js";
  import { plSort } from "../../utils.js";
  import { getContext } from "svelte";
  const { theme } = getContext("theme");

  let leagues = [
    {
      id: "EN1",
      name: "Premier League",
      group: "England",
      code: 2021,
      gw: 38,
      rel: [18, 19, 20],
      lsp: 17,
      sort: plSort,
      borderCol: premBorCol,
    },
    {
      id: "EN2",
      name: "Championship",
      group: "England",
      code: 2016,
      gw: 46,
      rel: [22, 23, 24],
      lsp: 21,
      sort: plSort,
      borderCol: champBorCol,
    },
    {
      id: "FR1",
      name: "Ligue 1",
      group: "France",
      code: 2015,
      gw: 38,
      rel: [18, 19, 20],
      lsp: 17,
      sort: plSort,
      borderCol: ligueBorCol,
    },
    {
      id: "GE1",
      name: "Bundesliga",
      group: "Germany",
      code: 2002,
      gw: 34,
      rel: [16, 17, 18],
      lsp: 15,
      sort: plSort,
      borderCol: bundesBorCol,
    },
  ];
</script>

<style>
  select {
    background-color: var(--theme-foreground);
    color: var(--theme-text);
    border: 1px solid var(--theme-outline);
    cursor: pointer;
  }

  select:hover {
    background-color: var(--theme-hover);
  }

  select:focus {
    outline: 2px solid var(--theme-highlight);
  }

  .light {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='9.15'%3e%3cpath fill='rgb(139,139,139)' d='M8.76,8.82,15.67,2a1.12,1.12,0,0,0,0-1.59,1.11,1.11,0,0,0-1.58,0L8,6.44,1.92.33A1.12,1.12,0,0,0,.33.33a1.11,1.11,0,0,0,0,1.58l6.85,6.9A1.16,1.16,0,0,0,8,9.15a1.11,1.11,0,0,0,.79-.33'/%3e%3c/svg%3e");
  }

  .dark {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='9.15'%3e%3cpath fill='rgb(37,204,146)' d='M8.76,8.82,15.67,2a1.12,1.12,0,0,0,0-1.59,1.11,1.11,0,0,0-1.58,0L8,6.44,1.92.33A1.12,1.12,0,0,0,.33.33a1.11,1.11,0,0,0,0,1.58l6.85,6.9A1.16,1.16,0,0,0,8,9.15a1.11,1.11,0,0,0,.79-.33'/%3e%3c/svg%3e");
  }

  option {
    background-color: var(--theme-background);
    color: var(--theme-text);
  }
</style>

<select
  bind:value={$selected}
  class={$theme.name === 'light' ? 'light' : 'dark'}
  disabled={$fetchState === 'LOADING'}>
  <option selected disabled value="selectInit">Select a league</option>
  <optgroup label={leagues[0].group}>
    <option value={leagues[0]}>{leagues[0].name}</option>
    <option value={leagues[1]}>{leagues[1].name}</option>
  </optgroup>
  <optgroup label={leagues[2].group}>
    <option value={leagues[2]}>{leagues[2].name}</option>
  </optgroup>
  <optgroup label={leagues[3].group}>
    <option value={leagues[3]}>{leagues[3].name}</option>
  </optgroup>
</select>
