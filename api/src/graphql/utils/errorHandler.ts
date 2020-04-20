export function sequelizeErrorHandler( error: any ): ResolverErrorResponse {
  console.log( error );
  return {
    code: '500',
    success: false,
    errors: [ error ],
  };
}
