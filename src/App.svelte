<script>
  import regexparam from 'regexparam';
  import { exec } from './util';
  import Post from './components/Post.svelte';
  import Listing from './components/Listing.svelte';

  let listingPath;
  let postPath;

  const handlePostClosed = () => {
    postPath = null;
    window.location.hash = listingPath;
  };

  const routes = {
    frontpage: regexparam('/'),
    subreddit: regexparam('/r/:subreddit'),
    post: regexparam('/r/:subreddit/comments/:id/:title'),
  };

  const handleRoutingLogic = () => {
    const path = window.location.href.split('#')[1] || '/';

    let foundPath = Object.values(routes).reduce(
      (a, b) => a || b.pattern.test(path),
      false
    );
    if (!foundPath) return;

    if (!listingPath && routes.post.pattern.test(path)) {
      const params = exec(path, routes.post);
      listingPath = `/r/${params.subreddit}`;
      postPath = path;
    } else if (!routes.post.pattern.test(path)) {
      listingPath = path;
      postPath = null;
    } else {
      postPath = path;
    }
  };

  handleRoutingLogic();
</script>

<svelte:window on:hashchange={handleRoutingLogic} />

<header>
  <h1>reddit reader</h1>
</header>
<main>
  {#if postPath}
    <Post url={postPath} on:close={handlePostClosed} />
  {/if}
  <Listing url={listingPath} />
</main>
<footer>Made with Svelte, by Joona Perasto. 2021.</footer>
