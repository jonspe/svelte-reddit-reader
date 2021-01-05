<script>
  import { formatRedditHtml, getDurationString, getUtcDate } from '../util';

  export let comment;
  $: postDate = getDurationString(getUtcDate(comment.created_utc), new Date());
</script>

<li>
  <header>
    <a
      class="author"
      href={'https://www.reddit.com/u/' + comment.author}>{comment.author}</a>
    <span class="score">{comment.score} points</span>
    <span class="time">{postDate}</span>
  </header>
  <section class="text-content">
    {@html formatRedditHtml(comment.body_html)}
  </section>
  {#if comment.replies}
    <ul>
      {#each comment.replies.data.children as reply}
        {#if reply.kind === 't1'}
          <svelte:self comment={reply.data} />
        {/if}
      {/each}
    </ul>
  {/if}
</li>

<style>
  ul {
    padding-left: 0.8rem;
    margin: 1rem 0 0 0;
  }
  li {
    list-style-type: none;
    margin-bottom: 1rem;
  }
  header {
    margin-bottom: 0.5rem;
  }
  .author {
    font-weight: bold;
  }
</style>
