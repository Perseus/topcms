import { mapGetters, mapActions } from 'vuex';
import ActionTypes from '../../store/types/ActionTypes';
import RouteNames from '../../config/RouteNames';

const Admin = {
  name: 't-admin',
  computed: {
    ...getStateGetters(),
  },
  methods: {
    ...getActionDispatchers(),
    redirectToSiteAdmin() {
      this.changeRoute( {
        name: RouteNames.ADMIN.SITE
      } );
    },
    redirectToGameAdmin() {
      this.changeRoute( {
        name: RouteNames.ADMIN.GAME
      } );
    }
  },
};

function getActionDispatchers() {
  return mapActions( {
    changeRoute: ActionTypes.changeRoute
  } );
}

function getStateGetters() {
  return mapGetters( [
    'isAdminDashboardPage'
  ] );
}

export default Admin;
