import * as types from '../../mutation-types';

const Mutations = {

  [ types.SIGNUP_IN_PROGRESS ]( state, payload ) {
    state.authenticationStatus.isLoggingIn = true;
  },

  [ types.SIGNUP_COMPLETED ]( state, payload ) {

    state.authenticationStatus.isLoggingIn = false;

    if ( payload.type === 'error' ) {
      state.isLoggedIn = false;
      state.authenticationStatus.errors = payload.error;
    }

  },

  [ types.LOGIN_IN_PROGRESS ]( state ) {
    state.authenticationStatus.isLoggingIn = true;
  },

  [ types.LOGIN_COMPLETED ]( state, payload ) {

    state.authenticationStatus.isLoggingIn = false;
    if ( payload && payload.email && payload.name ) {
      state.name = payload.name;
      state.email = payload.email;
      state.isLoggedIn = true;
      state.permissions = payload.account_details.access_levels;
    } else {
      state.isLoggedIn = false;
      state.name = '';
      state.email = '';
    }

  },

  [ types.USER_UNAUTHORIZED ]( state, payload ) {

    state.isLoggedIn = false;
    state.name = '';
    state.email = '';

  },

  [ types.USER_LOGGED_IN ]( state, payload ) {

    if ( payload.message === "Unauthenticated." ) {
      state.isLoggedIn = false;
    } else {
      state.isLoggedIn = true;
      state.authenticationStatus.errors = {};
      state.name = payload.name;
      state.email = payload.email;
      state.permissions = payload.account_details.access_levels;
    }

  },

  [ types.USER_LOGGED_OUT ]( state, payload ) {

    state.isLoggedIn = false;
    state.name = '';
    state.email = '';
    state.permissions = [];

  }

};


export default Mutations;
