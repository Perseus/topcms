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

  dispatch( ActionTypes.updateRequestsInProgress, { name: requestName, type: 'COMPLETE' } );

  return response;
}
