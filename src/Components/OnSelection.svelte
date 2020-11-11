<script>
  import Main from "./Main.svelte";
  import Header from "./Header/Header.svelte";
  import Footer from "./Footer/Footer.svelte";
  import { selected, fetchState, urlStore } from "../stores.js";
</script>

<style>
</style>

<Header />
{#if $selected !== 'selectInit'}
  <Main />
{/if}
{#if $fetchState === 'DONE'}
  <Footer />
{/if}
