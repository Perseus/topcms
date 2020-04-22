import * as SiteMutations from './site';
import * as AuthMutations from './auth';
import * as UserMutations from './user';

const GameMutations = require( './game' );
const CommerceMutations = require( './commerce' );

module.exports.Mutation = {
  ...AuthMutations,
  ...SiteMutations,
  ...GameMutations,
  ...UserMutations,
  ...CommerceMutations,
};
