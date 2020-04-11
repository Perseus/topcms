const http = require( 'http' );
const dotenv = require( 'dotenv' );
const socketio = require( 'socket.io' );
// GraphQL Subscription
const { execute, subscribe } = require( 'graphql' );
const { SubscriptionServer } = require( 'subscriptions-transport-ws' );

const app = require( './app' );
const schema = require( './graphql/schema/schema' );
const socketEventHandlers = require( './socket' );
const { socketAuthMiddleware } = require( './helpers/authHelpers' );

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
