<script>
  import { fly } from 'svelte/transition';
  import {
    getDurationString,
    getUtcDate,
    decodeHtml,
    formatRedditHtml,
  } from '../util';

  export let post;
  export let kind;
  export let index = 0;
  $: postDate = getDurationString(getUtcDate(post.created_utc), new Date());
  $: animationDelay = index * 26;
  $: preview = getPostPreviewImage(post);

  // Gets the best option for preview image considering quality and content type
  function getPostPreviewImage(post) {
    const thumb = { width: 300, height: 200 };
    if (post.preview !== undefined) {
      const imageObj = post.preview.images[0];
      const res = imageObj.resolutions;
      const image =
        res.length !== 0 ? res[Math.min(2, res.length - 1)] : imageObj.source;
      return {
        width: image.width,
        height: image.height,
        src: decodeHtml(image.url),
      };
    } else if (post.thumbnail === 'nsfw') {
      return { ...thumb, src: 'https://www.reddit.com/static/nsfw2.png' };
    } else if (post.thumbnail === 'default') {
      return { ...thumb, src: 'https://www.reddit.com/static/noimage.png' };
    } else if (post.thumbnail === 'self') {
      return {
        ...thumb,
        src: 'https://www.reddit.com/static/self_default2.png',
      };
    }
    return { ...thumb, src: post.thumbnail };
  }
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
  {#if kind === 't1'}
    <section class="container">
      <div class="text-content">
        {@html formatRedditHtml(post.body_html)}
      </div>
    </section>
  {:else if kind === 't3'}
    {#if !post.is_self}
      <section class="image-container">
        <a href={post.url_overridden_by_dest || post.url} target="_blank">
          <img {...preview} alt="" />
        </a>
      </section>
    {:else if post.is_self && !post.selftext_html}
      <section class="image-container">
        <a href={post.permalink}> <img {...preview} alt="" /> </a>
      </section>
    {:else if post.is_self && post.selftext_html}
      <section class="container">
        <div class="text-content">
          {@html formatRedditHtml(post.selftext_html)}
        </div>
      </section>
    {/if}
  {:else}Unknown type{/if}
  <footer>
    <a href={'#/r/' + post.subreddit}>/r/{post.subreddit}</a>
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
  .container {
    max-height: min(50vh, 560px);
    scrollbar-width: thin;
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
  }
  .text-content {
    padding: 1rem 1.2rem;
  }
  .image-container img {
    max-height: min(45vh, 560px);
    width: 100%;
    height: auto;
    object-fit: cover;
    display: block;
  }
  footer {
    display: flex;
    justify-content: space-between;
  }
  footer > a {
    padding: 1rem 1.2rem;
  }
  footer > a:first-child {
    max-width: 45%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media (max-width: 30rem) {
    article {
      margin-bottom: 16px;
    }
  }
</style>
