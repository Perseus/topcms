import path from 'path';
import { promises } from 'fs';
import { UserInputError } from 'apollo-server';
import { Sequelize }  from 'sequelize';
import crypto from 'crypto';

import { AccountServer, GameDB } from '../../../database/models';
import { pubsub } from '../subscriptions';

export async function updateServerRates( context, args ) {
  try {
    const { rates: { solo, party, drop, ship, fairy } } = args;
    const configFile = await promises.readFile( path.join( __dirname, '..', '..', '..', 'config', 'interactableConfig.json' ), 'utf8' );
    const currentServerRates = JSON.parse( configFile );
    
    currentServerRates.rates = {
      solo: solo ? solo : currentServerRates.solo,
      party: party ? party : currentServerRates.party,
      drop: drop ? drop : currentServerRates.drop,
      ship: ship ? ship : currentServerRates.ship,
      fairy: fairy ? fairy : currentServerRates.fairy
    };
    
    await promises.writeFile( path.join( __dirname, '..', '..', '..', 'config', 'interactableConfig.json' ), JSON.stringify( currentServerRates, null, 2 ) );
    return currentServerRates.rates;
  } catch ( err ) {
    return err;
  }
}

export async function toggleUserBan( context, args ) {
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
}

export async function cacheItemInfo( context, args ) {
  try {
    const interval = setInterval( () => {
      pubsub.publish( 'ITEM_WAS_CACHED' );
    }, 3000 );
  } catch ( err ) {
    console.log( err );
  }
}