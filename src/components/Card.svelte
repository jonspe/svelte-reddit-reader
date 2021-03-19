<script>
  import { fly } from 'svelte/transition';
  import { getDurationString, getUtcDate, decodeHtml } from '../util';
  import Preview from './Preview.svelte';

  export let post;
  export let showSubreddit;
  export let index = 0;
  $: postDate = getDurationString(getUtcDate(post.created_utc), new Date());
  $: animationDelay = index * 26;
</script>

<article in:fly={{ y: 100, duration: 600, delay: animationDelay }}>
  <header>
    <a href={'#' + post.permalink}>
      <h2>{decodeHtml(post.title || post.link_title)}</h2>
      <div class="banner">
        <span>{post.score} points</span>
        <span>{postDate}</span>
      </div>
    </a>
  </header>
  <Preview {post} />
  <footer>
    {#if showSubreddit}
      <a href={'#/r/' + post.subreddit}>at {post.subreddit}</a>
    {:else}<a href={'#/user/' + post.author}>by {post.author}</a>{/if}
    <a href={'#' + post.permalink}>{post.num_comments} comments</a>
  </footer>
</article>

<style>
  article > * > a {
    display: block;
  }
  article {
    background: white;
    box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.15);
    border-radius: 12px;
    break-inside: avoid;
    margin-bottom: 32px;
  }
  h2 {
    margin: 0;
    padding: 1rem 1.2rem 0.4rem 1.2rem;
    font-size: 1.2rem;
    font-weight: 600;
  }
  .banner {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 1.2rem 1rem 1.2rem;
  }
  .banner > * {
    margin: 0;
    display: inline-block;
  }
  footer {
    display: flex;
    justify-content: space-between;
  }
  footer > a {
    padding: 1rem 1.2rem;
    white-space: nowrap;
  }
  footer > a:first-child {
    flex: 0 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 30rem) {
    article {
      margin-bottom: 16px;
    }
  }
</style>
