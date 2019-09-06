import { UserInputError, AuthenticationError, ValidationError } from "apollo-server";
import { AccountServer, GameDB } from '../../../database/models';

export async function updateUser( obj, args, context ) {
  try {
    const { userInfo } = args;
    const { req: { user } } = context;
    let newEmail = userInfo.email;

    if ( !user ) {
      return new AuthenticationError( 'User is not logged in.' );
    }

    const retrievedUser = await AccountServer.User.findOne( {
      where: {
        id: user,
        originalPassword: userInfo.old_password
      }
    } );

    if ( !retrievedUser ) {
      return new UserInputError( 'INVALID_OLD_PASSWORD' );
    }

    // if ( newEmail === )

    const updatedUser = await AccountServer.User.update( {
      email: userInfo.email
    }, {
      where: {
        id
      }
    } );


  } catch ( err ) {
    throw new UserInputError( err );
  }
}