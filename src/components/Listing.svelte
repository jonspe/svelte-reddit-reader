<script>
  import Card from './Card.svelte';
  import { fetchPostListing } from '../api';

  const scrolledPromises = [];

  let lastRefreshed = 0;
  const handleScroll = async (event) => {
    const currentTime = Date.now();
    if (
      currentTime - lastRefreshed > 2000 &&
      window.innerHeight + window.pageYOffset >= document.body.offsetHeight
    ) {
      console.log('Bottom reached! Load more!');
      const lastPromise = await promises[promises.length - 1];
      promises = promises.concat(fetchPostListing(url, lastPromise.after));
      lastRefreshed = currentTime;
    }
  };

  export let url;
  $: promise = fetchPostListing(url);
  $: promises = [promise];
</script>

<svelte:window on:scroll={handleScroll} />

{#each promises as promise}
  {#await promise then listing}
    <div>
      {#each listing.children as post}
        <Card post={post.data} />
      {/each}
    </div>
  {/await}
{/each}

<style>
  div {
    column-count: 1;
    column-gap: 32px;
    margin-bottom: 32px;
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
