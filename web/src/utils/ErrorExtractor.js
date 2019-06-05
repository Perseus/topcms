import _ from 'lodash';

export function extractGraphQLErrors( serverResponse ) {
  const graphQLErrors = _.get( serverResponse, 'graphQLErrors' );
  const networkError = _.get( serverResponse, 'networkError.result.errors' );
  if ( !graphQLErrors && !networkError ) {
    return [];
  }

  const errors = graphQLErrors.length > 0 ? graphQLErrors : networkError;

  const error = errors[ 0 ].extensions;

  switch ( error.code ) {
    case 'BAD_USER_INPUT':
      return error.exception.validationErrors.map( error => ( {
        code: error
      } ) );
    case 'INTERNAL_SERVER_ERROR':
      if ( error.exception.code === 'ERR_GRAPHQL_CONSTRAINT_VALIDATION' ) {
        return [
          {
            code: 'CONSTRAINT_ERROR',
            msg: _composeConstraintError( {
              constraint: error.exception.context[ 0 ].arg,
              required: error.exception.context[ 0 ].value,
              field: error.exception.fieldName
            } ),
            field: error.exception.fieldName
          }
        ];
      }
      return [];
    case 'UNAUTHENTICATED':
      return 'UNAUTHENTICATED';
    default:
  }
}

function _composeConstraintError( { constraint, required, field } ) {
  let constraintError = '';
  switch ( constraint ) {
    case 'minLength':
      constraintError = `The ${field} should have a minimum of ${required} characters`;
      break;
    case 'format':
      constraintError = `The ${field} field should contain a valid ${required}`;
      break;
    default:
  }

  return constraintError;
}
