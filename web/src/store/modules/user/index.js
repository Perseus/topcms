import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export function getInitialState() {
  return {
    isLoggedIn: false,
    permissions: [],
    username: '',
    email: '',
    authProcessingState: {
      isRegistering: false,
      isLoggingIn: false,
      errors: [],
    }
  };
}

const UserModule = {
  state: getInitialState(),
  actions,
  getters,
  mutations,
};

export default UserModule;
