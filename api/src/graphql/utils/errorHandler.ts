export function sequelizeErrorHandler( error: any ): ResolverErrorResponse {
  return {
    code: '500',
    success: false,
    errors: [ error ],
  };
}
