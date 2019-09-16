import { onError } from 'apollo-link-error';
import { SnackbarProgrammatic as Snackbar } from 'buefy';

import Logger from './Logger';


export default onError( ( {
  graphQLErrors, networkError, operation, forward
} ) => {
  if ( graphQLErrors ) {
    for ( const err of graphQLErrors ) {
      Logger.log( `${err.extensions.code} - ${err.message}`, 'error' );
    }

    if ( graphQLErrors[ 0 ] && graphQLErrors.length === 1 && graphQLErrors[ 0 ].extensions.code === 'UNAUTHENTICATED' ) {
      return;
    }

    Snackbar.open( {
      duration: 2000,
      message: 'Something went wrong! Please try again.',
      position: 'is-bottom',
      type: 'is-error',
    } );
  } else {
    Snackbar.open( {
      duration: 2000,
      message: 'Something went wrong! Please try again.',
      position: 'is-bottom',
      type: 'is-error',
    } );
  }

  forward( operation );
} );
