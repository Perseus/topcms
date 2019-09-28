import { verify, TokenExpiredError } from 'jsonwebtoken';
import { getCookie } from '../utils/CookieUtils';


export function authMiddleware( { req, res } ) {
  try {
    const user = retrieveUserFromRequest( req );
    req.user = user;
  } catch ( err ) {
    if ( err instanceof TokenExpiredError ) {
      res.clearCookie( '_sid' );
    }
  }
  return { req, res };
}

export function retrieveUserFromRequest( request ) {
  const requestCookies = request.cookies;

  if ( !requestCookies._sid ) {
    return null;
  }

  const verifiedToken = verify( requestCookies._sid, process.env.JWT_SECRET );

  return verifiedToken.data.id;
}

export function retrieveUserFromSocketRequest( socket ) {
  try {
    const _sid = getCookie( socket.request.headers.cookie, '_sid' );

    if ( !_sid ) {
      return null;
    }

    const verifiedToken = verify( _sid, process.env.JWT_SECRET );
    return verifiedToken.data.id;
  } catch ( err ) {
    return err;
  }
}

export function socketAuthMiddleware( socket, next ) {
  try {
    const user = retrieveUserFromSocketRequest( socket );
    if ( !user ) {
      next( new Error( 'Authentication failed' ) );
    }

    socket.join( `Room:{${user}}`, next );
  } catch ( err ) {
    next( new Error( 'Authentication failed' ) );
  }
}
