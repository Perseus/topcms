import ActionTypes from '@store/types/ActionTypes';
import store from '../store/store';

export const afterEachResolver = ( to, from ) => {
  const { router } = store.state;

  if ( to.name !== router.currentRoute && to.name !== from.name ) {
    store.dispatch( ActionTypes.changeRouteWithoutPlugin, { name: to.name, metaData: to } );
  }
};
