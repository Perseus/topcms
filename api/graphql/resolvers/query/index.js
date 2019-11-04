const UserQueries = require( './user' );
const GameQueries = require( './game' );
const SiteQueries = require( './site' );

module.exports = {
  ...UserQueries,
  ...SiteQueries, 
  ...GameQueries,
};
