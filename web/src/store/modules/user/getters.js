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
    return ( state.permissions.includes( 'SITE' ) );
  },
  canAccessGameAdmin( state ) {
    return ( state.permissions.includes( 'ADMIN' ) );
  }
};

export default Getters;
