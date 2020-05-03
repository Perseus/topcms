import GeneralConfig from '../../../config/GeneralConfig';

const Getters = {
  isUserRegistering( state ) {
    return state.authProcessingState.isRegistering;
  },
  isUserLoggingIn( state ) {
    return state.authProcessingState.isLoggingIn;
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
    console.log( state.permissions );
    return ( state.permissions.includes( GeneralConfig.ACCESS_LEVELS.SITE ) );
  },
  canAccessGameAdmin( state ) {
    console.log( state.permissions );
    return ( state.permissions.includes( GeneralConfig.ACCESS_LEVELS.ADMIN ) );
  }
};

export default Getters;
