// import { Model } from 'sequelize';
// import fs from 'fs';
// import path from 'path';
// import { AccountServer as accountServerInstance, GameDB as gameDBInstance } from '../index';

// const basename = path.basename( __filename );
// const accountServerModelDirectory = path.join( __dirname, '/./AccountServer/' );
// const gameDbModelDirectory = path.join( __dirname, '/./GameDB/' );
// const AccountServer: Record<string, Model> = {};
// const GameDB = {};

// fs
//   .readdirSync( accountServerModelDirectory )
//   .filter( file => ( file.indexOf( '.' ) !== 0 ) && ( file !== basename ) && ( file.slice( -3 ) === '.js' || file.slice( -3 ) === '.ts' ) )
//   .forEach( ( file ) => {
//     console.log( path.join( accountServerModelDirectory, file ) );
//     const model = accountServerInstance.import( path.join( accountServerModelDirectory, file ) );
//     // AccountServer[ model.name ] = model;
//   } );

// Object.keys( AccountServer ).forEach( ( modelName ) => {
//   if ( AccountServer[ modelName ].associate ) {
//     AccountServer[ modelName ].associate( AccountServer );
//   }
// } );

// fs
//   .readdirSync( gameDbModelDirectory )
//   .filter( file => ( file.indexOf( '.' ) !== 0 ) && ( file !== basename ) && ( file.slice( -3 ) === '.js' ) )
//   .forEach( ( file ) => {
//     // const model = gameDBInstance.import( path.join( gameDbModelDirectory, file ) );
//     // GameDB[ model.name ] = model;
//   } );

// // Object.keys( GameDB ).forEach( ( modelName ) => {
// //   if ( GameDB[ modelName ].associate ) {
// //     GameDB[ modelName ].associate( GameDB );
// //   }
// // } );

// export {
//   AccountServer,
//   GameDB,
// };
