import GeneralConfig from '../../../config/GeneralConfig';

const Getters = {
  isUserRegistering( state, getters, rootState ) {
    return ( rootState.application.currentRequestsInProgress.includes( 'createUser' ) );
  },
  isUserLoggingIn( state, getters, rootState ) {
    return ( rootState.application.currentRequestsInProgress.includes( 'loginUser' ) );
  },
  isUserLoggedIn( state ) {
    return state.isLoggedIn;
  },
  authErrors( state ) {
    return state.authProcessingState.errors;
  },
  username( state ) {
    return state.username;
  },
  canAccessSiteAdmin( state ) {
    return ( state.permissions.includes( GeneralConfig.ACCESS_LEVELS.SITE ) );
  },
  canAccessGameAdmin( state ) {
    return ( state.permissions.includes( GeneralConfig.ACCESS_LEVELS.ADMIN ) );
  }
};

export default Getters;
