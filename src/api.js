import { getRedditJsonUrl } from './util';

export const fetchPostListing = async (url) => {
  return fetch(getRedditJsonUrl(url))
    .then((response) => response.json())
    .then((data) => data.data.children.map((datamodel) => datamodel.data));
};

export const fetchPostWithComments = async (url) => {
  return fetch(getRedditJsonUrl(url))
    .then((response) => response.json())
    .then((data) => ({
      post: data[0].data.children[0].data,
      comments: data[1].data.children,
    }));
};
