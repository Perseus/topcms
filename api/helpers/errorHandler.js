import _ from 'lodash';
import { ValidationErrorItem, ForeignKeyConstraintError } from 'sequelize';

export function errorHandlerMiddleware( err, req, res, next ) {
  next();
}

export function extractErrors( thrownError ) {
  const parsedErrors = [];

  thrownError.errors.forEach( ( error ) => {
    parsedErrors.push( error.message );
  } );

  return parsedErrors;
}

export function composeGraphQLError( err, type, action ) {
  const errorType = getSequelizeErrorType( err );
  return {
    code: errorType,
    field: type,
    action
  }
}

function getSequelizeErrorType( error ) {

  if ( error.errors && error.errors[ 0 ] instanceof ValidationErrorItem ) {
    switch( error.errors[ 0 ].validatorKey ) {
      case 'not_unique':
        return 'NOT_UNIQUE';
    }
  }

  if ( error instanceof ForeignKeyConstraintError) {
    return 'FOREIGN_KEY_CONSTRAINT_ERROR';
  }

  return 'SEQ.UKW';
}