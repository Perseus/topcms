import _ from 'lodash';

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
