import crypto from 'crypto';

import { UserInputError, AuthenticationError, ValidationError } from "apollo-server";
import { AccountServer, GameDB } from '../../../database/models';

export async function updateUser( obj, args, context ) {
  try {
    const { userInfo } = args;
    const { req: { user } } = context;
    const newEmail = userInfo.email;

    if ( !user ) {
      return new AuthenticationError( 'User is not logged in.' );
    }

    let retrievedUser = await AccountServer.User.findOne( {
      where: {
        id: user,
        originalPassword: userInfo.old_password
      }
    } );

    if ( !retrievedUser ) {
      return new UserInputError( 'INVALID_OLD_PASSWORD' );
    }

    if ( newEmail !== retrievedUser.email && ( !userInfo.new_password || !userInfo.old_password ) ) {
      await AccountServer.User.update( {
        email: newEmail,
      }, {
        where: {
          id: user
        }
      } );

    }

    if ( newEmail !== retrievedUser.email && userInfo.new_password && userInfo.old_password ) {
      const hashedPassword = crypto.createHash( 'md5' ).update( userInfo.new_password ).digest( 'hex' ).toUpperCase();
      await AccountServer.User.update( {
        email: newEmail,
        originalPassword: userInfo.new_password,
        password: hashedPassword,
      }, {
        where: {
          id: user
        }
      } );
    }

    if ( newEmail === retrievedUser.email && userInfo.new_password && userInfo.old_password ) {
      const hashedPassword = crypto.createHash( 'md5' ).update( userInfo.new_password ).digest( 'hex' ).toUpperCase();
      await AccountServer.User.update( {
        originalPassword: userInfo.new_password,
        password: hashedPassword,
      }, {
        where: {
          id: user
        }
      } );

    }

    retrievedUser = await AccountServer.User.findOne( {
      where: {
        id: user
      }
    } );

    return retrievedUser;

  } catch ( err ) {
    throw new UserInputError( err );
  }
}

export async function updateUserFromAdmin( context, args ) {
  try {
    const { id, email, gm, password } = args;
    
    const fieldsToUpdate = {

    };

    if ( email && email !== '' ) {
      fieldsToUpdate.email = email;
    }

    if ( password && password !== '' ) {
      fieldsToUpdate.originalPassword = password;
      fieldsToUpdate.password = crypto.createHash( 'md5' ).update( password ).digest( 'hex' ).toUpperCase();
    }

    await AccountServer.User.update( {
      ...fieldsToUpdate
    }, {
      where: {
        id
      }
    } );

    if ( gm ) {
      await GameDB.Account.update( {
        gm
      }, {
        where: {
          act_id: id
        }
      } );
    }

    const updatedUser = AccountServer.User.findOne( {
      where: {
        id
      }
    } );

    return updatedUser;
  } catch ( err ) {
    return new UserInputError( err );
  }
}