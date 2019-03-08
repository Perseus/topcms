import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const userModule = {

  state: {
    name: '',
    email: '',
    token: localStorage.getItem('token') || '',
    isLoggedIn: false,
    authenticationStatus: {
      isLoggingIn: false,
      errors: [],
    },
  },
  
  actions,
  mutations,
  getters
};

export default userModule;