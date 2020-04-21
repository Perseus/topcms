import * as SiteMutations from './site';

const { createUser, loginUser, logoutUser } = require( './auth' );
const GameMutations = require( './game' );
const UserMutations = require( './user' );
const CommerceMutations = require( './commerce' );

module.exports.Mutation = {
  createUser,
  loginUser,
  logoutUser,
  ...SiteMutations,
  ...GameMutations,
  ...UserMutations,
  ...CommerceMutations,
};
