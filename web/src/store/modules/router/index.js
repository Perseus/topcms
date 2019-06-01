import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import RouteNames from '../../../config/RouteNames';

const routerModule = {
  namespaced: true,

  state: {
    currentRoute: RouteNames.ROOT.__BASE__,
    routeData: {},
  },

  actions,
  mutations,
  getters
};

export default routerModule;
