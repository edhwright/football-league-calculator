<script>
  import URL from "./URL.svelte";
</script>

<style>
  .footer {
    margin: 0;
    padding: 40px 0 0 0;
    font-size: 0.7rem;
    color: var(--theme-text);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }

  a {
    color: var(--theme-text);
  }

  @media (min-width: 980px) {
    .footer {
      padding: 70px 0 0 0;
      flex-direction: row;
      align-items: center;
    }
  }
</style>

<div class="footer">
  <div>
    Data provided by
    <a
      href="https://www.football-data.org/"
      target="_blank">football-data.org</a>.
  </div>
  <URL />
</div>
