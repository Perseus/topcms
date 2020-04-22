import * as SiteMutations from './site';
import * as AuthMutations from './auth';
import * as UserMutations from './user';
import * as CommerceMutations from './commerce';
import * as GameMutations from './game';

export default {
  ...SiteMutations,
  ...AuthMutations,
  ...UserMutations,
  ...CommerceMutations,
  ...GameMutations
};
