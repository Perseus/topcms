import * as types from './mutation-types';

const Mutations = {

  [types.LOGIN_IN_PROGRESS] (state, payload) {
    state.userState.authenticationStatus.isLoggingIn = true;
  },

  [types.LOGIN_COMPLETED] (state, payload) {

    state.userState.authenticationStatus.isLoggingIn = false;
    if (payload.type === 'error') {
      state.userState.isLoggedIn = false;
      state.userState.authenticationStatus.errors = payload.error;
    }
    
  },

  [types.USER_UNAUTHORIZED] (state, payload) {
    
    state.userState.isLoggedIn = false;
    state.userState.name = '';
    state.userState.email = '';

  },

  [types.USER_LOGGED_IN] (state, payload) {

    if (payload.message === "Unauthenticated.") {
      state.userState.isLoggedIn = false;
    } else {
      state.userState.isLoggedIn = true;
      state.userState.authenticationStatus.errors = {};
      state.userState.name = payload.name;
      state.userState.email = payload.email;
    }
    
  },

  [types.USER_LOGGED_OUT] (state, payload) {

    state.userState.isLoggedIn = false;
    state.userState.name = '';
    state.userState.email = '';

  }

};


export default Mutations;
