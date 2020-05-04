import MutationTypes from '../../types/MutationTypes';

const Mutations = {

  [ MutationTypes.REGISTERING_USER ]( state ) {
    state.authProcessingState.isRegistering = true;
  },

  [ MutationTypes.REGISTRATION_COMPLETE ]( state, { errors } ) {
    state.authProcessingState.isRegistering = false;
    state.authProcessingState.errors = errors || [];
  },

  [ MutationTypes.SIGNING_IN_USER ]( state ) {
    state.authProcessingState.isLoggingIn = true;
  },

  [ MutationTypes.SIGNIN_COMPLETE ]( state, payload ) {
    const { username, email, account_details } = payload;

    state.isLoggedIn = true;
    state.username = username;
    state.email = email;
    state.permissions = account_details.access_levels;
  },

  [ MutationTypes.SIGNIN_FAILED ]( state, payload ) {
    state.authProcessingState.errors = payload.errors;
  },

  [ MutationTypes.UPDATED_USER ]( state, { user } ) {
    state.username = user.name;
    state.email = user.email;
  }

};

export default Mutations;
