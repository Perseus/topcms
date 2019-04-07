export function authMiddleware( req, res, next ) {
  const requestHeaders = req.headers;

  if ( !req.headers || !req.headers.Authorization ) {
    req.user = null;
  }

  next();

};
