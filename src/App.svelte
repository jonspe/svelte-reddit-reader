<script>
  import Header from './Header.svelte'
  import Listing from './Listing.svelte'
</script>

<Header />
<main>
  <h1>Simple reddit reader.</h1>
  <Listing />
</main>
<footer>Made with Svelte, by Joona Perasto. 2021.</footer>

<style>
  :global(body) {
    padding: 0;
    background: #f4f4f4;
  }
  main {
    padding: 0 6rem;
    margin: 6rem auto;
    max-width: 2000px;
  }
  footer {
    text-align: center;
    padding: 1.2rem 0;
  }
  @media (max-width: 900px) {
    main {
      padding: 0 1rem;
    }
  }
</style>
