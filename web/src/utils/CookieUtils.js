export function getCookie( name ) {
  const cookie = {};
  document.cookie.split( ';' ).forEach( ( el ) => {
    const [ k, v ] = el.split( '=' );
    cookie[ k.trim() ] = v;
  } );
  return cookie[ name ];
}
