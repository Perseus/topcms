import { getOperationName, getMainDefinition } from 'apollo-utilities';
import { apolloClient } from '../apollo';
import ActionTypes from '../store/types/ActionTypes';

async function graphQLRequest( dispatch, type = 'query', requestSchema, variables = {}, options = {} ) {
  let response = {};
  const queryIdentifier = getOperationName( requestSchema );

  dispatch( ActionTypes.updateRequestsInProgress, { name: queryIdentifier, type: 'START' } );

  if ( process.env.NODE_ENV !== 'production' ) {
    const colorForType = type === 'query' ? '#22543D' : '#742A2A';

    console.log( `%c${type.toUpperCase()} %c${queryIdentifier}`,
      `background-color:${colorForType}; font-weight: bold; color: #FFFFFF; padding: 6px; border-radius: 4px;`,
      'background-color:#3182CE; font-weight: bold; color: #FFFFFF; padding: 6px; border-radius: 8px;margin-left: 10px;' );
    // console.log( `%c${type.toUpperCase()}` + `Request Logger ${type} ${queryIdentifier} ->`, 'background-color: #48BB78; color: #FFFFFF; font-weight: bold;' );
    if ( variables && Object.keys( variables ).length > 0 ) {
      console.table( variables );
    }
  }

  const requestExpireTimeout = setTimeout( () => {
    dispatch( ActionTypes.updateRequestsInProgress, { name: queryIdentifier, type: 'COMPLETE' } );
    response = Promise.reject( new Error( `request.TIMED_OUT` ) );
  }, 12000 );

  try {
    response = await apolloClient[ type ]( {
      [ type ]: requestSchema,
      variables: {
        ...variables,
      },
      ...options,
    } );

    response = response.data;
  } catch ( err ) {
    // console.log( 'error', err );
  } finally {
    clearTimeout( requestExpireTimeout );
    dispatch( ActionTypes.updateRequestsInProgress, { name: queryIdentifier, type: 'COMPLETE' } );
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
    return this.graphQLRequest( 'mutation', requestSchema, variables, options );
  }

  query( requestSchema, variables, options ) {
    return this.graphQLRequest( 'query', requestSchema, variables, options );
  }
}


export default new Request();
