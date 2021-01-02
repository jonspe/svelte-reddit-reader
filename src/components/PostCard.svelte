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
      return imageUrl.replaceAll('&amp;', '&')
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
    <h2>{post.data.title}</h2>
    <div
      class="overlay"
      class:light={post.data.is_self}
      class:dark={!post.data.is_self}>
      <p>{post.data.score}</p>
      <p>{getDurationString(getUtcDate(post.data.created_utc), new Date())}</p>
    </div>
    {#if !post.data.is_self}
      <img src={getPostPreviewImage(post)} alt="" style="height: auto" />
    {/if}
  </a>
  {#if post.data.is_self && post.data.selftext_html}
    <div class="self">
      {@html formatSelfText(post.data.selftext_html)}
    </div>
  {/if}
  <footer>
    <a href={'https://www.reddit.com/u/' + post.data.author}>
      /u/{post.data.author}
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
  .overlay {
    position: absolute;
    margin: 0;
    padding: 0.4rem 1.2rem;
    z-index: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .overlay.dark {
    color: white;
    background: rgb(0, 0, 0, 0.25);
  }
  .overlay.light {
    padding-top: 0;
    border-bottom: 1px solid #eee;
  }
  .overlay > * {
    margin: 0;
    display: inline-block;
  }
  .self {
    padding: 0 1.2rem;
    margin-top: 2.1rem;
    max-height: 24rem;
    overflow-y: auto;
    scrollbar-width: thin;
    border-bottom: 1px solid #eee;
  }
  li {
    list-style-type: none;
    background: white;
    box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.15);
    border-radius: 12px;
    break-inside: avoid;
    margin-bottom: 24px;
    position: relative;
  }
  h2 {
    margin: 0;
    padding: 1rem 1.2rem;
    font-size: 1.2rem;
    font-weight: 600;
    display: block;
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
