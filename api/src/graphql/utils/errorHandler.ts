import { ForeignKeyConstraintError } from 'sequelize';

export function sequelizeErrorHandler( error: any ): ResolverErrorResponse {
  let code = '500';
  console.log( error );
  if ( error instanceof ForeignKeyConstraintError ) {
    code = 'db.FK_CONSTRAINT';
  }

  return {
    code,
    success: false,
    errors: [ error ],
  };
}
