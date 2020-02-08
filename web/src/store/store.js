import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import applicationModule from './modules/application';
import userModule from './modules/user';
import routerModule from './modules/router';
import gameModule from './modules/game';
import siteModule from './modules/site';
import adminModule from './modules/admin';
import commerceModule from './modules/commerce';

import Request from '../services/GraphQLRequest';
Vue.use( Vuex );

function getStore() {
  const store = new Vuex.Store( {
    modules: {
      application: applicationModule,
      user: userModule,
      router: routerModule,
      game: gameModule,
      site: siteModule,
      admin: adminModule,
      commerce: commerceModule,
    },
    plugins: [
      createLogger(),
    ]
  });

  Request.init( store );
  return store;
}

export default getStore();