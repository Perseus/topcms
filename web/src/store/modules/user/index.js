import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export function getInitialState() {
  return {
    isLoggedIn: false,
    authProcessingState: {
      isRegistering: false,
      isLoggingIn: false,
      errors: [],
    },
    userData: {
      username: '',
      email: '',
      permissions: [],
      awardCenterPoints: 0,
      mallPoints: 0,
      characterDetails: [],
    },
    storageBox: {
      items: '',
      itemsData: [],
    },
  };
}

const UserModule = {
  state: getInitialState(),
  actions,
  getters,
  mutations,
};

export default UserModule;
