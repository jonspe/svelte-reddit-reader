import { derived, get } from 'svelte/store';
import { location, querystring } from 'svelte-spa-router';
import { listingRoutes, postRoutes } from './routes';
import { exec, testAny, appendQuery } from './util';
import themes from './themes.json';

export const postPath = derived(
  location,
  ($location, set) => {
    if (testAny($location, postRoutes)) {
      set($location);
    } else {
      set(null);
    }
  },
  null
);

export const listingPath = derived(
  [location, querystring],
  ([$location, $querystring], set) => {
    const listingRoute = testAny($location, listingRoutes);
    const postRoute = testAny($location, postRoutes);

    if (listingRoute) {
      set(appendQuery($location, $querystring));
    } else if (!get(listingPath) && postRoute) {
      const params = exec($location, postRoute);
      set(appendQuery(`/r/${params.subreddit}`, $querystring));
    }
  }
);

export const listingFetchPath = derived(listingPath, ($listingPath, set) => {
  if (listingRoutes.theme.pattern.test($listingPath)) {
    const params = exec($listingPath, listingRoutes.theme);
    set(`/r/${themes[params.theme].join('+')}`);
  } else {
    set($listingPath);
  }
});

export const isMultiListing = derived(listingPath, ($listingPath, set) => {
  const isSubreddit = listingRoutes.subreddit.pattern.test($listingPath);
  const params = exec($listingPath, listingRoutes.subreddit);

  if (
    isSubreddit &&
    params.subreddit !== 'popular' &&
    params.subreddit !== 'all'
  ) {
    set(false);
  } else {
    set(true);
  }
});
