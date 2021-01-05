<script>
  import Listing from './components/Listing.svelte';
  import Post from './components/Post.svelte';

  let postVisible = false;
  let selectedPostUrl;

  const handlePostView = (e) => {
    selectedPostUrl = e.detail.permalink;
    postVisible = true;
  };
  const handlePostClose = () => {
    postVisible = false;
  };
</script>

<header>
  <h1>frontpage</h1>
</header>
<main>
  <Post
    permalink={selectedPostUrl}
    visible={postVisible}
    on:close={handlePostClose} />
  <Listing
    url="https://www.reddit.com/r/apexlegends/"
    on:view={handlePostView} />
</main>
<footer>Made with Svelte, by Joona Perasto. 2021.</footer>

<style>
  header {
    padding: 0 128px;
    margin: 128px auto 64px auto;
    max-width: 2000px;
  }
  main {
    padding: 0 128px;
    margin: 64px auto;
    max-width: 2000px;
    column-count: 1;
    column-gap: 32px;
  }
  footer {
    text-align: center;
    padding: 1.2rem 0;
  }
  @media (max-width: 70rem) {
    main,
    header {
      padding: 0 32px;
    }
  }
  @media (max-width: 30rem) {
    main,
    header {
      padding: 0 12px;
    }
  }

  @media (min-width: 46rem) {
    main {
      column-count: 2;
    }
  }
  @media (min-width: 90rem) {
    main {
      column-count: 3;
    }
  }
  @media (min-width: 120rem) {
    main {
      column-count: 4;
    }
  }
</style>
