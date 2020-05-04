import { Sequelize, Options } from 'sequelize';

import * as config from './config/config';

function getDbConfig( dbName: string ): Options {
  let dbConfig: Options;
  if ( dbName === 'AccountServer' ) {
    dbConfig = config.AccountServer;
  } else {
    dbConfig = config.GameDB;
  }
  return dbConfig;
}
const AccountServer = new Sequelize( {
  ...getDbConfig( 'AccountServer' ),
  dialect: 'mssql',
} );

const GameDB = new Sequelize( {
  ...getDbConfig( 'GameDB' ),
  dialect: 'mssql',
} );

export {
  AccountServer,
  GameDB,
};

// GameDB.addHook()
