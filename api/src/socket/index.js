const socketEvents = require( './SocketEvents' );
const socketEventHandlers = require( './socketEventHandlers' );

module.exports =  function socketEventHandler( socket ) {
  console.log( 'User connected to socket' );
  for ( const [ key, event ] of Object.entries( socketEvents ) ) {
    if ( socketEventHandlers[ event ] ) {
      socket.on( event, args => socketEventHandlers[ event ]( socket, args ) );
    }
  }
}
