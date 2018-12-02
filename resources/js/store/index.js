
import Vue from 'Vue';
import Vuex from 'Vuex';

import Actions from 'actions';
import Mutations from 'mutations';
import State from 'state';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: State,
  mutations: Mutations,
  actions: Actions
});

export default store;


