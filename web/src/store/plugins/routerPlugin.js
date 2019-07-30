import _ from 'lodash';

import MutationTypes from '../types/MutationTypes';

const routerPlugin = ( router, store ) => {
  store.subscribe( ( mutation, state ) => {
    if ( mutation.type === `${MutationTypes.CHANGE_ROUTE}` ) {
      const newRoute = _.cloneDeep( state.router );
      _changeRoute( router, newRoute );
    }
  } );
};

function _changeRoute( router, newRoute ) {
  const { currentRoute: newRouteName, metaData } = newRoute;

  router.push( {
    name: newRouteName,
    ...metaData
  } );
}

export default routerPlugin;
