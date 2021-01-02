<header>
  <nav class="parent">
    <nav class="browsing">
      <a href="yes">Home</a>
      <a href="yes">Popular</a>
      <a href="yes">All</a>
      <a href="yes">Random</a>
    </nav>
    <nav class="options">
      <a href="yes">Login</a>
      <a href="yes">Preferences</a>
    </nav>
  </nav>
</header>

<style>
  header {
    background: white;
    padding: 1rem 6rem;
    box-shadow: 0 -4px 8px 4px rgba(0, 0, 0, 0.1);
    z-index: 3;
  }
  nav.parent {
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 2000px;
  }
  nav.parent > nav {
    display: flex;
    gap: 1rem;
  }
  nav a {
    color: black;
    font-size: 1rem;
  }
  @media (max-width: 900px) {
    header {
      padding: 1rem 1rem;
    }
  }
</style>
