import { Op } from 'sequelize';
import { promises } from 'fs';
import path from 'path';
import Joi from '@hapi/joi';

import { resolve } from '../../utils/resolver';

import User from '../../../database/models/AccountServer/User';
import Guild from '../../../database/models/GameDB/Guild';
import Account from '../../../database/models/GameDB/Account';
import Character from '../../../database/models/GameDB/Character';
import StatLog from '../../../database/models/GameDB/StatLog';
import { PlayerRankingFilters, IncludeAdminInRanking, MaximumRankingItems } from '../../../config';
import { AccessLevels } from '../../../types/db';

/**
 * Fetches statistics about the game such as
 * -> Total registered users
 * -> Total characters created
 * -> Currently online accounts
 * -> Maximum online record
 */
export const gameStats = resolve( {
  async action() {
    const [
      userCount,
      onlineCount,
      characterCount,
      onlineRecord
    ] = await Promise.all( [
      User.count(),
      User.count( {
        where: {
          login_status: 1,
        }
      } ),
      Character.count(),
      StatLog.max( 'play_num' )
    ] );

    return {
      data: {
        accounts: userCount,
        characters: characterCount,
        online: onlineCount,
        onlineRecord: onlineRecord || 0,
      }
    };
  }
} );

/**
 * Retrieves the online status of staff accounts ( GM > 0 )
 */
export const staffStatuses = resolve( {
  async action() {
    const retrievedAdminAccounts = await Account.findAll( {
      where: {
        gm: {
          [ Op.gt ]: 0
        },
      },
    } );

    const adminAccounts = [];
    for ( let i = 0; i < retrievedAdminAccounts.length; i += 1 ) {
      const accountData = await retrievedAdminAccounts[ i ].getAccountDetails( User, [ 'login_status' ] );
      const characterDetails = await retrievedAdminAccounts[ i ].getCharacters( {
        attributes: [ 'cha_name' ],
      } );

      let firstCharacter: Character;

      if ( characterDetails.length > 0 ) {
        [ firstCharacter ] = characterDetails;
        adminAccounts.push( {
          name: firstCharacter.cha_name,
          type: ( retrievedAdminAccounts[ i ].gm === 99 ? 'GM' : 'HD' ),
          isOnline: accountData.login_status === 1
        } );
      }
    }

    return {
      data: adminAccounts,
    };
  }
} );

/**
 * Fetches rate info about the server
 */
export const serverRateInfo = resolve( {
  async action() {
    const configFile = await promises.readFile( path.join( __dirname, '..', '..', '..', 'config', 'interactableConfig.json' ), 'utf8' );
    const serverRates = JSON.parse( configFile ).rates;

    return {
      data: serverRates
    };
  }
} );

/**
 * Fetches player ranking on the basis of a filter ( gold, level )
 *
 * @param {string} filter -> The filter on the basis of which players should be ranked
 */
export const playerRankings = resolve( {
  validationSchema: {
    filter: Joi.string().valid( ...Object.keys( PlayerRankingFilters ) ).required(),
  },
  async action( { args } ) {
    const { filter } = args;
    let validAccounts = await User.getAllUnbannedAccounts();

    if ( !IncludeAdminInRanking ) {
      const accessLevelRetrievalPromises = [];

      validAccounts.forEach( ( account ) => {
        const promise = new Promise( ( resolve ) => {
          account.getAccessLevel().then( ( result ) => {
            account.accessLevels = result;
            resolve();
          } );
        } );

        accessLevelRetrievalPromises.push( promise );
      } );

      validAccounts = validAccounts.filter( ( account ) => {
        if ( account.accessLevels.includes( AccessLevels.ADMIN ) || account.accessLevels.includes( AccessLevels.SITE ) ) {
          return false;
        }

        return true;
      } );
    }

    const validAccountIDs = validAccounts.map( account => account.id );
    const orderParam = PlayerRankingFilters[ filter ];
    const characters = await Character.findAll( {
      where: {
        act_id: {
          [ Op.in ]: validAccountIDs
        }
      },
      order: [ [ orderParam, 'DESC' ] ],
      include: [
        {
          model: Guild,
          as: 'guild'
        }
      ],
      limit: MaximumRankingItems
    } );

    return {
      data: characters,
    };
  }
} );

/**
 * Fetches guild ranking on the basis of total members (currently)
 */
export const guildRankings = resolve( {
  async action() {
    const guilds = await Guild.findAll( {
      where: {
        leader_id: {
          [ Op.ne ]: 0,
        }
      },
      order: [ [ 'member_total', 'DESC' ] ],
      include: [ {
        model: Character,
        as: 'leader'
      } ]
    } );

    return {
      data: guilds
    };
  }
} );
