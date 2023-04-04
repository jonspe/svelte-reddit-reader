<script>
  import Post from './components/Post.svelte';
  import Listing from './components/Listing.svelte';
  import { listingFetchPath, postPath } from './stores';
  import Navbar from './components/Navbar.svelte';
</script>

<header>
  <h1>reddit reader</h1>
  <Navbar />
</header>
<main>
  {#if $postPath}
    <Post url={$postPath} />
  {/if}
  <Listing url={$listingFetchPath} />
</main>
