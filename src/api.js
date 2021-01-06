import { getRedditJsonUrl, appendQuery } from './util';

export const fetchPostListing = async (url, after) => {
  const afterQuery = after ? `count=25&after=${after}` : '';
  const finalUrl = appendQuery(getRedditJsonUrl(url), afterQuery);
  return fetch(finalUrl)
    .then((response) => response.json())
    .then((data) => data.data);
};

export const fetchPostWithComments = async (url) => {
  return fetch(getRedditJsonUrl(url))
    .then((response) => response.json())
    .then((data) => ({
      post: data[0].data.children[0].data,
      comments: data[1].data.children,
    }));
};