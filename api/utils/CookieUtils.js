export function getCookie( cookies, name ) {
  const cookie = {};
  cookies.split( ';' ).forEach( ( el ) => {
    const [ k, v ] = el.split( '=' );
    cookie[ k.trim() ] = v;
  } );
  return cookie[ name ];
}
