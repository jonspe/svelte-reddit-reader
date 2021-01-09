<script>
  import { fly, slide } from 'svelte/transition';
  import { quartInOut } from 'svelte/easing';
  import { decodeHtml } from '../util';
  import { fetchPostWithComments } from '../api';
  import { listingPath } from '../stores';
  import { link, push } from 'svelte-spa-router';
  import Comment from './Comment.svelte';

  export let url;
  $: promise = fetchPostWithComments(url);
</script>

<div class="modal-backdrop" on:click={() => push($listingPath)}>
  <article on:click|stopPropagation transition:fly={{ y: 60, duration: 300 }}>
    <header>
      <h2>
        {#await promise}
          Loading...
        {:then data}
          {decodeHtml(data.post.title)}
        {/await}
      </h2>
    </header>
    <section>
      {#await promise}
        <div class="container">Loading comments...</div>
      {:then data}
        <ul
          class="container"
          in:slide={{ delay: -360, duration: 1000, easing: quartInOut }}>
          {#each data.comments as comment}
            {#if comment.kind === 't1'}
              <Comment comment={comment.data} />
            {/if}
          {/each}
        </ul>
      {/await}
    </section>

    <footer>
      {#await promise}
        <span>...</span>
      {:then data}
        <a use:link href={'/user/' + data.post.author}>/u/{data.post.author}</a>
      {/await}
      <a use:link href={$listingPath}>close post</a>
    </footer>
  </article>
</div>

<style>
  header {
    padding: 24px 32px;
  }
  h2 {
    font-size: 1.2rem;
    margin: 0;
  }
  footer {
    display: flex;
    justify-content: space-between;
  }
  footer > * {
    display: block;
    padding: 1rem 1.2rem;
  }
  section {
    background: #f4f4f4;
  }
  .container {
    padding: 1.6rem 2rem !important;
    min-height: 4.2rem;
    max-height: min(60vh, 640px);
    overflow-y: scroll;
  }
  ul {
    margin: 0;
  }
  article {
    background: white;
    max-width: 40rem;
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 0 0 8000px #00000066;
  }
  @media (max-width: 30rem) {
    article {
      width: 100%;
    }
    header,
    footer > * {
      padding: 16px;
    }
    .container {
      padding: 1rem !important;
      min-height: 3.2rem;
    }
  }
</style>
