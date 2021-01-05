<script>
  import Card from './Card.svelte';

  const fetchPostListing = async (url) => {
    return fetch(`${url}.json`)
      .then((response) => response.json())
      .then((data) => data.data.children.map((datamodel) => datamodel.data));
  };

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

{#await promise then posts}
  {#each posts as post}
    <Card post={post} on:view />
  {/each}
{/await}
