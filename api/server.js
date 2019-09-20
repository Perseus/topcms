import http from 'http';
import dotenv from 'dotenv';

// GraphQL Subscription
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import app from './app';
import schema from "./graphql/schema/schema";

dotenv.config();

const port = process.env.port || 3000;

const server = http.createServer( app );
server.listen( port, () => {
  console.log( ` 🚀 Running api server on port http://localhost:${port}/graphql ` );
  console.log( ` 🚀 Running subscriptions server on port http://localhost:${port}/subscriptions  `);
} );


// subscription server
const subscriptionServer = SubscriptionServer.create(
  {
    schema,
    execute,
    subscribe
  },
  {
    server,
    path: '/subscriptions'
  }
);
