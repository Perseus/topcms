import { ApolloLink } from 'apollo-link';
import { getOperationDefinition } from 'apollo-utilities';

export const RequestMutatorLink = new ApolloLink( ( operation, forward ) => {
  // console.log( operation, getOperationDefinition( operation ) );
  console.log( operation );
  return forward( operation );
} );
