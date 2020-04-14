import { Sequelize, Options } from 'sequelize';

import config from './config/config';

function getDbConfig( dbName: string ): Options {
  const dbConfig: Options = config[ dbName ];
  return dbConfig;
}
const AccountServer = new Sequelize( {
  ...getDbConfig( 'AccountServer' )
} );

const GameDB = new Sequelize( {
  ...getDbConfig( 'GameDB' ),
} );

export {
  AccountServer,
  GameDB,
};
