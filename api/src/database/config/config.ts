import { Options } from 'sequelize/types';
import path from 'path';

require( 'dotenv' ).config( {
  path: path.join( __dirname, '..', '..', '..', '.env' )
} );


const queryLoggingFunction = ( (): boolean => false );

export const AccountServer: Options = {
  database: process.env.ACCOUNT_SERVER_DB,
  username: process.env.ACCOUNT_SERVER_USER,
  password: process.env.ACCOUNT_SERVER_PASSWORD,
  host: process.env.ACCOUNT_SERVER_HOST,
  dialect: 'mssql',
  port: 1433,
  logging: queryLoggingFunction,
  dialectOptions: {
    enableArithAbort: false,
  }
};

export const GameDB: Options = {
  database: process.env.GAME_DB,
  username: process.env.GAME_DB_USER,
  password: process.env.GAME_DB_PASSWORD,
  host: process.env.GAME_DB_HOST,
  dialect: 'mssql',
  port: 1433,
  logging: queryLoggingFunction,
  dialectOptions: {
    enableArithAbort: false,
  }
};
