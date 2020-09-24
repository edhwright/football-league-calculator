<style>
  div {
    margin: 0px;
    padding: 0px;
  }

  .loading-bar {
    width: 180px;
    height: 5px;
    background: var(--theme-foreground);
    position: relative;
    overflow: hidden;
  }

  .loading-bar::before {
    content: "";
    width: 180px;
    height: 5px;
    background: var(--theme-highlight);
    position: absolute;
    left: -90px;
    animation: bluebar 2s infinite ease;
  }

  @keyframes bluebar {
    50% {
      left: 90px;
    }
  }
</style>

<div class="loading-bar" />
