<script>
  import { createEventDispatcher } from 'svelte';
  import { decodeHtml } from '../util';
  import { fetchPostWithComments } from '../api';
  import Comment from './Comment.svelte';

  const dispatch = createEventDispatcher();
  const closePost = () => dispatch('close');

  let post = {};
  let comments = [];

  export let url;

  $: if (url) {
    fetchPostWithComments(url).then((data) => {
      post = data.post;
      comments = data.comments;
    });
  }
</script>

<div class="modal-backdrop" on:click|stopPropagation={closePost}>
  <article on:click|stopPropagation>
    <header>
      <h2>{decodeHtml(post.title)}</h2>
    </header>
    <section class="container">
      <ul>
        {#each comments as comment}
          {#if comment.kind === 't1'}
            <Comment comment={comment.data} />
          {/if}
        {/each}
      </ul>
    </section>
    <footer>
      <a
        href={'https://www.reddit.com/u/' + post.author}><span>/u/{post.author}</span></a>
      <a on:click={closePost}>close post</a>
    </footer>
  </article>
</div>

<style>
  header {
    padding: 32px;
  }
  h2 {
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
    max-height: 640px;
    background: #f4f4f4;
  }
  .container > ul {
    padding: 0;
    margin: 0;
  }
</style>
