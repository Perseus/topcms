export const getCookie = ( cookies: string, name: string ): string => {
  const cookie: Record<string, string> = {};
  cookies.split( ';' ).forEach( ( el ) => {
    const [ k, v ] = el.split( '=' );
    cookie[ k.trim() ] = v;
  } );
  return cookie[ name ];
};
