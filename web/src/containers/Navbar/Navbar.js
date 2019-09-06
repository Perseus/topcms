import { mapActions, mapGetters } from 'vuex';
import ActionTypes from '../../store/types/ActionTypes';
import RouteNames from '../../config/RouteNames';

const Navbar = {
  name: 't-navbar',
  props: {},

  computed: {
    ...getStateGetters(),
  },

  methods: {
    ...getActionDispatchers(),

    redirectToLanding() {
      this.changeRoute( { name: RouteNames.ROOT.__LANDING__ } );
    },

    redirectToAdmin() {
      this.changeRoute( { name: RouteNames.ADMIN.DASHBOARD } );
    },

    redirectToSignup() {
      this.changeRoute( { name: RouteNames.AUTH.REGISTER } );
    },

    redirectToLogin() {
      this.changeRoute( { name: RouteNames.AUTH.LOGIN } );
    },

    logout() {
      this.logoutUser();
    },

    redirectToUserManagement() {
      this.changeRoute( { name: RouteNames.USER.DETAILS } );
    },
  },
};

function getActionDispatchers() {
  return mapActions( {
    changeRoute: ActionTypes.changeRoute,
    logoutUser: ActionTypes.logoutUser,
  } );
}

function getStateGetters() {
  return mapGetters( {
    isUserLoggedIn: 'isUserLoggedIn',
    username: 'username',
    canAccessSiteAdmin: 'canAccessSiteAdmin',
    canAccessGameAdmin: 'canAccessGameAdmin',
  } );
}
export default Navbar;
