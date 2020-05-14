import {
  getOperationName
} from 'apollo-utilities';
import { apolloClient } from '../apollo';
import ActionTypes from '../store/types/ActionTypes';
import TError from './TError';

async function graphQLRequest( dispatch, type = 'query', requestSchema, variables = {}, options = {} ) {
  let response = {};
  const queryIdentifier = `${getOperationName( requestSchema )}.${Date.now()}`;
  dispatch( ActionTypes.updateRequestsInProgress, { name: queryIdentifier, type: 'START' } );

  if ( process.env.NODE_ENV !== 'production' ) {
    const colorForType = type === 'query' ? '#22543D' : '#742A2A';

    console.log( `%c${type.toUpperCase()} REQUEST -> %c${queryIdentifier.split( '.' )[ 0 ]}`,
      `background-color:${colorForType}; font-weight: bold; color: #FFFFFF; padding: 6px; border-radius: 4px;`,
      'background-color:#3182CE; font-weight: bold; color: #FFFFFF; padding: 6px; border-radius: 8px;margin-left: 10px;' );

    if ( variables && Object.keys( variables ).length > 0 ) {
      console.table( variables );
    }
  }

  const requestExpireTimeout = setTimeout( () => {
    dispatch( ActionTypes.updateRequestsInProgress, { name: queryIdentifier, type: 'COMPLETE' } );
    response = Promise.reject( new Error( `request.TIMED_OUT` ) );
  }, 12000 );


  try {
    const queryTypeParam = type === 'query' ? type : 'mutation';

    response = await apolloClient[ type ]( {
      [ queryTypeParam ]: requestSchema,
      variables: {
        ...variables,
      },
      ...options,
    } );

    response = response.data;
    const objectKeys = Object.keys( response );
    const firstDataKey = objectKeys[ 0 ];

    if ( response[ firstDataKey ] ) {
      const {
        success, message, code, errors, data
      } = response[ firstDataKey ];
      if ( success !== true || code !== 'OK' ) {
        console.log( 'bruh1' );
        throw new TError( {
          success,
          message,
          code,
          errors,
          data
        } );
      }
    }
  } catch ( err ) {
    throw new TError( err );
  } finally {
    clearTimeout( requestExpireTimeout );
    dispatch( ActionTypes.updateRequestsInProgress, { name: queryIdentifier, type: 'COMPLETE' } );
  }

  if ( process.env.NODE_ENV !== 'production' ) {
    const colorForType = type === 'query' ? '#22543D' : '#742A2A';

    console.log( `%c${type.toUpperCase()} RESPONSE -> `,
      `background-color:${colorForType}; font-weight: bold; color: #FFFFFF; padding: 6px; border-radius: 4px;` );

    console.log( response );

    if ( variables && Object.keys( variables ).length > 0 ) {
      console.table( variables );
    }
  }

  return response;
}


class Request {
  init( store ) {
    this.store = store;
  }

  async graphQLRequest( type = 'query', requestSchema, variables, options = {} ) {
    return graphQLRequest( this.store.dispatch, type, requestSchema, variables, options );
  }


  mutation( requestSchema, variables, options ) {
    return this.graphQLRequest( 'mutate', requestSchema, variables, options );
  }

  query( requestSchema, variables, options ) {
    return this.graphQLRequest( 'query', requestSchema, variables, options );
  }

  isRequestInProgress( requestName ) {
    const requestsInProgress = this.store.state.application.currentRequestsInProgress;
    let isRequestInProgress = false;

    requestsInProgress.forEach( ( request ) => {
      if ( request.includes( requestName ) ) {
        isRequestInProgress = true;
      }
    } );

    return isRequestInProgress;
  }
}


export default new Request();
