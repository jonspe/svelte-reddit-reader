<script>
  import { link } from 'svelte-spa-router';
  import { formatRedditHtml, getDurationString, getUtcDate } from '../util';

  let collapsed = false;
  export let comment;
  $: postDate = getDurationString(getUtcDate(comment.created_utc), new Date());
  $: replies = comment.replies
    ? comment.replies.data.children.filter((r) => r.kind === 't1')
    : [];

  function toggleCollapsed() {
    collapsed = !collapsed;
  }
</script>

<li>
  <header>
    {#if comment.author === '[deleted]'}
      <span class="author">[deleted]</span>
    {:else}
      <a
        use:link
        class="author"
        href={'/user/' + comment.author}>{comment.author}</a>
    {/if}
    <span class="score">{comment.score} points</span>
    <span class="time">{postDate}</span>
  </header>
  {#if comment.depth <= 3 && replies.length !== 0}
    <button on:click={toggleCollapsed}>
      {#if collapsed}^{:else}v{/if}
    </button>
  {/if}
  <section class="text-content">
    {@html formatRedditHtml(comment.body_html)}
  </section>
  {#if replies.length !== 0 && comment.depth <= 3 && !collapsed}
    <ul>
      {#each replies as reply}
        <svelte:self comment={reply.data} />
      {/each}
    </ul>
  {/if}
</li>

<style>
  ul {
    padding-left: 1.6rem;
    margin: 1rem 0 0 0;
  }
  li {
    position: relative;
    list-style-type: none;
    margin-bottom: 1rem;
  }
  button {
    position: absolute;
    left: -1.8rem;
    top: 0;
    background: #f4f4f4;
    border: 0;
    width: 1.6rem;
    height: 1.6rem;
    padding: 0;
    color: #888;
  }
  button:hover {
    background: #ffffff;
  }
  button:active {
    background: #e0e0e0;
  }
  header {
    margin-bottom: 0.3rem;
  }
  .author {
    font-weight: bold;
  }
</style>
