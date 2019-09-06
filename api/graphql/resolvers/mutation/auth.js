import crypto from 'crypto';

import { AccountServer, GameDB } from '../../../database/models/index';
import { extractErrors } from '../../../helpers/errorHandler';
import { AuthenticationError, UserInputError } from 'apollo-server';
import jsonwebtoken from 'jsonwebtoken';

export async function createUser( obj, args, context, info ) {
  try {
    const { input } = args;
    const newUser = await AccountServer.User.create( {
      name: input.username,
      email: input.email,
      originalPassword: input.password,
    } );
    if ( newUser ) {
      await GameDB.Account.create( {
        act_id: newUser.id,
        act_name: newUser.name,
        gm: 0,
      } );
      return newUser;
    }
  } catch ( err ) {
    const errors = extractErrors( err );
    throw new UserInputError( 'INVALID_AUTH', { validationErrors: errors } );
  }
}

export async function loginUser( obj, args, context ) {
  try {
    const { input } = args;
    const hashedPassword = crypto.createHash( 'md5' ).update( input.password ).digest( 'hex' ).toUpperCase();
    const user = await AccountServer.User.findOne( {
      where: {
        name: input.username,
        password: hashedPassword
      }
    } );

    if ( user ) {
      const scope = user.getAccessLevel( GameDB.Account );
      const jwtToken = jsonwebtoken.sign( {
          data: {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: Date.now(),
            scope: scope,
          }
        },
        process.env.JWT_SECRET, {
          expiresIn: '6h',
        } );

      context.res.cookie( '_sid', jwtToken, { httpOnly: true, sameSite: true } );

      return user;
    } else {
      throw new UserInputError( 'INVALID_AUTH', {
        validationErrors: [ 'INCORRECT_CREDENTIALS' ]
      } );
    }
  } catch ( err ) {
    return err;
  }
}

export async function logoutUser( obj, args, context ) {
  
  try {
    context.res.clearCookie( '_sid' );
    return {
      id: context.res.user
    };
  } catch ( err ) {
    return err;
  }

}