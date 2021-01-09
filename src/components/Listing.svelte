<script>
  import { fade } from 'svelte/transition';
  import { link } from 'svelte-spa-router';
  import Card from './Card.svelte';
  import { fetchPostListing } from '../api';
  import { onInterval } from '../util';

  const FETCH_MARGIN = 1600;
  const FETCH_DELAY = 4000;
  const FETCH_INTERVAL = 400;

  const isScrolledToBottom = () => {
    return (
      window.innerHeight + window.pageYOffset >=
      document.body.offsetHeight - FETCH_MARGIN
    );
  };

  let lastRefreshed = Date.now();
  let fetching = true;

  const afterFetch = (result) => {
    fetching = false;
    lastRefreshed = Date.now();
    return Promise.resolve(result);
  };

  onInterval(async () => {
    const currentTime = Date.now();
    if (
      currentTime - lastRefreshed > FETCH_DELAY &&
      isScrolledToBottom() &&
      !fetching
    ) {
      try {
        const lastListing = await promises[promises.length - 1];
        if (lastListing) {
          if (lastListing.after) {
            lastRefreshed = currentTime;
            promises = promises.concat(
              fetchPostListing(url, lastListing.after).then(afterFetch)
            );
          } else {
            fetching = true;
            promises = promises.concat(Promise.reject(Error('end')));
          }
        }
      } catch {}
    }
  }, FETCH_INTERVAL);

  export let url;
  $: promise = fetchPostListing(url).then(afterFetch);
  $: promises = [promise];
  $: url, (lastRefreshed = Date.now());
</script>

{#each promises as promise}
  {#await promise then listing}
    <div class="card-columns" out:fade>
      {#each listing.children as post, i}
        <Card post={post.data} index={i} />
      {/each}
    </div>
  {:catch err}
    <span style="color: red">
      {#if err.reason === 'banned'}
        This subreddit has been banned.
      {:else if err.message === 'empty'}
        This subreddit is empty.
      {:else if err.message === 'end'}
        No more posts to load.
      {:else}An error occurred fetching the subreddit listing. {err}{/if}
    </span>
    <br />
    <a use:link href="/">Return to frontpage</a>
  {/await}
{/each}
