/*
BUILD STEPS:

1. Copy config/config.example.json -> config.json
2. Input AccountServer and GameDB auth details -> database/config.json
3. Generate .env file with JWT_SECRET
4. Generate frontend .env file with VUE_APP_GRAPHQL_HTTP and VUE_APP_TITLE
5. Build frontend bundle
6. Copy bundle to api directory

*/

import shell from 'shelljs';
import colors from 'colors/safe';
import path from 'path';
import { promises } from 'fs';
import uuid from 'uuid';
import ora from 'ora';
import envfile from 'envfile';

const { stdin, stdout } = process;

function prompt( question: string ): Promise<string> {
  return new Promise( ( resolve, reject ) => {
    stdin.resume();
    stdout.write( question );

    stdin.on( 'data', data => resolve( data.toString().trim() ) );
    stdin.on( 'error', err => reject( err ) );
  } );
}

async function getDatabaseDetails( db: string ): Promise<Record<string, string>> {
  const dbDetails = {
    username: '',
    password: '',
    database: '',
    host: '',
    dialect: 'mssql',
  };
  console.log( colors.bgWhite( colors.black( `\n  ${db}  ` ) ) );

  dbDetails.username = await prompt( colors.yellow( `Enter the username for ${db}: ` ) );
  dbDetails.password = await prompt( colors.yellow( `Enter the password for ${db}: ` ) );
  dbDetails.database = await prompt( colors.yellow( `Enter the database name for ${db} (leave empty if default name): ` ) );
  dbDetails.host = await prompt( colors.yellow( `Enter the host/ip for ${db}: ` ) );

  if ( dbDetails.database === '' ) {
    dbDetails.database = db;
  }

  return dbDetails;
}

function normalizeDBKeys( dbDetails: Record<string, Record<string, string>> ): Record<string, string> {
  const normalizedObject = {};
  Object.keys( dbDetails ).forEach( ( key ) => {
    const details = dbDetails[ key ];
    switch ( key ) {
      case 'AccountServer':
        Object.assign( normalizedObject, {
          ACCOUNT_SERVER_DB: details.database,
          ACCOUNT_SERVER_USER: details.username,
          ACCOUNT_SERVER_PASSWORD: details.password,
          ACCOUNT_SERVER_HOST: details.host,
        } );
        break;
      case 'GameDB':
        Object.assign( normalizedObject, {
          GAME_DB: details.database,
          GAME_DB_USER: details.username,
          GAME_DB_PASSWORD: details.password,
          GAME_DB_HOST: details.host
        } );
        break;
      default:
    }
  } );

  return normalizedObject;
}

async function getWebEnvDetails(): Promise<void> {
  const websiteTitle = await prompt( colors.yellow( ` Enter your website's title: ` ) );
  let apiHost = await prompt( colors.yellow( ` Enter the IP address/website address where your API is hosted (leave empty for localhost): ` ) );
  apiHost = ( apiHost === '' ) ? 'http://localhost:3000/graphql' : `${apiHost}/graphql`;

  const webEnvDetails = {
    VUE_APP_GRAPHQL_HTTP: apiHost,
    VUE_APP_TITLE: websiteTitle,
    VUE_APP_HTTP_URL: apiHost,
    VUE_APP_SOCKET_URL: apiHost
  };

  const envDataToWrite = envfile.stringifySync( webEnvDetails );

  return promises.writeFile( path.join( __dirname, '..', '..', '..', 'web', '.env' ), envDataToWrite );
}

async function generateJWTKey(): Promise<void> {
  const jwtKey = uuid.v4();
  return promises.writeFile( path.join( __dirname, '..', '.env' ), `JWT_SECRET=${jwtKey}` );
}

async function writeDBDetails( details: Record<string, Record<string, string>> ): Promise<void> {
  return new Promise( ( resolve, reject ) => {
    const sourceEnvFile = path.join( '.env' );
    const currentEnvData = envfile.parseFileSync( sourceEnvFile );
    const normalizedDetails = normalizeDBKeys( details );

    Object.assign( currentEnvData, normalizedDetails );

    const newEnvData = envfile.stringifySync( currentEnvData );

    promises.writeFile( sourceEnvFile, newEnvData ).then( () => resolve() ).catch( () => reject( new Error( 'Unable to write DB config to env file' ) ) );
  } );
}

function runShellScript( script: string ): Promise<void> {
  return new Promise( ( resolve ) => {
    shell.exec( script, { async: true }, () => resolve() );
  } );
}


async function build( processes: Array<string> ): Promise<void> {
  console.log( colors.bgMagenta( '\nSTARTING SETUP PROCESS \n' ) );

  const databaseDetails = {
    AccountServer: {},
    GameDB: {},
  };

  const shouldExecuteEverything = Boolean( processes.length <= 2 );

  if ( processes.includes( 'database' ) || shouldExecuteEverything ) {
    console.log( colors.bgCyan( ' DATABASE SETUP ' ) );

    const accountServerDetails = await getDatabaseDetails( 'AccountServer' );
    const gameDbDetails = await getDatabaseDetails( 'GameDB' );

    databaseDetails.AccountServer = accountServerDetails;
    databaseDetails.GameDB = gameDbDetails;

    await writeDBDetails( databaseDetails );
    console.log( colors.bgCyan( ' DB DETAILS WRITTEN TO CONFIG FILES \n' ) );
  }


  if ( processes.includes( 'jwt' ) || shouldExecuteEverything ) {
    console.log( colors.bgCyan( ' GENERATING JWT SECRET KEY ' ) );
    await generateJWTKey();
    console.log( colors.bgCyan( ' JWT KEY GENERATED \n' ) );
  }


  if ( processes.includes( 'webenv' ) || shouldExecuteEverything ) {
    console.log( colors.bgCyan( ' GENERATING WEB ENV FILE ' ) );
    await getWebEnvDetails();
    console.log( colors.bgCyan( ' WEB ENV FILE GENERATED \n' ) );
  }

  if ( processes.includes( 'apipackages' ) || shouldExecuteEverything ) {
    const spinner = ora( 'Installing API NPM packages' );
    spinner.start();
    // const loadingTimer = twirlTimer( ' Installing packages ' );
    await runShellScript( 'npm i --silent' );
    await runShellScript( 'npm i -g nodemon sequelize-cli pm2 --silent' );
    spinner.succeed();
  }

  if ( processes.includes( 'webpackages' ) || shouldExecuteEverything ) {
    const spinner = ora( 'Installing web NPM packages' );
    spinner.start();
    shell.cd( '..' );
    shell.cd( 'web' );
    await runShellScript( 'npm i --silent' );
    spinner.succeed();
  }

  if ( processes.includes( 'buildweb' ) || shouldExecuteEverything ) {
    shell.cd( '..' );
    shell.cd( 'web' );
    console.log( colors.bgCyan( ' BUILDING WEB BUNDLE' ) );
    await runShellScript( 'npm run build' );
    console.log( colors.bgCyan( ' COPYING WEB BUNDLE TO API DIRECTORY' ) );
    const aa = shell.cp( '-R', 'dist/', '../api/' );
    console.log( aa );
  }

  if ( processes.includes( 'migrate' ) || shouldExecuteEverything ) {
    const spinner = ora( 'Migration GameDB Tables' );
    spinner.start();
    await runShellScript( 'npx sequelize db:migrate --env="GameDB"' );
    spinner.succeed();
  }

  console.log( colors.bgMagenta( '\nWEBSITE SETUP DONE! \n' ) );
  process.exit();
}


const args = process.argv;

build( args );
