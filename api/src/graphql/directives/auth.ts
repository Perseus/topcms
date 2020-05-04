import { Request, Response } from 'express';
import { AuthenticationError, ForbiddenError } from 'apollo-server';
import User from '../../database/models/AccountServer/User';
import TError from '../../utils/TError';
import { getAccessLevelFromString } from '../../types/db';

interface AuthenticationDirectiveArguments {
  role: string;
}

interface ResolverContextParam {
  req: Request;
  res: Response;
}

/**
 * isAuthenticatedDirective
 * Auth directive for GraphQL queries and mutations. Retrieves the user's
 * ID from the request ( added to it by the auth middleware ), validates authentication and authorization
 *
 * @param {Function} next Callback to proceed with the GraphQL query after processing the user
 * @param {*} src
 * @param {Object} args Arguments provided to the directive ( in this case, intended ROLE of the user )
 * @param {Object} context GraphQL context object
 */
export const isAuthenticatedDirective = async( next: Function, _, args: AuthenticationDirectiveArguments, context: ResolverContextParam ): Promise<void> => {
  const { req } = context;
  if ( !req.user || !req.user.id ) {
    throw new AuthenticationError( 'user.NOT_AUTHENTICATED' );
  }

  const userID = req.user.id;

  if ( !userID ) {
    throw new AuthenticationError( 'user.NOT_AUTHENTICATED' );
  }

  try {
    const user = await User.findOne( {
      where: {
        id: userID
      }
    } );

    if ( user ) {
      const accessLevels = await user.getAccessLevel();
      const roleInSchema = getAccessLevelFromString( args.role );

      if ( roleInSchema ) {
        if ( accessLevels.includes( roleInSchema ) ) {
          return next();
        }
        throw new ForbiddenError( 'user.NOT_AUTHORIZED' );
      } else {
        return next();
      }
    } else {
      throw new AuthenticationError( 'user.NOT_AUTHENTICATED' );
    }
  } catch ( err ) {
    throw new Error( err );
  }
};

// module.exports.websocketAuthentication = async function websocketAuthentication( connectionParams, webSocket ) {
//   console.log( connectionParams, webSocket );
// };
