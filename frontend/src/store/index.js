import Actions from './actions';
import Mutations from './mutations';
import State from './state';

const Store = {
  state: State,
  mutations: Mutations,
  actions: Actions
};

export default Store;


