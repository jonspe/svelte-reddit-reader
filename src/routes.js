import regexparam from 'regexparam';

export const listingRoutes = {
  frontpage: regexparam('/:sort?'),
  subreddit: regexparam('/r/:subreddit/:sort?'),
  user: regexparam('/user/:username'),
};

export const postRoutes = {
  post: regexparam('/r/:subreddit/comments/:postid/:title'),
  comment: regexparam('/r/:subreddit/comments/:postid/:title/:commentid'),
  wild: regexparam('/r/:subreddit/comments/:postid/:title/*'),
};
