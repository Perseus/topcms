import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const applicationModule = {

  state: {
    route: {},
  },
  
  actions,
  mutations,
  getters
};

export default applicationModule;