import { apolloClient } from '../apollo';
import ActionTypes from '../store/types/ActionTypes';

async function graphQLRequest( dispatch, type = 'query', requestSchema, requestIdentifiers, variables = {}, options = {} ) {
  let response = {};
  const { queryIdentifier, queryName } = requestIdentifiers;

  dispatch( ActionTypes.updateRequestsInProgress, { name: queryIdentifier, type: 'START' } );

  if ( type === 'query' ) {
    response = apolloClient.query( {
      query: requestSchema,
      variables: {
        ...variables,
      },
      ...options,
    } );
  }

  if ( type === 'mutation' ) {
    response = apolloClient.mutate( {
      mutation: requestSchema,
      variables: {
        ...variables,
      },
      ...options,
    } );
  }

  if ( process.env.NODE_ENV !== 'production' ) {
    console.log( `Request Logger ${type} ${queryName} -> `, {
      requestSchema,
      variables,
      options
    } );
  }

  const requestExpireTimeout = setTimeout( () => {
    dispatch( ActionTypes.updateRequestsInProgress, { name: queryIdentifier, type: 'COMPLETE' } );
    response = Promise.reject( new Error( 'Request timed out' ) );
  }, 12000 );

  response.then( ( resp ) => {
    if ( process.env.NODE_ENV !== 'production' ) {
      console.log( `Response Logger ${type} ${queryName} -> `, {
        ...resp.data
      } );
    }
    dispatch( ActionTypes.updateRequestsInProgress, { name: queryIdentifier, type: 'COMPLETE' } );
    clearTimeout( requestExpireTimeout );
  } ).catch( () => {
    dispatch( ActionTypes.updateRequestsInProgress, { name: queryIdentifier, type: 'COMPLETE' } );
    clearTimeout( requestExpireTimeout );
  } );

  return response;
}


class Request {
  init( store ) {
    this.store = store;
  }

  async graphQLRequest( type = 'query', requestSchema, variables, options = {} ) {
    const requestIdentifiers = Request.extractQueryNamesFromSchema( requestSchema );
    return graphQLRequest( this.store.dispatch, type, requestSchema, requestIdentifiers, variables, options );
  }

  static extractQueryNamesFromSchema( schema ) {
    const { definitions } = schema;
    let queryName = '';
    let queryIdentifier = '';

    definitions.forEach( ( def ) => {
      queryName = queryName ? `${queryName}, ${def.name.value}` : def.name.value;
      queryIdentifier = queryIdentifier ? `${queryIdentifier}+${def.name.value}` : def.name.value;
    } );

    return {
      queryName,
      queryIdentifier
    };
  }

  mutation( requestSchema, variables, options ) {
    return this.graphQLRequest( 'mutation', requestSchema, variables, options );
  }

  query( requestSchema, variables, options ) {
    return this.graphQLRequest( 'query', requestSchema, variables, options );
  }
}


export default new Request();
