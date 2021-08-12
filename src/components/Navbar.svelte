<script>
  import themes from '../themes.json';
</script>

<nav>
  <a href="#/">frontpage</a>
  {#each Object.entries(themes) as [theme, list]}
    <a href={'#/theme/' + theme}>{theme}</a>
  {/each}
</nav>

<style>
  nav a {
    display: inline-block;
    margin-right: 1rem;
    margin-bottom: 0.4rem;
  }
</style>
