const { PubSub } = require( 'graphql-subscriptions' );
const GameSubscriptions = require( './game' );


module.exports.pubsub = new PubSub();

module.exports.Subscription = {
};
