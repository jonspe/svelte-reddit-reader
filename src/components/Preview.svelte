<script>
  import { decodeHtml, formatRedditHtml } from '../util';

  const PREVIEW_QUALITY = 3;

  // Gets the best option for preview image considering quality and content type
  function getPostPreviewImage(post) {
    const thumb = { width: 300, height: 200 };
    if (post.preview !== undefined) {
      const imageObj = post.preview.images[0];
      const res = imageObj.resolutions;
      const image =
        res.length !== 0
          ? res[Math.min(PREVIEW_QUALITY, res.length - 1)]
          : imageObj.source;
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

  export let post;
  $: preview = getPostPreviewImage(post);
</script>

{#if post.kind === 't1'}
  <section class="container">
    <div class="text-content">
      {@html formatRedditHtml(post.body_html)}
    </div>
  </section>
{:else if post.kind === 't3'}
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
{:else}
  <p>Unknown type</p>
{/if}

<style>
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
    transition: all 0.5s;
  }
</style>
