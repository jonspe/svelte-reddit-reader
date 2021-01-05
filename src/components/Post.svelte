<script>
  import { createEventDispatcher } from 'svelte';
  import Comment from './Comment.svelte';
  import { getRedditUrl } from '../util';

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
  <div class="modal" on:click={closePost}>
    <div class="content" on:click|stopPropagation>
      <header>
        <h2>{post.title}</h2>
      </header>
      <section class="comments">
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
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 4;
    background: #00000088;
  }
  .modal > * {
    background: white;
    margin: 16px;
    max-width: 40rem;
    border-radius: 12px;
  }

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
  .comments {
    padding: 32px;
    max-height: 640px;
    overflow: auto;
    background: #f4f4f4;
  }
  .comments > ul {
    padding: 0;
    margin: 0;
  }
</style>
