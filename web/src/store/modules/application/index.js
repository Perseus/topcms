import actions from './actions';
import getters from './getters';
import mutations from './mutations';

function getInitialState() {
  return {
    isAppLoading: false,
  };
}

const ApplicationModule = {
  state: getInitialState(),
  actions,
  getters,
  mutations,
};

export default ApplicationModule;
