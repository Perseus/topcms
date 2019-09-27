import http from 'http';
import dotenv from 'dotenv';
import socketio from 'socket.io';
// GraphQL Subscription
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import app from './app';
import schema from './graphql/schema/schema';
import socketEventHandlers from './socket';
import { socketAuthMiddleware } from './helpers/authHelpers';

dotenv.config();

const port = process.env.port || 3000;
const server = http.createServer( app );
const io = socketio( server );
io.use( socketAuthMiddleware );

server.listen( port, () => {
  console.log( ` 🚀 Running api server on port http://localhost:${port}/graphql ` );
  // console.log( ` 🚀 Running subscriptions server on port ws://localhost:${port}/subscriptions  `);
} );

io.on( 'connection', socketEventHandlers );
// subscription server
// not being used right now
// const subscriptionServer = SubscriptionServer.create(
//   {
//     schema,
//     execute,
//     subscribe,
//     onConnect: (params) => {
//       console.log( params );
//     },
//     onMessage: (message) => {
//       console.log( `message received ${message}`);
//     }
//   },
//   {
//     server,
//     path: '/subscriptions'
//   },

// );
