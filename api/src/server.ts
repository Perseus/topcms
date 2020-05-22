
import http from 'http';
import dotenv from 'dotenv';
import socketio from 'socket.io';
import path from 'path';

import app from './app';
import socketEventHandlers from './socket';

dotenv.config( {
  path: path.join( __dirname, '..', '.env' )
} );

const port = process.env.port || 3000;
const server = http.createServer( app );
const io = socketio( server );
// io.use( socketAuthMiddleware );

server.listen( port, () => {
  console.log( ` 🚀 Running api server on port http://localhost:${port}/graphql ` );
} );

io.on( 'connection', socketEventHandlers );
