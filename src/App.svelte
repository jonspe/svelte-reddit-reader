<script>
  import Header from './components/Header.svelte'
  import Listing from './components/Listing.svelte'
</script>

<main>
  <h1>frontpage</h1>
  <Listing />
</main>
<footer>Made with Svelte, by Joona Perasto. 2021.</footer>

<style>
  main {
    padding: 0 8rem;
    margin: 128px auto;
    max-width: 2000px;
  }
  h1 {
    margin: 3rem 0;
  }
  footer {
    text-align: center;
    padding: 1.2rem 0;
  }
  @media (max-width: 70rem) {
    main {
      padding: 0 32px;
    }
  }
  @media (max-width: 30rem) {
    main {
      padding: 0 12px;
    }
  }
</style>
