import ActionTypes from '@store/types/ActionTypes';
import MutationTypes from '@store/types/MutationTypes';
import store from '../store/store';


export const beforeEachResolver = ( to, from, next ) => {
  store.commit( MutationTypes.SET_ROUTE_RESOLVING_STATUS, { status: 'RESOLVING' } );
  next();
};

export const afterEachResolver = ( to, from ) => {
  const { router } = store.state;

  if ( to.name !== router.currentRoute && to.name !== from.name ) {
    store.dispatch( ActionTypes.changeRouteWithoutPlugin, { name: to.name, metaData: to } );
  }
};
