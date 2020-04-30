import { ApolloLink } from 'apollo-link';
import { getOperationDefinition } from 'apollo-utilities';

export const RequestMutatorLink = new ApolloLink( ( operation, forward ) => forward( operation ) );
