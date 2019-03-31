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
  }

};

export default Actions;
