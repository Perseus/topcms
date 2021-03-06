import request from '@services/GraphQLRequest';
import GeneralConfig from '../../../config/GeneralConfig';

const Getters = {
  isUserRegistering() {
    return ( request.isRequestInProgress( 'createUser' ) );
  },
  isUserLoggingIn() {
    return ( request.isRequestInProgress( 'loginUser' ) );
  },
  isUserLoggedIn( state ) {
    return state.isLoggedIn;
  },
  authErrors( state ) {
    return state.authProcessingState.errors;
  },
  username( state ) {
    return state.userData.username;
  },
  canAccessSiteAdmin( state ) {
    return ( state.userData.permissions.includes( GeneralConfig.ACCESS_LEVELS.SITE ) );
  },
  canAccessGameAdmin( state ) {
    return ( state.userData.permissions.includes( GeneralConfig.ACCESS_LEVELS.ADMIN ) );
  }
};

export default Getters;
