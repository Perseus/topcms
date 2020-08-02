import pick from 'lodash/pick';

import ActionTypes from '../../types/ActionTypes';
import MutationTypes from '../../types/MutationTypes';

const Actions = {

  [ ActionTypes.setInitialRoute ]( { commit }, payload ) {
    const { name, metaData } = payload;
    const routeMetaData = pick( metaData, [ 'params', 'hash', 'query' ] );

    commit( MutationTypes.CHANGE_ROUTE_WITHOUT_PLUGIN, {
      name,
      metaData: routeMetaData
    } );
  },

  [ ActionTypes.changeRoute ]( { commit }, payload ) {
    const { name, metaData } = payload;
    const routeMetaData = pick( metaData, [ 'params', 'hash', 'query' ] );

    commit( MutationTypes.CHANGE_ROUTE, {
      name,
      metaData: routeMetaData
    } );
  },

  [ ActionTypes.changeRouteWithoutPlugin ]( { commit }, payload ) {
    const { name, metaData } = payload;
    const routeMetaData = pick( metaData, [ 'params', 'hash', 'query' ] );

    commit( MutationTypes.CHANGE_ROUTE_WITHOUT_PLUGIN, {
      name,
      metaData: routeMetaData
    } );
  }
};

export default Actions;
