import * as types from '../../mutation-types';
import Router from '../../../router/index';

const Actions = {

  requestRouteChange( context, payload ) {
    context.commit(types.CHANGING_ROUTE, payload);
    Router.push( payload.route );
  }

};

export default Actions;
