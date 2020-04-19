import AWS, { SharedIniFileCredentials, EnvironmentCredentials } from 'aws-sdk';
import SSM from 'aws-sdk/clients/ssm';

// eslint-disable-next-line
// @ts-ignoretslint
import envFile from 'envfile';
import path from 'path';
import { promises as fs } from 'fs';

const awsCredentialProfile = process.argv[ 2 ];
function fetchSSMParams( params: SSM.GetParametersRequest ): Promise<SSM.GetParametersResult> {
  let credentials: SharedIniFileCredentials|EnvironmentCredentials;
  if ( awsCredentialProfile ) {
    credentials = new AWS.SharedIniFileCredentials( { profile: awsCredentialProfile } );
  } else {
    credentials = new AWS.EnvironmentCredentials( 'AWS' );
  }

  const ssm = new SSM( {
    credentials,
    region: 'ap-south-1',
  } );

  return new Promise( ( resolve, reject ) => {
    ssm.getParameters( params, ( err, data ) => {
      if ( err ) {
        reject( err );
      }

      resolve( data );
    } );
  } );
}

function parseSSMParams( params: SSM.ParameterList ): Record<string, string> {
  const paramsForEnv = {};

  params.forEach( ( param ) => {
    const splitParams = param.Value.split( ',' );

    switch ( param.Name ) {
      case 'AccountServer_DETAILS':
        Object.assign( paramsForEnv, {
          ACCOUNT_SERVER_DB: splitParams[ 0 ],
          ACCOUNT_SERVER_USER: splitParams[ 1 ],
          ACCOUNT_SERVER_PASSWORD: splitParams[ 2 ],
          ACCOUNT_SERVER_HOST: splitParams[ 3 ],
        } );
        break;

      case 'GameDB_DETAILS':
        Object.assign( paramsForEnv, {
          GAME_DB: splitParams[ 0 ],
          GAME_DB_USER: splitParams[ 1 ],
          GAME_DB_PASSWORD: splitParams[ 2 ],
          GAME_DB_HOST: splitParams[ 3 ],
        } );
        break;

      default:
    }
  } );
  return paramsForEnv;
}

function writeParamsToEnvFile( params: Record<string, string> ): Promise<boolean> {
  return new Promise( async( resolve, reject ) => {
    const sourcePath = path.join( '.env' );
    let currentEnvData = {};
    try {
      currentEnvData = envFile.parseFileSync( sourcePath );
    } catch ( err ) {
      currentEnvData = {};
    }

    const newEnvData = Object.assign( currentEnvData, params );
    try {
      console.log( newEnvData );
      const data = envFile.stringifySync( newEnvData );
      await fs.writeFile( sourcePath, data );
      resolve( true );
    } catch ( err ) {
      reject( new Error( `Unable to write params to env file: ${err}` ) );
    }
  } );
}

const paramsToFetch = {
  Names: [
    'AccountServer_DETAILS',
    'GameDB_DETAILS'
  ],
};

( async(): Promise<void> => {
  const { env } = process;
  let parsedParams = {};
  try {
    if ( env.SSM_AccountServer_DETAILS && env.SSM_GameDB_DETAILS ) {
      const parameters = [
        {
          Name: 'AccountServer_DETAILS',
          Value: env.SSM_AccountServer_DETAILS,
        },
        {
          Name: 'GameDB_DETAILS',
          Value: env.SSM_GameDB_DETAILS
        }
      ];
      parsedParams = parseSSMParams( parameters );
    } else {
      const fetchedParams = await fetchSSMParams( paramsToFetch );
      parsedParams = parseSSMParams( fetchedParams.Parameters );
    }

    await writeParamsToEnvFile( parsedParams );
    console.log( 'SSM Params written to env file successfully!' );
  } catch ( err ) {
    console.log( err );
  }
} )();
