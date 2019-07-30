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
  },
};

function getActionDispatchers() {
  return mapActions( {
    changeRoute: ActionTypes.changeRoute,
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
