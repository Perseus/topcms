const path = require( 'path' );
const { promises } = require( 'fs' );
const { UserInputError } = require( 'apollo-server' );
const { Sequelize } = require( 'sequelize' );
const crypto = require( 'crypto' );

const { AccountServer, GameDB } = require( '../../../database/models' );
const { pubsub } = require( '../subscriptions' );

module.exports.updateServerRates = async function updateServerRates( context, args ) {
  try {
    const {
      rates: {
        solo, party, drop, ship, fairy
      }
    } = args;
    const configFile = await promises.readFile( path.join( __dirname, '..', '..', '..', 'config', 'interactableConfig.json' ), 'utf8' );
    const currentServerRates = JSON.parse( configFile );

    currentServerRates.rates = {
      solo: solo || currentServerRates.solo,
      party: party || currentServerRates.party,
      drop: drop || currentServerRates.drop,
      ship: ship || currentServerRates.ship,
      fairy: fairy || currentServerRates.fairy
    };

    await promises.writeFile( path.join( __dirname, '..', '..', '..', 'config', 'interactableConfig.json' ), JSON.stringify( currentServerRates, null, 2 ) );
    return currentServerRates.rates;
  } catch ( err ) {
    return err;
  }
};

module.exports.toggleUserBan = async function toggleUserBan( context, args ) {
  try {
    const { id, newBanStatus } = args;
    await AccountServer.User.update( {
      ban: newBanStatus,
    }, {
      where: {
        id
      }
    } );

    const retrievedUser = await AccountServer.User.findOne( {
      where: {
        id
      }
    } );

    return retrievedUser;
  } catch ( err ) {
    return err;
  }
};
