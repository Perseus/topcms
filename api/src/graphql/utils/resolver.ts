import { GraphQLResolveInfo } from 'graphql';
import Joi from '@hapi/joi';

import TError from '../../utils/TError';

interface ResolverResponse {
  code: string;
  success: boolean;
  message?: string;
}

interface ResolverSuccessResponse extends ResolverResponse {
  // Can't think of a way to define types for the data property. Resolvers can respond with data in any format.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

interface ResolverErrorResponse extends ResolverResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: Record<string, any>;
}

interface ResolverParams {
  parent: ResolverResponse;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: Record<string, any>;
  context: ResolverContextParam;
  info: GraphQLResolveInfo;
}

interface ResolverReturnValue {
  message?: string;
  // Can't think of a way to define types for the data property. Resolvers can respond with data in any format.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

interface ResolverFunction {
  ( params: ResolverParams ): Promise<ResolverReturnValue>;
}

interface ResolverWrapperParams {
  validationSchema?: Joi.ObjectSchema;
  exec: ResolverFunction;
}

interface ResolverContextParam {
  req: Express.Request;
  res: Express.Response;
}

export function resolve( params: ResolverWrapperParams ): Function {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async( parent: ResolverResponse, args: Record<any, any>, context: ResolverContextParam, info: GraphQLResolveInfo ): Promise<ResolverSuccessResponse|ResolverErrorResponse> => {
    const { validationSchema, exec } = params;
    if ( validationSchema ) {
      try {
        await validationSchema.validateAsync( args );
      } catch ( err ) {
        return {
          code: 'input.VALIDATION_ERROR',
          success: true,
          message: 'There were validation errors.',
          errors: err,
        };
      }
    }

    try {
      const { data, message } = await exec( {
        parent,
        args,
        context,
        info
      } );

      const resolverResponse: ResolverSuccessResponse = {
        code: 'OK',
        success: true,
        data
      };
      console.log( resolverResponse );

      if ( message ) {
        resolverResponse.message = message;
      }

      return resolverResponse;
    } catch ( err ) {
      if ( err instanceof TError ) {
        const { code, message } = err;

        return {
          code,
          success: true,
          errors: [ message ],
        };
      }

      throw new Error( err );
    }
  };
}
