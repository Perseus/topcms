import RouteNames from '../../../config/RouteNames';

const Getters = {
  isAdminDashboardPage( state ) {
    return state.currentRoute === RouteNames.ADMIN.DASHBOARD;
  }
};

export default Getters;
