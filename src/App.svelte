<script>
  import Post from './components/Post.svelte';
  import Listing from './components/Listing.svelte';
  import { listingFetchPath, postPath } from './stores';
</script>

<header>
  <h1>reddit reader</h1>
</header>
<main>
  {#if $postPath}
    <Post url={$postPath} />
  {/if}
  <Listing url={$listingFetchPath} />
</main>
<footer>Made with Svelte, by Joona Perasto. 2021.</footer>
