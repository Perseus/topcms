const socketio = () => import( /* webpackChunkName: 'socketio' */ 'socket.io-client' );

class SocketHandler {
  constructor() {
    this.connectionURL = process.env.VUE_APP_SOCKET_URL || 'http://localhost:3000';
  }

  async init() {
    const socket = await socketio();
    this.socket = socket.connect( this.connectionURL, {
      autoConnect: true,
    } );
  }

  emit( eventName, params ) {
    return this.socket.emit( eventName, params );
  }

  listen( eventName, callback ) {
    this.socket.off( eventName );
    this.socket.on( eventName, callback );
  }
}


export default new SocketHandler();
