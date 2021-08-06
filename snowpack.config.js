/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' },
  },
  plugins: ['@snowpack/plugin-svelte', '@snowpack/plugin-dotenv'],
  routes: [],
  optimize: {
    bundle: true,
    splitting: false,
    minify: true,
    treeshake: false,
    target: 'es2020',
  },
  packageOptions: {},
  devOptions: {},
  buildOptions: {
    baseUrl: './',
  },
};
