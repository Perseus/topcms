import Vuex from 'vuex';
import Vue from 'vue';
import userModule from './modules/user';
import applicationModule from './modules/application';
import routerModule from './modules/router';
import { RouterSyncPlugin } from './plugins/RouterSync';

Vue.use( Vuex );


const store = new Vuex.Store( {
  modules: {
    user: userModule,
    application: applicationModule,
    router: routerModule,
  },
  plugins: [ RouterSyncPlugin ],
} );

export default store;
