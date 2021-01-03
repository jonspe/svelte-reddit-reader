<script>
  import Header from './components/Header.svelte'
  import Listing from './components/Listing.svelte'
</script>

<main>
  <h1>Simple reddit reader.</h1>
  <Listing />
</main>
<footer>Made with Svelte, by Joona Perasto. 2021.</footer>

<style>
  main {
    padding: 0 8rem;
    margin: 6rem auto;
    max-width: 2000px;
  }
  footer {
    text-align: center;
    padding: 1.2rem 0;
  }
  @media (max-width: 70rem) {
    main {
      padding: 0 2rem;
    }
  }
  @media (max-width: 30rem) {
    main {
      padding: 0 0.6rem;
    }
  }
</style>
