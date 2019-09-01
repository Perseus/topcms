import { onError } from 'apollo-link-error';
import Logger from './Logger';

export default onError( ( {
  graphQLErrors, networkError, operation, forward
} ) => {
  if ( graphQLErrors ) {
    for ( const err of graphQLErrors ) {
      Logger.log( `${err.extensions.code} - ${err.message}`, 'error' );
    }
  }
} );
