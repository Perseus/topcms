import _ from 'lodash';

export function graphQLErrorExtractor( error ) {
  const graphQLErrors = error.graphQLErrors;
  const errors = [];

  graphQLErrors.forEach( ( err ) => {
    if ( err.message ) {
      if ( _.isArray( err.message ) ) {
        err.message.forEach( message => {
          errors.push( message );
        } );
      } else {
        errors.push( err.message );
      }
    }
  } );

  return errors;
}
