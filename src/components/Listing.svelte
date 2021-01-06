<script>
  import { onDestroy } from 'svelte';
  import Card from './Card.svelte';
  import { fetchPostListing } from '../api';

  let lastRefreshed = Date.now();
  const scrollInterval = setInterval(async () => {
    const currentTime = Date.now();
    if (
      currentTime - lastRefreshed > 4000 &&
      window.innerHeight + window.pageYOffset >= document.body.offsetHeight
    ) {
      const lastPromise = await promises[promises.length - 1];
      promises = promises.concat(fetchPostListing(url, lastPromise.after));
      lastRefreshed = currentTime;
    }
  }, 500);

  onDestroy(() => clearInterval(scrollInterval));

  export let url;
  $: promise = fetchPostListing(url);
  $: promises = [promise];
  $: url, (lastRefreshed = Date.now());
</script>

{#each promises as promise}
  {#await promise then listing}
    <div>
      {#each listing.children as post, i}
        <Card post={post.data} index={i} />
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
