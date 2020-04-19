import { verify, TokenExpiredError } from 'jsonwebtoken';
import { Request } from 'express';
import type { ExpressParams } from '../types/external';
// import { getCookie } from '../utils/CookieUtils';


export const retrieveUserFromRequest = ( req: Request ): UserSessionData => {
  const requestCookies = req.cookies;

  if ( !requestCookies._sid ) {
    return null;
  }

  const verifiedToken = verify( requestCookies._sid, process.env.JWT_SECRET );
  return verifiedToken.data;
};

export const authMiddleware = ( { req, res }: ExpressParams ): ExpressParams => {
  try {
    const user = retrieveUserFromRequest( req );
    req.user = user;
  } catch ( err ) {
    if ( err instanceof TokenExpiredError ) {
      res.clearCookie( '_sid' );
    }
  }
  return { req, res };
};


// module.exports.retrieveUserFromSocketRequest = function retrieveUserFromSocketRequest( socket ) {
//   try {
//     const _sid = getCookie( socket.request.headers.cookie, '_sid' );

//     if ( !_sid ) {
//       return null;
//     }

//     const verifiedToken = verify( _sid, process.env.JWT_SECRET );
//     return verifiedToken.data.id;
//   } catch ( err ) {
//     return err;
//   }
// };

// module.exports.socketAuthMiddleware = function socketAuthMiddleware( socket, next ) {
//   try {
//     const user = retrieveUserFromSocketRequest( socket );
//     if ( !user ) {
//       next( new Error( 'Authentication failed' ) );
//     }

//     socket.join( `Room:{${user}}`, next );
//   } catch ( err ) {
//     next( new Error( 'Authentication failed' ) );
//   }
// };
