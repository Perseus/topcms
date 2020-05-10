import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import RouteNames from '../../../config/RouteNames';

function getInitialState() {
  return {
    prevRoute: '',
    currentRoute: RouteNames.ROOT.__LANDING__,
    metaData: {},
  };
}

const RouterModule = {
  state: getInitialState(),
  actions,
  getters,
  mutations,
};

export default RouterModule;
