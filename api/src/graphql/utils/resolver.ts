import { GraphQLResolveInfo } from 'graphql';
import Joi from '@hapi/joi';
import { Request, Response } from 'express';

import _ from 'lodash';
import { IFieldResolver } from 'graphql-tools';
import TError from '../../utils/TError';
import { sequelizeErrorHandler } from './errorHandler';

interface ResolverParams {
  parent: ResolverSuccessResponse;
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
  validationSchema?: Record<string, Joi.Schema>;
  action: ResolverFunction;
}

interface ResolverContextParam {
  req: Request;
  res: Response;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function resolve( params: ResolverWrapperParams ): IFieldResolver<ResolverSuccessResponse, Record<any, any>, ResolverContextParam> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async( parent: ResolverSuccessResponse, args: Record<any, any>, context: ResolverContextParam, info: GraphQLResolveInfo ): Promise<ResolverSuccessResponse|ResolverErrorResponse> => {
    const { validationSchema, action } = params;
    if ( validationSchema && !_.isEmpty( validationSchema ) ) {
      try {
        await Joi.object( validationSchema ).validateAsync( args );
      } catch ( err ) {
        console.log( err );
        return {
          code: 'input.VALIDATION_ERROR',
          success: false,
          message: 'There were validation errors.',
          errors: err.details,
        };
      }
    }

    try {
      const { data, message } = await action( {
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
          message,
          errors: [ message ],
        };
      }

      return sequelizeErrorHandler( err );
    }
  };
}
