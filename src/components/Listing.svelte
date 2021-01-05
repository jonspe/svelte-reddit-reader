<script>
  import Card from './Card.svelte';
  import { fetchPostListing } from '../api';

  let lastRefreshed = 0;
  const handleScroll = (event) => {
    const currentTime = Date.now();
    if (
      currentTime - lastRefreshed > 2000 &&
      window.innerHeight + window.pageYOffset >= document.body.offsetHeight
    ) {
      console.log('Bottom reached! Load more!');
      lastRefreshed = currentTime;
    }
  };

  export let url;
  $: promise = fetchPostListing(url);
</script>

<svelte:window on:scroll={handleScroll} />

<div>
  {#await promise then posts}
    {#each posts as post}
      <Card post={post} />
    {/each}
  {/await}
</div>

<style>
  div {
    column-count: 1;
    column-gap: 32px;
  }
  @media (min-width: 46rem) {
    div {
      column-count: 2;
    }
  }
  @media (min-width: 90rem) {
    div {
      column-count: 3;
    }
  }
  @media (min-width: 120rem) {
    div {
      column-count: 4;
    }
  }
</style>
