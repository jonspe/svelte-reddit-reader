<script>
  import Card from './Card.svelte'

  const getPosts = async function (url) {
    return fetch(`${url}.json`)
      .then((response) => response.json())
      .then((data) => data.data.children)
  }

  let promise = getPosts('https://www.reddit.com/')
</script>

{#await promise then posts}
  {#each posts as post}
    <Card post={post} />
  {/each}
{/await}
