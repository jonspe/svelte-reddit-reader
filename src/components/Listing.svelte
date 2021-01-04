<script>
  import Card from './Card.svelte'

  const getPosts = async function (url) {
    return fetch(`${url}.json`)
      .then((response) => response.json())
      .then((data) => data.data.children)
  }

  let lastRefreshed = 0
  const handleScroll = function (event) {
    const currentTime = Date.now()
    if (
      currentTime - lastRefreshed > 2000 &&
      window.innerHeight + window.pageYOffset >= document.body.offsetHeight
    ) {
      console.log('Bottom reached! Load more!')
      lastRefreshed = currentTime
    }
  }

  let promise = getPosts('https://www.reddit.com/')
</script>

<svelte:window on:scroll={handleScroll} />

{#await promise then posts}
  {#each posts as post}
    <Card post={post} />
  {/each}
{/await}
