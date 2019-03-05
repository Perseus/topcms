import Actions from './actions';
import Mutations from './mutations';
import State from './state';
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const Store = {
  state: State,
  mutations: Mutations,
  actions: Actions
};

const store = new Vuex.Store(Store);

export default store;


