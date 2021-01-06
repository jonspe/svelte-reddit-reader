<script>
  import {
    getDurationString,
    getUtcDate,
    decodeHtml,
    formatRedditHtml,
  } from '../util';

  // Gets the best option for preview image considering quality and content type
  const getPostPreviewImage = (post) => {
    if (post.preview !== undefined) {
      const resolutions = post.preview.images[0].resolutions;
      const imageUrl = resolutions[Math.min(2, resolutions.length - 1)].url;
      return decodeHtml(imageUrl);
    } else if (post.thumbnail === 'nsfw') {
      return 'https://www.reddit.com/static/nsfw2.png';
    } else if (post.thumbnail === 'default') {
      return 'https://www.reddit.com/static/noimage.png';
    } else if (post.thumbnail === 'self') {
      return 'https://www.reddit.com/static/self_default2.png';
    }
    return post.thumbnail;
  };

  export let post;
  $: postDate = getDurationString(getUtcDate(post.created_utc), new Date());
</script>

<article>
  <header>
    <a href={'#' + post.permalink}>
      <h2>{decodeHtml(post.title)}</h2>
      <div class="banner">
        <span>{post.score} points</span>
        <span>{postDate}</span>
      </div>
    </a>
  </header>
  {#if !post.is_self}
    <section class="image-container">
      <a href={post.url_overridden_by_dest || post.url} target="_blank">
        <img src={getPostPreviewImage(post)} alt="" />
      </a>
    </section>
  {:else if post.is_self && !post.selftext_html}
    <section class="image-container">
      <a href={post.permalink}>
        <img src={getPostPreviewImage(post)} alt="" />
      </a>
    </section>
  {:else if post.is_self && post.selftext_html}
    <section class="container text-content">
      {@html formatRedditHtml(post.selftext_html)}
    </section>
  {/if}
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
    padding: 1rem 1.2rem;
    max-height: min(60vh, 560px);
    scrollbar-width: thin;
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
  }
  .image-container img {
    max-height: min(60vh, 560px);
    width: 100%;
    height: auto;
    object-fit: cover;
    display: block;
  }
  footer {
    display: flex;
    justify-content: space-between;
  }
  footer a {
    padding: 1rem 1.2rem;
  }
  footer a:first-child {
    padding-right: 0.4rem;
  }
  footer a:last-child {
    padding-left: 0.4rem;
  }
  @media (max-width: 30rem) {
    article {
      margin-bottom: 16px;
    }
  }
</style>
