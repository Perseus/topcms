import { createProvider } from './vue-apollo';

export const apolloProvider = createProvider( {
  wsEndpoint: null,
  getAuth: () => undefined, // using cookies,
  httpLinkOptions: {
    credentials: 'include'
  }
} );

export const apolloClient = apolloProvider.defaultClient;
