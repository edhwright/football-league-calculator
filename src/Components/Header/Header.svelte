<script>
  import Select from "./Select.svelte";
  import ThemeToggle from "./ThemeToggle.svelte";
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 20px;
  }

  .select {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0px;
    margin-bottom: 1em;
    font-size: 1em;
    color: var(--theme-text);
    width: 100%;
  }

  .theme-desktop {
    display: none;
  }

  .theme-mobile {
    display: inline-flex;
  }

  @media (min-width: 640px) {
    .container {
      flex-direction: row;
    }

    .title {
      margin-bottom: 0;
      width: auto;
    }

    .select {
      width: 376px;
    }

    .theme-mobile {
      display: none;
    }

    .theme-desktop {
      display: inline-flex;
      margin-right: 1em;
    }
  }

  @media (min-width: 980px) {
    .container {
      margin-bottom: 40px;
    }
  }
</style>

<header class="container">
  <div class="title">
    <div>Football League Calculator</div>
    <div class="theme-mobile">
      <ThemeToggle />
    </div>
  </div>
  <div class="select">
    <div class="theme-desktop">
      <ThemeToggle />
    </div>
    <Select />
  </div>
</header>
