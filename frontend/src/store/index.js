import Vuex from 'vuex';
import Vue from 'vue';
import userModule from './modules/user/index';
import applicationModule from './modules/application/index';

Vue.use(Vuex);


const store = new Vuex.Store({
  modules: {
    user: userModule,
    application: applicationModule,
  },
});

export default store;


