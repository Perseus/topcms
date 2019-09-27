import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';
import config from '../config/config.json';

const basename = path.basename( __filename );
const accountServerModelDirectory = path.join( __dirname, '/./AccountServer/' );
const gameDbModelDirectory = path.join( __dirname, '/./GameDB/' );
const AccountServer = {};
const GameDB = {};

// const queryLoggingFunction = ( process.env.NODE_ENV === 'development' ? console.log : false );

// config.AccountServer.logging = queryLoggingFunction;
// config.GameDB.logging = queryLoggingFunction;

const accountServerInstance = new Sequelize( config.AccountServer.database, config.AccountServer.username, config.AccountServer.password, config.AccountServer );
const gameDBInstance = new Sequelize( config.GameDB.database, config.GameDB.username, config.GameDB.password, config.GameDB );

fs
  .readdirSync( accountServerModelDirectory )
  .filter( file => ( file.indexOf( '.' ) !== 0 ) && ( file !== basename ) && ( file.slice( -3 ) === '.js' ) )
  .forEach( ( file ) => {
    const model = accountServerInstance.import( path.join( accountServerModelDirectory, file ) );
    AccountServer[ model.name ] = model;
  } );

Object.keys( AccountServer ).forEach( ( modelName ) => {
  if ( AccountServer[ modelName ].associate ) {
    AccountServer[ modelName ].associate( AccountServer );
  }
} );

fs
  .readdirSync( gameDbModelDirectory )
  .filter( file => ( file.indexOf( '.' ) !== 0 ) && ( file !== basename ) && ( file.slice( -3 ) === '.js' ) )
  .forEach( ( file ) => {
    const model = gameDBInstance.import( path.join( gameDbModelDirectory, file ) );
    GameDB[ model.name ] = model;
  } );

Object.keys( GameDB ).forEach( ( modelName ) => {
  if ( GameDB[ modelName ].associate ) {
    GameDB[ modelName ].associate( GameDB );
  }
} );


const dbs = {
  AccountServer,
  GameDB
};

module.exports = dbs;
