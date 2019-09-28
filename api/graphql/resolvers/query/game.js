import sequelize from 'sequelize';
import path from 'path';
import { promises, access } from 'fs';

import { AccountServer, GameDB } from '../../../database/models';
import { GeneralConfig } from '../../../config';

export async function gameStats( object, args, context, info ) {
  try {
    const userCountQuery = await AccountServer.User.findAll( {
      raw: true,
      attributes: [ [ sequelize.fn( 'COUNT', sequelize.col( '*' ) ), 'accounts' ] ]
    } );
    const onlineCountQuery = await AccountServer.User.findAll( {
      where: {
        login_status: 1
      },
      raw: true,
      attributes: [ [ sequelize.fn( 'COUNT', sequelize.col( '*' ) ), 'onlineUsers' ] ]
    } );
    const characterCountQuery = await GameDB.Character.findAll( {
      raw: true,
      attributes: [ [ sequelize.fn( 'COUNT', sequelize.col( '*' ) ), 'characters' ] ],
    } );
    const onlineRecordQuery = await GameDB.StatLog.findAll( {
      raw: true,
      attributes: [ [ sequelize.fn( 'MAX', sequelize.col( 'play_num' ) ), 'onlineRecord' ] ]
    } );

    const { accounts } = userCountQuery[ 0 ];
    const { characters } = characterCountQuery[ 0 ];
    const online = onlineCountQuery[ 0 ].onlineUsers;
    const online_record = onlineRecordQuery[ 0 ].onlineRecord || 0;

    return {
      accounts,
      characters,
      online,
      online_record
    };
  } catch ( err ) {
    return err;
  }
}


export async function staffStatuses() {
  try {
    const retrievedAdminAccounts = await GameDB.Account.findAll( {
      where: {
        gm: {
          [ sequelize.Op.gt ]: 0
        }
      }
    } );
    const adminAccounts = [];

    for ( let i = 0; i < retrievedAdminAccounts.length; i++ ) {
      const accountLoginDetails = await retrievedAdminAccounts[ i ].getAccountDetails( AccountServer, [ 'login_status' ] );
      const characterDetails = await retrievedAdminAccounts[ i ].getCharacters( { attributes: [ 'cha_name' ] } );
      let firstCharacter = {};

      if ( characterDetails ) {
        firstCharacter = characterDetails[ 0 ];
      }

      adminAccounts.push( {
        name: firstCharacter.cha_name,
        type: ( retrievedAdminAccounts[ i ].gm === 99 ? 'GM' : 'HD' ),
        is_online: Boolean( accountLoginDetails.login_status === 1 ),
      } );
    }

    return adminAccounts;
  } catch ( err ) {
    return err;
  }
}

export async function serverRateInfo() {
  try {
    const configFile = await promises.readFile( path.join( __dirname, '..', '..', '..', 'config', 'interactableConfig.json' ), 'utf8' );
    const serverRates = JSON.parse( configFile ).rates;

    return serverRates;
  } catch ( err ) {
    return err;
  }
}

export async function playerRankings( object, args ) {
  try {
    const { filter } = args;
    let validAccounts = await AccountServer.User.getAllUnbannedAccounts();

    // if admin accounts need to be filtered out from the rankings

    if ( !GeneralConfig.INCLUDE_ADMIN_IN_RANKING ) {
      // get the access level of each account
      const accessLevelRetrievalPromises = [];
      validAccounts.forEach( ( account ) => {
        const promise = new Promise( ( resolve, reject ) => {
          account.getAccessLevel( GameDB.Account ).then( ( result ) => {
            account.accessLevels = result;
            resolve();
          } );
        } );

        accessLevelRetrievalPromises.push( promise );
      } );

      await Promise.all( accessLevelRetrievalPromises );

      validAccounts = validAccounts.filter( ( account ) => {
        if ( account.accessLevels.includes( GeneralConfig.ADMIN_LEVELS.ADMIN ) || account.accessLevels.includes( GeneralConfig.ADMIN_LEVELS.HD ) ) {
          return false;
        }

        return true;
      } );
    }

    validAccounts = validAccounts.map( account => account.id );

    let orderParam = '';
    if ( filter === 'gold' ) {
      orderParam = 'gd';
    } else if ( filter === 'level' ) {
      orderParam = 'degree';
    }

    const characters = await GameDB.Character.findAll( {
      where: {
        act_id: {
          [ sequelize.Op.in ]: validAccounts
        },
      },
      order: [
        [ orderParam, 'DESC' ]
      ],
      include: [ { model: GameDB.Guild, as: 'guild' } ]
    } );

    return characters.splice( 0, GeneralConfig.MAXIMUM_RANKING_ITEMS );
  } catch ( err ) {
    return err;
  }
}

export async function guildRankings( object, args ) {
  try {
    const { filter } = args;

    const guilds = await GameDB.Guild.findAll( {
      where: {
        leader_id: {
          [ sequelize.Op.ne ]: 0,
        }
      },
      order: [
        [ 'member_total', 'DESC' ],
      ],
      include: [ { model: GameDB.Character, as: 'leader' } ]
    } );

    return guilds;
  } catch ( err ) {
    return err;
  }
}
