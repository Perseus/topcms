import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const applicationModule = {
  namespaced: true,
  state: {
    route: {},
    isApplicationLoading: false,
    isToastVisible: false,
    toastOptions: {},
  },

  actions,
  mutations,
  getters
};

export default applicationModule;
