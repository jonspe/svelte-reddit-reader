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
    frontpage: regexparam('/:sort?'),
    subreddit: regexparam('/r/:subreddit/:sort?'),
    post: regexparam('/r/:subreddit/comments/:postid/:title'),
    // TODO: Implement comment and user views
    comment: regexparam('/r/:subreddit/comments/:postid/:title/:commentid'),
    user: regexparam('/user/:sort?'),
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
      document.documentElement.scrollTop = 0;
    } else {
      postPath = path;
    }
  };

  handleRoutingLogic();
  $: pageTitle = exec(listingPath, routes.subreddit).subreddit || 'frontpage';
</script>

<svelte:window on:hashchange={handleRoutingLogic} />

<header>
  <h1>{pageTitle}</h1>
</header>
<main>
  {#if postPath}
    <Post url={postPath} on:close={handlePostClosed} />
  {/if}
  <Listing url={listingPath} />
</main>
<footer>Made with Svelte, by Joona Perasto. 2021.</footer>
