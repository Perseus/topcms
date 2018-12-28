import * as types from './mutation-types';


const Actions = {

  changeAuthModalState ( context, payload ) {
    
    context.commit(types.DISPLAY_AUTH_MODAL, payload);
  }

};


export default Actions;