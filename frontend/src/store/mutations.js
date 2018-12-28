import * as types from './mutation-types';
import Store from '.';


const Mutations = {

  [types.DISPLAY_AUTH_MODAL] (state, payload) {
    state.DISPLAY_AUTH_MODAL = !state.DISPLAY_AUTH_MODAL;
    state.AUTH_MODAL_TYPE = (payload.type ? payload.type : state.type);
  }

};


export default Mutations;
