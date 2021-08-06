<script>
  import { link } from 'svelte-spa-router';
  import { formatRedditHtml, getDurationString, getUtcDate } from '../util';

  export let comment;
  $: collapsed = comment.depth === 2 || comment.depth === 5;
  $: postDate = getDurationString(getUtcDate(comment.created_utc), new Date());
  $: replies = comment.replies
    ? comment.replies.children.filter((r) => r.kind === 't1')
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
      <a use:link class="author" href={'/user/' + comment.author}>
        {comment.author}
      </a>
    {/if}
    <span class="score">{comment.score} points</span>
    <span class="time">{postDate}</span>
    {#if replies.length !== 0}
      <button
        aria-label={collapsed ? 'Expand' : 'Collapse'}
        on:click={toggleCollapsed}
        class:first={comment.depth === 0}>
        {#if collapsed}[+]{:else}[-]{/if}
      </button>
    {/if}
  </header>
  <section class="text-content" on:click={toggleCollapsed}>
    {@html formatRedditHtml(comment.body_html)}
  </section>
  {#if replies.length !== 0 && !collapsed}
    <ul>
      {#each replies as reply}
        <svelte:self comment={reply} />
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
  li:last-child {
    margin-bottom: 0rem;
  }
  header > a {
    color: black;
  }
  button {
    font-family: monospace;
    position: absolute;
    left: -1.7rem;
    top: 0.25rem;
    background: transparent;
    border: 0;
    padding: 0;
    margin: 0;
    color: #888;
  }
  button:active {
    background: transparent;
  }
  button:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  header {
    margin-bottom: 0.3rem;
  }
  section {
    position: relative;
  }
  .author {
    font-weight: bold;
  }
  @media (max-width: 30rem) {
    ul {
      padding-left: 1rem;
    }
    button.first {
      display: none;
    }
  }
</style>
