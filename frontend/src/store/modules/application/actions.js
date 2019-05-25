import * as types from '../../mutation-types';
import Router from '../../../router/index';

const Actions = {

  requestRouteChange( context, payload ) {
    context.commit( types.CHANGING_ROUTE, payload );
    Router.push( payload.route );
  },

  startApplicationLoading( context, payload ) {
    context.commit( types.APPLICATION_LOADING );
  },

  finishApplicationLoading( context, payload ) {
    context.commit( types.APPLICATION_LOADED );
  },

  triggerToast( context, payload ) {
    const { state } = context;
    if ( state.isToastVisible ) {
      context.commit( types.HIDE_TOAST );
      setTimeout( () => {
        context.commit( types.TRIGGER_TOAST, payload );
      }, 300 );
    } else {
      context.commit( types.TRIGGER_TOAST, payload );
    }
  },

  showToast( context, payload ) {
    context.commit( types.SHOW_TOAST, payload );
  },

  hideToast( context, payload ) {
    context.commit( types.HIDE_TOAST );
  }

};

export default Actions;
