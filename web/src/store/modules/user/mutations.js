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
    const {
      username, email, account_details, mallPoints, awardCenterPoints, character_details
    } = payload;

    state.isLoggedIn = true;
    state.userData.username = username;
    state.userData.email = email;
    state.userData.permissions = account_details.access_levels;
    state.userData.mallPoints = mallPoints;
    state.userData.awardCenterPoints = awardCenterPoints;
    state.userData.characterDetails = character_details;
  },

  [ MutationTypes.SIGNIN_FAILED ]( state, payload ) {
    state.authProcessingState.errors = payload.errors;
  },

  [ MutationTypes.UPDATED_USER ]( state, { user } ) {
    Object.assign( state.userData, user );
  },

  [ MutationTypes.UPDATE_STORAGE_BOX ]( state, payload ) {
    const { items, parsedItems } = payload;
    console.log( payload );
    state.storageBox.items = items;
    state.storageBox.itemsData = parsedItems;
  }
};

export default Mutations;
