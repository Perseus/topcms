import * as types from '../../mutation-types';
import { loginUser, getUserData, logoutUser, registerUser } from '../../../utils/http/auth';
import { requestRouteChange } from '../../../utils/router/router';
import { tokenName } from '../../../utils/config';


const Actions = {

  async onUserLogin ( context, payload ) {
    
    context.commit(types.LOGIN_IN_PROGRESS, payload);

    const loginStatus = await loginUser(payload);

    if (loginStatus.errors) {
      context.commit(types.LOGIN_COMPLETED, { type: 'error', error: loginStatus.errors });
    } else {
      context.commit(types.LOGIN_COMPLETED, { type: 'success', token: loginStatus.token });

      const userData = await getUserData();
      if ( userData.message && ( userData.message === 'Unauthorized' || userData.message === 'Unauthenticated.' ) ) {
        context.commit(types.USER_UNAUTHORIZED);
      } else {
        context.commit(types.USER_LOGGED_IN, userData);
        requestRouteChange( payload.onSuccessRedirect );
      }

    }

    return loginStatus;

  },

  async getUserAuth( context, payload ) {
    if (!this.getters.userAuthStatus) {
      const userData = await getUserData();
      if (userData.message && (userData.message === 'Unauthorized' || userData.message === 'Unauthenticated.')) {
        context.commit(types.USER_UNAUTHORIZED);
      } else {
        context.commit(types.USER_LOGGED_IN, userData);
        requestRouteChange( payload.name );
        
      }
    }
  },

  async logoutUser( context, payload ) {

    if (this.state.user.isLoggedIn) {

        const logoutStatus = await logoutUser();
        if (logoutStatus.message === 'LOGOUT_SUCCESS') {
          localStorage.removeItem(tokenName);
          context.commit(types.USER_LOGGED_OUT);
          requestRouteChange( payload.onSuccessRedirect );
        }
        return logoutStatus;

    }
    
  },

  async registerUser( context, payload ) {

    context.commit(types.SIGNUP_IN_PROGRESS, payload);

    const registrationStatus = await registerUser(payload);

    if (registrationStatus.errors) {
      context.commit(types.SIGNUP_COMPLETED, { type: 'error', error: registrationStatus.errors });
    } else {
      console.log('no errors');

      context.commit(types.SIGNUP_COMPLETED, { type: 'success', token: registrationStatus.token });
      console.log(registrationStatus);
      localStorage.setItem(tokenName, registrationStatus.access_token);
      requestRouteChange( '/' );
    }

    return registrationStatus;
    
  }

};


export default Actions;