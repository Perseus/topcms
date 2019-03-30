import * as types from '../../mutation-types';

const Mutations = {

  [ types.CHANGING_ROUTE ] ( state, payload ) {
    state.route = payload.route;
  },
  
};

export default Mutations;