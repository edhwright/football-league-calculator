<script>
  import { matchesStore, selected } from "../../stores.js";
  import { JSONCrush } from "../../JSONCrush.js";

  let stateObj = {
    matches: [],
  };

  let url = "";

  let generated = false;

  function generateURL() {
    updateStateScore();
    let stateCrushed = JSONCrush(JSON.stringify(stateObj));
    url = window.location.href + "?s=" + stateCrushed + "&l=" + $selected.id;
    generated = true;
    urlContainer.select();
    urlContainer.setSelectionRange(0, 99999);
  }

  function updateStateScore() {
    stateObj.matches = [];
    for (let i = 0; i < $matchesStore.length; i++) {
      let mw = [];
      for (let j = 0; j < $matchesStore[i].length; j++) {
        let homeScore = $matchesStore[i][j].score.fullTime.homeTeam;
        let awayScore = $matchesStore[i][j].score.fullTime.awayTeam;
        mw.push([homeScore, awayScore]);
      }
      stateObj.matches.push(mw);
    }
  }

  let urlContainer;

  function copy() {
    urlContainer.select();
    urlContainer.setSelectionRange(0, 99999);
    document.execCommand("copy");
    urlContainer.scrollTop = 0;
  }
</script>

<style>
  .url-generator {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 20px 0 0 0;
  }

  .shr-button {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .generated-url {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0 0 0;
  }

  .generate-button {
    background-color: var(--theme-foreground);
    border: 1px solid var(--theme-outline);
    color: var(--theme-text);
    cursor: pointer;
    margin: 0 0 0 10px;
  }

  .generate-button:hover {
    background-color: var(--theme-hover);
  }

  .generate-button:focus {
    box-shadow: 0 0 0 2px var(--theme-highlight);
    z-index: 5000;
  }

  .url {
    height: 40px;
    width: 100%;
    overflow: scroll;
    line-height: 40px;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-top: 1px solid var(--theme-outline);
    border-right: 1px solid var(--theme-outline);
    border-bottom: 1px solid var(--theme-outline);
    border-left: 0;
    background-color: var(--theme-foregroundLighter);
    color: var(--theme-text);
    margin: 0 5px 0 0;
  }

  .clipboard-button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    border: 0;
    background-color: var(--theme-background);
  }

  .clipboard-button:hover {
    background-color: var(--theme-buttonHover);
  }

  svg {
    stroke: var(--theme-icon);
  }

  svg:active {
    stroke: var(--theme-highlight);
  }

  .clipboard-button:focus {
    border: 2px solid var(--theme-highlight);
  }

  button,
  svg {
    display: inline-block;
    vertical-align: middle;
  }

  @media (min-width: 600px) {
    .url-generator {
      flex-direction: row;
      width: initial;
    }

    .url {
      width: 300px;
    }

    .generated-url {
      width: 345px;
      margin: 0;
    }
  }

  @media (min-width: 980px) {
    .url-generator {
      margin: 0;
    }
  }
</style>

<div class="url-generator">
  <div class="shr-button">
    <div>Share your results!</div>
    <button
      class="generate-button"
      on:click={generateURL}>{generated ? 'Re-generate' : 'Generate'}
      URL</button>
  </div>
  <div class="generated-url">
    {#if generated}
      <input class="url" bind:this={urlContainer} bind:value={url} />
      <button
        on:click={copy}
        title="copy to clipboard"
        class="clipboard-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="20px"
          height="20px">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </svg>
      </button>
    {/if}
  </div>
</div>
