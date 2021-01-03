<script>
  import { getDurationString, getUtcDate, decodeHtml } from '../util.js'

  // Decodes HTML string from Reddit to display, removes empty paragraphs
  const formatSelfText = function (html) {
    return decodeHtml(html.replaceAll('&lt;p&gt;&amp;#x200B;&lt;/p&gt;', ''))
  }

  // Gets the best option for preview image considering quality and content type
  const getPostPreviewImage = function (post) {
    if (post.data.preview !== undefined) {
      const resolutions = post.data.preview.images[0].resolutions
      const imageUrl = resolutions[Math.min(3, resolutions.length - 1)].url
      return decodeHtml(imageUrl)
    } else if (post.data.thumbnail === 'nsfw') {
      return 'https://www.reddit.com/static/nsfw2.png'
    } else if (post.data.thumbnail === 'default') {
      return 'https://www.reddit.com/static/noimage.png'
    }
    return post.data.thumbnail
  }

  export let post
</script>

<li>
  <a href={post.data.url_overridden_by_dest || post.data.url} target="_blank">
    <h2>{decodeHtml(post.data.title)}</h2>
    <div class="banner">
      <span>{post.data.score} points</span>
      <span>{getDurationString(getUtcDate(post.data.created_utc), new Date())}</span>
    </div>
    {#if !post.data.is_self}
      <img src={getPostPreviewImage(post)} alt="" style="height: auto" />
    {/if}
  </a>
  {#if post.data.is_self && post.data.selftext_html}
    <div class="self-content">
      {@html formatSelfText(post.data.selftext_html)}
    </div>
  {/if}
  <footer>
    <a href={'https://www.reddit.com/r/' + post.data.subreddit}>
      /r/{post.data.subreddit}
    </a>
    <a href={'https://www.reddit.com' + post.data.permalink}>
      {post.data.num_comments}
      comments
    </a>
  </footer>
</li>

<style>
  a {
    color: black;
  }
  li > a {
    display: block;
  }
  li {
    list-style-type: none;
    background: white;
    box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.15);
    border-radius: 12px;
    break-inside: avoid;
    margin-bottom: 32px;
    position: relative;
  }
  h2 {
    margin: 0;
    padding: 1rem 1.2rem 0.4rem 1.2rem;
    font-size: 1.2rem;
    font-weight: 600;
    display: block;
  }
  .banner {
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: static;
    padding: 0 1.2rem 1.2rem 1.2rem;
    border-bottom: 1px solid #eee;
  }
  .banner > * {
    margin: 0;
    display: inline-block;
  }
  .self-content {
    padding: 0 1.2rem;
    max-height: 24rem;
    overflow-y: auto;
    scrollbar-width: thin;
    border-bottom: 1px solid #eee;
  }
  footer {
    display: flex;
    justify-content: space-between;
  }
  footer a {
    padding: 1rem 1.2rem;
  }
  img {
    width: 100%;
    height: auto;
    max-height: 640px;
    object-fit: cover;
    display: block;
  }
</style>
