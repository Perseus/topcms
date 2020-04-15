import { Options } from 'sequelize/types';

require( 'dotenv' ).config();


const queryLoggingFunction = ( process.env.NODE_ENV !== 'production' ? console.log : (): boolean => false );

const AccountServer: Options = {
  database: process.env.ACCOUNT_SERVER_DB,
  username: process.env.ACCOUNT_SERVER_USER,
  password: process.env.ACCOUNT_SERVER_PASSWORD,
  host: process.env.ACCOUNT_SERVER_HOST,
  dialect: 'mssql',
  logging: queryLoggingFunction,
};

const GameDB: Options = {
  database: process.env.GAME_DB,
  username: process.env.GAME_DB_USER,
  password: process.env.GAME_DB_PASSWORD,
  host: process.env.GAME_DB_HOST,
  dialect: 'mssql',
  logging: queryLoggingFunction,
};

const dbConfig: Record<string, Options> = {
  AccountServer,
  GameDB
};

export default dbConfig;
