import { apolloClient } from '../apollo';
import ActionTypes from '../store/types/ActionTypes';

export async function graphQLRequest( dispatch, type = 'query', requestSchema, requestName, variables = {}, options = {} ) {
  let response = {};
  dispatch( ActionTypes.updateRequestsInProgress, { name: requestName, type: 'START' } );

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
    console.log( `Request Logger ${type} ${requestName} -> `, {
      requestSchema,
      variables,
      options
    } );
  }

  const requestExpireTimeout = setTimeout( () => {
    dispatch( ActionTypes.updateRequestsInProgress, { name: requestName, type: 'COMPLETE' } );
    response.reject();
  }, 12000 );

  response.then( ( resp ) => {
    if ( process.env.NODE_ENV !== 'production' ) {
      console.log( `Response Logger ${type} ${requestName} -> `, {
        ...resp.data
      } );
    }
    dispatch( ActionTypes.updateRequestsInProgress, { name: requestName, type: 'COMPLETE' } );
    clearTimeout( requestExpireTimeout );
  } ).catch( () => { dispatch( ActionTypes.updateRequestsInProgress, { name: requestName, type: 'COMPLETE' } ); clearTimeout( requestExpireTimeout ); } );

  return response;
}


class Request {
  init( store ) {
    this.store = store;
  }

  async graphQLRequest( type = 'query', requestSchema, requestName, variables, options = {} ) {
    return graphQLRequest( this.store.dispatch, type, requestSchema, requestName, variables, options );
  }
}


export default new Request();
