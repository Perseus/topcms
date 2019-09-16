import * as UserQueries from './user';
import * as GameQueries from './game';
import * as SiteQueries from './site';

export const Query = {
  ...UserQueries,
  ...SiteQueries, 
  ...GameQueries,
};
