import { AccountServer, GameDB } from '../../database/models/index';
import { AuthenticationError } from 'apollo-server';
import _ from 'lodash';


/**
 * isAuthenticatedDirective
 * Auth directive for GraphQL queries and mutations. Retrieves the user's
 * ID from the request ( added to it by the auth middleware ), validates authentication and authorization
 * @param {Function} next Callback to proceed with the GraphQL query after processing the user
 * @param {*} src 
 * @param {Object} args Arguments provided to the directive ( in this case, intended ROLE of the user )
 * @param {Object} context GraphQL context object
 */
export async function isAuthenticatedDirective( next, src, args, context ) {
  const userID = context.req.user;

  if ( !userID || _.isNull( userID ) ) {
    throw new AuthenticationError( 'UNAUTHENTICATED' );
  }

  try {
    const user = await AccountServer.User.findOne( {
      where: {
        id: userID
      }
    } );

    if ( user ) {
      const accessLevels = await user.getAccessLevel( GameDB.Account );
      if ( args.role ) {
        if ( accessLevels.includes( args.role ) ) {
          return next();
        } else {
          throw new AuthenticationError( 'UNAUTHORIZED' );
        }
      } else {
        return next();
      }
    } else {
      throw new AuthenticationError( 'UNAUTHENTICATED' );
    }
  } catch ( err ) {
    throw new Error( err );
  }
}
