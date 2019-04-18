import crypto from 'crypto';

import { AccountServer, GameDB } from '../../../database/models/index';
import { extractErrors } from '../../../helpers/errorHandler';
import { ValidationError } from 'sequelize';
import { AuthenticationError } from 'apollo-server';
import jsonwebtoken from 'jsonwebtoken';

export async function createUser( obj, args, context, info ) {
  try {
    const newUser = await AccountServer.User.create( {
      name: args.name,
      email: args.email,
      originalPassword: args.password,
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
    throw new ValidationError( errors );
  }
}

export async function loginUser( obj, args, context, info ) {
  try {
    const hashedPassword = crypto.createHash( 'md5' ).update( args.password ).digest( 'hex' ).toUpperCase();
    const user = await AccountServer.User.findOne( {
      where: {
        name: args.name,
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
      throw new AuthenticationError( 'INCORRECT_CREDENTIALS' );
    }
  } catch ( err ) {
    return err;
  }
}
