import Sequelize from 'sequelize';
import config from '../../config/config.json';
import fs from 'fs';
import path from 'path';

const basename = path.basename( __filename );
const accountServerModelDirectory = path.join( __dirname, '/./AccountServer/' );
const gameDbModelDirectory = path.join( __dirname, '/./GameDB/' );
const AccountServer = {};
const GameDB = {};

const accountServerInstance = new Sequelize( config.AccountServer.database, config.AccountServer.username, config.AccountServer.password, config.AccountServer );
const gameDBInstance = new Sequelize( config.GameDB.database, config.GameDB.username, config.GameDB.password, config.GameDB );

fs
  .readdirSync( accountServerModelDirectory )
  .filter( file => {
    return ( file.indexOf( '.' ) !== 0 ) && ( file !== basename ) && ( file.slice( -3 ) === '.js' );
  } )
  .forEach( file => {
    var model = accountServerInstance[ 'import' ]( path.join( accountServerModelDirectory, file ) );
    AccountServer[ model.name ] = model;
  } );

Object.keys( AccountServer ).forEach( modelName => {
  if ( AccountServer[ modelName ].associate ) {
    AccountServer[ modelName ].associate( AccountServer );
  }
} );

fs
  .readdirSync( gameDbModelDirectory )
  .filter( file => {
    return ( file.indexOf( '.' ) !== 0 ) && ( file !== basename ) && ( file.slice( -3 ) === '.js' );
  } )
  .forEach( file => {
    var model = gameDBInstance[ 'import' ]( path.join( gameDbModelDirectory, file ) );
    GameDB[ model.name ] = model;
  } );

Object.keys( GameDB ).forEach( modelName => {
  if ( GameDB[ modelName ].associate ) {
    GameDB[ modelName ].associate( GameDB );
  }
} );


const dbs = {
  AccountServer,
  GameDB
};

module.exports = dbs;
