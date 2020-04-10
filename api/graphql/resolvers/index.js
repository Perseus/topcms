const Query = require( './query' );
const { Mutation } = require( './mutation' );
const RootQueries = require( './query/RootQueries' );
const { Subscription } = require( './subscriptions' );

const resolvers = {
  Query,
  Mutation,
  ...RootQueries,
};

module.exports = resolvers;
