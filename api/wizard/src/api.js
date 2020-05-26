const envfile = require( 'envfile' );
const express = require( 'express' );
const shell = require( 'shelljs' );
const path = require( 'path' );
const { promises: fs } = require( 'fs' );
const { Sequelize } = require( 'sequelize' );
const { v4 } = require( 'uuid' );

const router = express.Router();
const wizardDataFile = path.join( __dirname, 'data', 'wizard-data.json' );

function runShellScript( script ) {
  return new Promise( ( resolve ) => {
    shell.exec( script, { async: true }, () => resolve() );
  } );
}

router.post( '/general-info', async( req, res ) => {
  const { serverName } = req.body;
  let { websiteUrl } = req.body;

  if ( !websiteUrl ) {
    websiteUrl = 'http://localhost:3000';
  }

  const sourceEnvFile = path.join( __dirname, '..', '..', '.env' );
  shell.touch( sourceEnvFile );
  const currentEnvData = envfile.parseFileSync( sourceEnvFile );
  Object.assign( currentEnvData, {
    APP_URL: websiteUrl,
    SERVER_TITLE: serverName
  } );

  const stringifiedData = envfile.stringifySync( currentEnvData );

  await fs.writeFile( sourceEnvFile, stringifiedData );

  const wizardData = JSON.parse( ( await fs.readFile( wizardDataFile ) ) );
  wizardData.currentStep = 1;
  wizardData.stepsFinished.general = true;

  await fs.writeFile( wizardDataFile, JSON.stringify( wizardData, null, 2 ) );
  res.sendStatus( 200 );
} );

router.post( '/api-npm-install', async( req, res ) => {
  try {
    shell.cd( '../api' );
    await runShellScript( 'npm install' );
    await runShellScript( 'npm i -g pm2 nodemon' );
  } catch ( err ) {
    console.log( err );
  }
  res.sendStatus( 200 );
} );

router.post( '/compile-ts', async( req, res ) => {
  try {
    await runShellScript( 'npm run build-ts' );

    const wizardData = JSON.parse( ( await fs.readFile( wizardDataFile ) ) );
    wizardData.stepsFinished.typescript = true;

    await fs.writeFile( wizardDataFile, JSON.stringify( wizardData, null, 2 ) );

    shell.cp( 'src/config/interactableConfig.json', 'dist/config/' );
    shell.mkdir( 'dist/data' );
    shell.mkdir( 'dist/data/ItemInfoCache' );
  } catch ( err ) {
    console.log( err );
  }

  res.sendStatus( 200 );
} );

router.post( '/test-db-connection', async( req, res ) => {
  const { AccountServer, GameDB } = req.body;
  if ( !AccountServer || !GameDB ) {
    res.sendStatus( 422 );
  }

  const AccountServerConnection = new Sequelize( {
    database: AccountServer.dbName,
    username: AccountServer.dbUsername,
    password: AccountServer.dbPassword,
    host: AccountServer.dbHost,
    dialect: 'mssql',
    port: 1433,
  } );

  const GameDBConnection = new Sequelize( {
    database: GameDB.dbName,
    username: GameDB.dbUsername,
    password: GameDB.dbPassword,
    host: GameDB.dbHost,
    dialect: 'mssql',
    port: 1433,
  } );

  const AccountServerAuthenticationStatus = {
    isAuthenticated: false,
    error: '',
  };

  const GameDBAuthenticationStatus = {
    isAuthenticated: false,
    error: '',
  };

  try {
    await AccountServerConnection.authenticate();
    AccountServerAuthenticationStatus.isAuthenticated = true;
  } catch ( err ) {
    AccountServerAuthenticationStatus.error = err.toString();
  }

  try {
    await GameDBConnection.authenticate();
    GameDBAuthenticationStatus.isAuthenticated = true;
  } catch ( err ) {
    GameDBAuthenticationStatus.error = err.toString();
  }

  res.json( {
    AccountServer: AccountServerAuthenticationStatus,
    GameDB: GameDBAuthenticationStatus
  } );
} );

router.post( '/write-db-creds', async( req, res ) => {
  const { AccountServer, GameDB } = req.body;
  if ( !AccountServer || !GameDB ) {
    res.sendStatus( 422 );
  }

  const normalizedObject = {};
  Object.keys( req.body ).forEach( ( key ) => {
    const details = req.body[ key ];
    switch ( key ) {
      case 'AccountServer':
        Object.assign( normalizedObject, {
          ACCOUNT_SERVER_DB: details.dbName,
          ACCOUNT_SERVER_USER: details.dbUsername,
          ACCOUNT_SERVER_PASSWORD: details.dbPassword,
          ACCOUNT_SERVER_HOST: details.dbHost,
        } );
        break;
      case 'GameDB':
        Object.assign( normalizedObject, {
          GAME_DB: details.dbName,
          GAME_DB_USER: details.dbUsername,
          GAME_DB_PASSWORD: details.dbPassword,
          GAME_DB_HOST: details.dbHost
        } );
        break;
      default:
    }
  } );

  const sourceEnvFile = path.join( __dirname, '..', '..', '.env' );
  shell.touch( sourceEnvFile );
  const currentEnvData = envfile.parseFileSync( sourceEnvFile );
  Object.assign( currentEnvData, normalizedObject );
  const stringifiedData = envfile.stringifySync( currentEnvData );

  await fs.writeFile( sourceEnvFile, stringifiedData );

  const wizardData = JSON.parse( ( await fs.readFile( wizardDataFile ) ) );
  wizardData.currentStep = 2;
  wizardData.stepsFinished.db = true;

  await fs.writeFile( wizardDataFile, JSON.stringify( wizardData, null, 2 ) );
  res.sendStatus( 200 );
} );

router.post( '/web-bundle', async( req, res ) => {
  try {
    const sourceEnvFile = path.join( __dirname, '..', '..', '.env' );
    shell.touch( sourceEnvFile );
    const currentEnvData = envfile.parseFileSync( sourceEnvFile );
    const { APP_URL, SERVER_TITLE } = currentEnvData;

    shell.cd( '../web' );

    const webEnvFile = path.join( __dirname, '..', '..', '..', 'web', '.env' );
    shell.touch( webEnvFile );
    const webEnvData = envfile.parseFileSync( webEnvFile );
    Object.assign( webEnvData, {
      VUE_APP_TITLE: SERVER_TITLE,
      VUE_APP_GRAPHQL_HTTP: `${APP_URL}/graphql`,
      VUE_APP_GRAPHQL_WS: `ws${APP_URL.split( 'http' )[ 1 ]}/graphql`,
      VUE_APP_HTTP_URL: `${APP_URL}/api`,
      VUE_APP_SOCKET_URL: `${APP_URL}`
    } );

    const stringifiedData = envfile.stringifySync( webEnvData );
    await fs.writeFile( webEnvFile, stringifiedData );
    await runShellScript( 'npm i' );
    await runShellScript( 'npm run build' );

    const wizardData = JSON.parse( ( await fs.readFile( wizardDataFile ) ) );
    wizardData.currentStep = 3;
    wizardData.stepsFinished.web = true;

    await fs.writeFile( wizardDataFile, JSON.stringify( wizardData, null, 2 ) );
  } catch ( err ) {
    console.log( err );
  }

  res.sendStatus( 200 );
} );

router.post( '/jwt', async( req, res ) => {
  try {
    const sourceEnvFile = path.join( __dirname, '..', '..', '.env' );
    shell.touch( sourceEnvFile );
    const currentEnvData = envfile.parseFileSync( sourceEnvFile );
    const jwtSecret = v4();
    Object.assign( currentEnvData, {
      JWT_SECRET: jwtSecret
    } );

    const stringifiedData = envfile.stringifySync( currentEnvData );
    await fs.writeFile( sourceEnvFile, stringifiedData );

    const wizardData = JSON.parse( ( await fs.readFile( wizardDataFile ) ) );
    wizardData.currentStep = 3;
    wizardData.stepsFinished.jwt = true;

    await fs.writeFile( wizardDataFile, JSON.stringify( wizardData, null, 2 ) );
  } catch ( err ) {
    console.log( err );
  }
  res.sendStatus( 200 );
} );

router.post( '/migrate', async( req, res ) => {
  try {
    shell.cd( '../api' );
    await runShellScript( 'npm run migrate:ts:account && npm run migrate:ts:game' );
    shell.cp( '-R', 'src/views', 'dist' );
    shell.cp( 'src/config/interactableConfig.json', 'dist/config' );
  } catch ( err ) {
    console.log( err );
  }
  res.sendStatus( 200 );
} );

router.post( '*', ( req, res ) => {
  res.sendStatus( 404 );
} );


module.exports = router;
