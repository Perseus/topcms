import Vue from 'vue';
import VueApollo from 'vue-apollo';
import {
  createApolloClient,
  restartWebsockets,
} from 'vue-cli-plugin-apollo/graphql-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

import { split, ApolloLink } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { RequestMutatorLink } from './links';


// Install the vue plugin
Vue.use( VueApollo );

// Name of the localStorage item
const AUTH_TOKEN = 'apollo-token';

// Http endpoint
const httpEndpoint = process.env.VUE_APP_GRAPHQL_HTTP || 'http://localhost:3000/graphql';
const wsEndpoint = process.env.VUE_APP_GRAPHQL_WS || 'ws://localhost:3000/graphql';
// Config
const defaultOptions = {
  // You can use `https` for secure connection (recommended in production)
  httpEndpoint,
  // You can use `wss` for secure connection (recommended in production)
  // Use `null` to disable subscriptions
  wsEndpoint,
  // LocalStorage token
  tokenName: AUTH_TOKEN,
  // Enable Automatic Query persisting with Apollo Engine
  persisting: false,
  // Use websockets for everything (no HTTP)
  // You need to pass a `wsEndpoint` for this to work
  websocketsOnly: false,
  // Is being rendered on the server?
  ssr: false,

  cache: new InMemoryCache(),

  // link: ErrorLink,

  // Override default apollo link
  // note: don't override httpLink here, specify httpLink options in the
  // httpLinkOptions property of defaultOptions.
  // link: myLink

  // Override default cache
  // cache: myCache

  // Override the way the Authorization header is set
  // getAuth: (tokenName) => ...

  // Additional ApolloClient options
  // apollo: { ... }

  // Client local data (see apollo-link-state)
  // clientState: { resolvers: { ... }, defaults: { ... } }
};

// const httpLink = new HttpLink( {
//   uri: httpEndpoint
// } );

// const wsLink = new WebSocketLink( {
//   uri: wsEndpoint,
//   options: {
//     reconnect: true
//   }
// } );

// const link = split(
//   ( { query } ) => {
//     const definition = getMainDefinition( query );
//     return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
//   },
//   wsLink
// );

// const links = ApolloLink.from( [
//   RequestMutatorLink
// ] );

// Call this in the Vue app file
export function createProvider( options = {} ) {
  // Create apollo client
  const { apolloClient, wsClient } = createApolloClient( {
    ...defaultOptions,
    ...options,
    // link,
    cache: new InMemoryCache(),
    connectToDevTools: true,
    // link: links,
  } );
  apolloClient.wsClient = wsClient;

  // Create vue apollo provider
  const apolloProvider = new VueApollo( {
    defaultClient: apolloClient,
    defaultOptions: {
      $query: {
        fetchPolicy: 'no-cache',
      },
    },
    errorHandler( error ) {
      // eslint-disable-next-line no-console
      console.log(
        '%cError',
        'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;',
        error.message
      );
    },
  } );

  return apolloProvider;
}
