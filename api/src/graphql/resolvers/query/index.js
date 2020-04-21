import UserQueries from './user';
import GameQueries from './game';
import * as SiteQueries from './site';
import CommerceQueries from './commerce';

export default {
  ...UserQueries,
  ...GameQueries,
  ...SiteQueries,
  ...CommerceQueries
};
