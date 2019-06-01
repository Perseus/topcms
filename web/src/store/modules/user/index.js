import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const userModule = {
  namespaced: true,

  state: {
    name: '',
    email: '',
    token: '',
    isLoggedIn: false,
    authenticationStatus: {
      isLoggingIn: false,
      errors: [],
    },
    permissions: [],
  },

  actions,
  mutations,
  getters
};

export default userModule;
