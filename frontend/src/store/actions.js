import * as types from './mutation-types';
import { loginUser, getUserData, logoutUser } from '../utils/http/auth';
import { tokenName } from '../utils/config';
import Router from '../router/index';


const Actions = {

  async onUserLogin ( context, payload ) {
    
    context.commit(types.LOGIN_IN_PROGRESS, payload);

    const loginStatus = await loginUser(payload);

    if (loginStatus.errors) {
      context.commit(types.LOGIN_COMPLETED, { type: 'error', error: loginStatus.errors });
    } else {
      context.commit(types.LOGIN_COMPLETED, { type: 'success', token: loginStatus.token });
      localStorage.setItem(tokenName, loginStatus.token);
      Router.push('/');
    }

  },

  async getUserAuth( context, payload ) {

    if (!this.state.userState.isLoggedIn) {

      const token = localStorage.getItem(tokenName) || '';

      if ( token === '' ) {
        return;
      } else {
        const userData = await getUserData(token);
        if (userData.message && (userData.message === 'Unauthorized' || userData.message === 'Unauthenticated.')) {
          context.commit(types.USER_UNAUTHORIZED);
          localStorage.removeItem(tokenName);
        } else {
          context.commit(types.USER_LOGGED_IN, userData);
          Router.push('/');
        }
      }
    }
  },

  async logoutUser( context, payload ) {

    if (this.state.userState.isLoggedIn) {
      const token = localStorage.getItem(tokenName) || '';

      if ( token === '' ) {
        context.commit(types.USER_LOGGED_OUT);
      } else {
        const logoutStatus = logoutUser(token);
        context.commit(types.USER_LOGGED_OUT);
      }
    }
  }

};


export default Actions;