import { AccountServer, GameDB } from '../../../database/models/index';
import { AuthenticationError } from 'apollo-server';

export async function users( object, args, context, info ) {
  const users = await AccountServer.User.findAll();
  return users;
}

export async function me( object, args, context, info ) {
  try {
    const userID = context.req.user;
    const user = await AccountServer.User.findOne( {
      where: {
        id: userID
      }
    } );
    return user;
  } catch ( err ) {
    return err;
  }
}

export async function logout( object, args, context, info ) {
  try {
    context.res.clearCookie( '_sid' );
    return 'LOGOUT_SUCCESS';
  } catch ( err ) {
    return err;
  }
}
