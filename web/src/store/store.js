import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import applicationModule from './modules/application';
import userModule from './modules/user';
import routerModule from './modules/router';

import routerPlugin from './plugins/routerPlugin';

Vue.use( Vuex );

export default new Vuex.Store( {
  modules: {
    application: applicationModule,
    user: userModule,
    router: routerModule,
  },
  plugins: [
    routerPlugin,
    // createLogger(),
  ]
} );
