import { verify, TokenExpiredError } from 'jsonwebtoken';


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
};

export function retrieveUserFromRequest( request ) {
  const requestCookies = request.cookies;

  if ( !requestCookies._sid ) {
    return null;
  }

  const verifiedToken = verify( requestCookies._sid, process.env.JWT_SECRET );

  return verifiedToken.data.id;
}
