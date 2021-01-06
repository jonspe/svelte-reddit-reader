<script>
  import { fly, fade } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  import { decodeHtml } from '../util';
  import { fetchPostWithComments } from '../api';
  import Comment from './Comment.svelte';

  const dispatch = createEventDispatcher();
  const closePost = () => dispatch('close');

  export let url;
  $: promise = fetchPostWithComments(url);
</script>

<div class="modal-backdrop" on:click|stopPropagation={closePost}>
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
    <section class="container">
      {#await promise}
        Loading comments...
      {:then data}
        <ul>
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
        <a href="javascript: void(0);">/u/...</a>
      {:then data}
        <a
          href={'https://www.reddit.com/u/' + data.post.author}><span>/u/{data.post.author}</span></a>
      {/await}
      <a on:click={closePost}>close post</a>
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
  .container {
    padding: 1.6rem 2rem;
    height: min(60vh, 640px);
    background: #f4f4f4;
  }
  .container > ul {
    padding: 0;
    margin: 0;
  }
  article {
    background: white;
    margin: 16px;
    max-width: 40rem;
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 0 0 8000px #00000066;
  }
  @media (max-width: 30rem) {
    article {
      margin: 8px;
      width: 100%;
    }
    .container,
    header,
    footer > * {
      padding: 16px;
    }
  }
</style>
