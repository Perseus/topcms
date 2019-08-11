import { AccountServer, GameDB } from '../../../database/models';
import sequelize from 'sequelize';

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

    const accounts = userCountQuery[ 0 ].accounts;
    const characters = characterCountQuery[ 0 ].characters;
    const online = onlineCountQuery[ 0 ].onlineUsers
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
