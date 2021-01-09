import { onDestroy } from 'svelte';

export const getDurationString = function (from, to) {
  const diff = to - from;
  if (diff < 60000) {
    return 'just now';
  } else if (diff >= 60000 && diff < 3600000) {
    return `${~~(diff / 60000)} minutes ago`;
  } else if (diff >= 3600000 && diff < 216000000) {
    return `${~~(diff / 3600000)} hours ago`;
  } else if (diff >= 216000000) {
    return `${~~(diff / 216000000)} days ago`;
  }
  return 'long ago';
};

export const getUtcDate = function (utcSeconds) {
  const date = new Date(0);
  date.setUTCSeconds(utcSeconds);
  return date;
};

export const decodeHtml = function (html) {
  var txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

export const getRedditJsonUrl = function (path) {
  const [url, query] = path.split('?');
  if (query) {
    return `https://www.reddit.com${url}.json?${query}`;
  } else {
    return `https://www.reddit.com${path}.json`;
  }
};

// Decodes HTML string from Reddit to display, removes empty paragraphs
export const formatRedditHtml = function (html) {
  return decodeHtml(html.replaceAll('&lt;p&gt;&amp;#x200B;&lt;/p&gt;', ''))
    .replaceAll('href="https://www.reddit.com/r/', 'href="#/r/')
    .replaceAll('href="/r/', 'href="#/r/')
    .replaceAll('href="r/"', 'href="#/r/');
};

// Test if any of the patterns in routes matches path, and return that route
export const testAny = function (path, routes) {
  for (const key in routes) {
    if (routes[key].pattern.test(path)) {
      return routes[key];
    }
  }
};

// Execute regexparam, get params
export const exec = function (path, result) {
  let i = 0;
  let out = {};
  let matches = result.pattern.exec(path);
  if (!matches) return {};
  while (i < result.keys.length) {
    out[result.keys[i]] = matches[++i] || null;
  }
  return out;
};

export const appendQuery = function (url, query) {
  if (!query) {
    return url;
  } else if (url.includes('?')) {
    return `${url}&${query}`;
  }
  return `${url}?${query}`;
};

export function onInterval(callback, milliseconds) {
  const interval = setInterval(callback, milliseconds);

  onDestroy(() => {
    clearInterval(interval);
  });
}
