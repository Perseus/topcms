import _ from 'lodash';

import ActionTypes from '../../types/ActionTypes';
import MutationTypes from '../../types/MutationTypes';

const Actions = {

  [ ActionTypes.setInitialRoute ]( { commit }, payload ) {
    const { name, metaData } = payload;
    const routeMetaData = _.pick( metaData, [ 'params', 'hash', 'query' ] );

    commit( MutationTypes.SET_INITIAL_ROUTE, {
      name,
      metaData: routeMetaData
    } );
  },

  [ ActionTypes.changeRoute ]( { commit }, payload ) {
    const { name, metaData } = payload;
    const routeMetaData = _.pick( metaData, [ 'params', 'hash', 'query' ] );

    commit( MutationTypes.CHANGE_ROUTE, {
      name,
      metaData: routeMetaData
    } );
  }
};

export default Actions;
