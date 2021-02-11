import { getRedditJsonUrl, appendQuery } from './util';

/**
 * Formats a Reddit API object recursively into a more usable form, nesting kind inside.
 * @param {object} obj
 */
const formatRedditObject = function (obj) {
  if (obj.kind === 'Listing' && obj.data.children) {
    return {
      ...obj.data,
      kind: obj.kind,
      children: obj.data.children.map(formatRedditObject),
    };
  } else if (obj.kind === 't1' && obj.data.replies) {
    return {
      ...obj.data,
      kind: obj.kind,
      replies: formatRedditObject(obj.data.replies),
    };
  }
  return { ...obj.data, kind: obj.kind };
};

export const fetchPostListing = async (url, after) => {
  const afterQuery = after ? `count=25&after=${after}` : '';
  const finalUrl = appendQuery(getRedditJsonUrl(url), afterQuery);

  const res = await fetch(finalUrl);
  const json = await res.json();

  if (!res.ok) throw json;
  if (json.data.dist === 0) throw Error('empty');

  return formatRedditObject(json);
};

export const fetchPostWithComments = async (url) => {
  const res = await fetch(getRedditJsonUrl(url));
  const json = await res.json();

  if (!res.ok) throw json;

  return {
    post: formatRedditObject(json[0]).children[0],
    comments: formatRedditObject(json[1]).children,
  };
};
