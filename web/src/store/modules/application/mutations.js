import * as types from '../../mutation-types';

const Mutations = {

  [ types.CHANGING_ROUTE ]( state, payload ) {
    state.route = payload.route;
  },

  [ types.APPLICATION_LOADING ]( state, payload ) {
    state.isApplicationLoading = true;
  },

  [ types.APPLICATION_LOADED ]( state, payload ) {
    state.isApplicationLoading = false;
  },

  [ types.HIDE_TOAST ]( state ) {
    state.isToastVisible = false;
    state.toastOptions = {};
  },

  [ types.TRIGGER_TOAST ]( state, payload ) {
    state.isToastVisible = !state.isToastVisible;
    state.toastOptions = payload;
  },
};

export default Mutations;
