<script>
  import PostCard from './PostCard.svelte'

  const getPosts = async function (url) {
    return fetch(`${url}.json`)
      .then((response) => response.json())
      .then((data) => data.data.children)
  }

  let promise = getPosts('https://www.reddit.com/')
</script>

{#await promise then posts}
  <ul>
    {#each posts as post}
      <PostCard post={post} />
    {/each}
  </ul>
{/await}

<style>
  ul {
    column-count: 1;
    column-gap: 32px;
    padding: 0;
  }
  @media (min-width: 46rem) {
    ul {
      column-count: 2;
    }
  }
  @media (min-width: 90rem) {
    ul {
      column-count: 3;
    }
  }
  @media (min-width: 120rem) {
    ul {
      column-count: 4;
    }
  }
</style>
