import { getRedditJsonUrl, appendQuery } from './util';

export const fetchPostListing = async (url, after) => {
  const afterQuery = after ? `count=25&after=${after}` : '';
  const finalUrl = appendQuery(getRedditJsonUrl(url), afterQuery);

  const res = await fetch(finalUrl);
  const json = await res.json();

  if (!res.ok) throw json;
  if (json.data.dist === 0) throw Error('empty');
  return json.data;
};

export const fetchPostWithComments = async (url) => {
  const res = await fetch(getRedditJsonUrl(url));
  const json = await res.json();

  if (!res.ok) throw json;
  return {
    post: json[0].data.children[0].data,
    comments: json[1].data.children,
  };
};
