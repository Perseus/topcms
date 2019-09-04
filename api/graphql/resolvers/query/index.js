import { users, me, logout } from './user';
import * as GameQueries from './game';
import * as SiteQueries from './site';

export const Query = {
  users,
  me,
  logout,
  ...SiteQueries, 
  ...GameQueries,
};
