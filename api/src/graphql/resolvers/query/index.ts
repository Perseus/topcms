import * as UserQueries from './user';
import * as GameQueries from './game';
import * as SiteQueries from './site';
import CommerceQueries from './commerce';

export default {
  ...UserQueries,
  ...GameQueries,
  ...SiteQueries,
  ...CommerceQueries
};
