const Query = require( './query' );
const { Mutation } = require( './mutation' );
const { User } = require( './query/RootQueries' );
const { Subscription } = require( './subscriptions' );

const resolvers = {
  Query,
  Mutation,
  User,
};

module.exports = resolvers;
