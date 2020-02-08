const UserQueries = require( './user' );
const GameQueries = require( './game' );
const SiteQueries = require( './site' );
const CommerceQueries = require( './commerce' );

module.exports = {
  ...UserQueries,
  ...SiteQueries,
  ...GameQueries,
  ...CommerceQueries,
};
