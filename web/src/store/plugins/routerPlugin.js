import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';

import MutationTypes from '../types/MutationTypes';

const routerPlugin = ( router, store ) => {
  store.subscribe( ( mutation, state ) => {
    if ( mutation.type === `${MutationTypes.CHANGE_ROUTE}` ) {
      const newRoute = cloneDeep( state.router );
      _changeRoute( router, newRoute );
    }
  } );
};

function _changeRoute( router, newRoute ) {
  const { currentRoute: newRouteName, metaData, prevRoute } = newRoute;
  const { metaData: prevMeta } = prevRoute;
  const prevRouteName = router.history.current.name;

  if ( newRouteName !== prevRouteName || ( newRouteName === prevRouteName && !isEqual( prevMeta, metaData ) ) ) {
    router.push( {
      name: newRouteName,
      ...metaData
    } );
  }
}

export default routerPlugin;
