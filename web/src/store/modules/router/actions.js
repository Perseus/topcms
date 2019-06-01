import * as ActionTypes from '../../action-types';
import * as MutationTypes from '../../mutation-types';

const Actions = {
  [ ActionTypes.changeRoute ]( { commit }, payload ) {
    commit( MutationTypes.CHANGING_ROUTE, payload );
  }
};

export default Actions;
