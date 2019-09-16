import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import applicationModule from './modules/application';
import userModule from './modules/user';
import routerModule from './modules/router';
import gameModule from './modules/game';
import siteModule from './modules/site';
import adminModule from './modules/admin';

Vue.use( Vuex );

export default new Vuex.Store( {
  modules: {
    application: applicationModule,
    user: userModule,
    router: routerModule,
    game: gameModule,
    site: siteModule,
    admin: adminModule,
  },
  plugins: [
    createLogger(),
  ]
} );
