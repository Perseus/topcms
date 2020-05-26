import socketio from 'socket.io-client';

class SocketHandler {
  constructor() {
    this.connectionURL = process.env.VUE_APP_SOCKET_URL || 'http://localhost:3000';
  }

  init() {
    this.socket = socketio.connect( this.connectionURL, {
      autoConnect: true,
    } );
    console.log( this.socket );
    this.socket.on( 'error', ( err ) => {
      console.log( 'error on socket', err );
    } );
  }

  emit( eventName, params ) {
    console.log( this.socket, this.connectionURL, 'emitting', eventName, params );
    return this.socket.emit( eventName, params );
  }

  listen( eventName, callback ) {
    this.socket.off( eventName );
    this.socket.on( eventName, callback );
  }
}


export default new SocketHandler();
