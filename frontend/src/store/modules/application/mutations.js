import * as types from '../../mutation-types';

const Mutations = {

  [ types.CHANGING_ROUTE ] ( state, payload ) {
    state.route = payload.route;
  },

  [ types.APPLICATION_LOADING ] ( state, payload ) {
    state.isApplicationLoading = true;
  },

  [ types.APPLICATION_LOADED ] ( state, payload ) {
    state.isApplicationLoading = false;
  },
  
};

export default Mutations;