import { derived, get } from 'svelte/store';
import { location } from 'svelte-spa-router';
import { listingRoutes, postRoutes } from './routes';
import { exec, testAny } from './util';

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

export const listingPath = derived(location, ($location, set) => {
  if (testAny($location, listingRoutes)) {
    set($location);
  } else if (!get(listingPath) && testAny($location, postRoutes)) {
    const params = exec($location, postRoutes.wild);
    set(`/r/${params.subreddit}`);
  }
});
