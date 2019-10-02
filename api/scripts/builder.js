/*
BUILD STEPS:

1. Copy config/config.example.json -> config.json
2. Input AccountServer and GameDB auth details -> database/config.json
3. Generate .env file with JWT_SECRET
4. Generate frontend .env file with VUE_APP_GRAPHQL_HTTP and VUE_APP_TITLE
5. Build frontend bundle
6. Copy bundle to api directory

*/

const shell = require( 'shelljs' );
const colors = require( 'colors/safe' );
const path = require( 'path' );
const { promises } = require( 'fs' );
const uuid = require( 'uuid' );

const { stdin, stdout } = process;

function prompt( question ) {
  return new Promise( ( resolve, reject ) => {
    stdin.resume();
    stdout.write( question );

    stdin.on( 'data', data => resolve( data.toString().trim() ) );
    stdin.on( 'error', err => reject( err ) );
  } );
}

async function getDatabaseDetails( db ) {
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

async function getWebEnvDetails() {
  const websiteTitle = await prompt( colors.yellow( ` Enter your website's title: ` ) );
  let apiHost = await prompt( colors.yellow( ` Enter the IP address/website address where your API is hosted (leave empty for localhost): ` ) );
  console.log( apiHost );
  apiHost = ( apiHost === '' ) ? 'http://localhost:3000/graphql' : `${apiHost}/graphql`;

  const webEnvDetails = `VUE_APP_GRAPHQL_HTTP='${apiHost}'
VUE_APP_TITLE='${websiteTitle}'
VUE_APP_HTTP_URL='${apiHost}'
VUE_APP_SOCKET_URL='${apiHost}'
`;

  return promises.writeFile( path.join( __dirname, '..', '..', 'web', '.env' ), webEnvDetails );
}

const twirlTimer = function( message ) {
  const P = [ '\\', '|', '/', '-' ];
  let x = 0;
  return setInterval( () => {
    process.stdout.write( message );
    process.stdout.write( `\r${P[ x++ ]}` );
    x &= 3;
  }, 250 );
};

async function generateJWTKey() {
  const jwtKey = uuid.v4();
  return promises.writeFile( path.join( __dirname, '..', '.env' ), `JWT_SECRET=${jwtKey}` );
}

async function writeDBDetails( details ) {
  return promises.writeFile( path.join( __dirname, '..', 'database', 'config', 'config.json' ), JSON.stringify( details, null, 2 ) );
}

function runShellScript( script ) {
  return new Promise( ( resolve, reject ) => {
    shell.exec( script, { async: true }, () => resolve() );
  } );
}


async function build() {
  console.log( colors.bgMagenta( ' STARTING SETUP PROCESS \n' ) );

  const databaseDetails = {
    AccountServer: {},
    GameDB: {},
  };

  console.log( colors.bgCyan( ' DATABASE SETUP ' ) );

  const accountServerDetails = await getDatabaseDetails( 'AccountServer' );
  const gameDbDetails = await getDatabaseDetails( 'GameDB' );

  databaseDetails.AccountServer = accountServerDetails;
  databaseDetails.GameDB = gameDbDetails;

  await writeDBDetails( databaseDetails );
  console.log( colors.bgCyan( ' DB DETAILS WRITTEN TO CONFIG FILES \n' ) );


  console.log( colors.bgCyan( ' GENERATING JWT SECRET KEY ' ) );
  await generateJWTKey();
  console.log( colors.bgCyan( ' JWT KEY GENERATED \n' ) );


  console.log( colors.bgCyan( ' GENERATING WEB ENV FILE ' ) );
  await getWebEnvDetails();
  console.log( colors.bgCyan( ' WEB ENV FILE GENERATED \n' ) );

  console.log( colors.bgCyan( ' INSTALLING WEB NPM PACKAGES ' ) );
  let loadingTimer = twirlTimer( ' Installing packages ' );
  shell.cd( '..' );
  shell.cd( 'web' );
  await runShellScript( 'npm i --silent' );
  await runShellScript( 'npm i -g nodemon sequelize-cli' );

  console.log( colors.bgCyan( ' BUILDING WEB BUNDLE' ) );
  await runShellScript( 'npm run build' );
  clearInterval( loadingTimer );

  console.log( colors.bgCyan( ' MIGRATING DATABASE TABLES ' ) );
  loadingTimer = twirlTimer( ' Migrating DB ' );
  shell.cd( '..' );
  shell.cd( 'api/database' );
  await runShellScript( 'npx sequelize db:migrate --env="GameDB"' );
  clearTimeout( loadingTimer );

  console.log( colors.bgMagenta( ' WEBSITE SETUP DONE! \n' ) );
  process.exit();
}


build();
