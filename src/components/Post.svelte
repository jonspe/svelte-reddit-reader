<script>
  import { createEventDispatcher } from 'svelte';
  import Comment from './Comment.svelte';
  import { getRedditUrl, decodeHtml } from '../util';

  const dispatch = createEventDispatcher();
  const closePost = () => dispatch('close');

  const fetchPostWithComments = async (url) => {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => ({
        post: data[0].data.children[0].data,
        comments: data[1].data.children,
      }));
  };

  let post = {};
  let comments = [];
  export let permalink;
  export let visible = false;

  $: jsonUrl = getRedditUrl(permalink + '.json');
  $: if (permalink) {
    fetchPostWithComments(jsonUrl).then((data) => {
      post = data.post;
      comments = data.comments;
    });
  }
</script>

{#if visible}
  <div class="modal-backdrop" on:click={closePost}>
    <div on:click|stopPropagation>
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
        <a href="/"><span>/r/{post.subreddit}</span></a><a href="/">another link</a>
      </footer>
    </div>
  </div>
{/if}

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
