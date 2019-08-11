import MutationTypes from '../../types/MutationTypes';

const Mutations = {
  [ MutationTypes.APPLICATION_LOADING ]( state ) {
    state.isAppLoading = true;
  },
  [ MutationTypes.APPLICATION_LOADED ]( state ) {
    state.isAppLoading = false;
    state.isAppLoaded = true;
  }
};

export default Mutations;
