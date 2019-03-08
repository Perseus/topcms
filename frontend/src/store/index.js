import Vuex from 'vuex';
import Vue from 'vue';
import userModule from './modules/user/index';

Vue.use(Vuex);


const store = new Vuex.Store({
  modules: {
    user: userModule
  },
});

export default store;


