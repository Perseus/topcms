import _ from 'lodash';
import MutationTypes from '@store/types/MutationTypes';
import RouteResolvers from './RouteResolvers';
import RouteNames from '../../config/RouteNames';
import store from '../../store/store';
import ActionTypes from '../../store/types/ActionTypes';

export async function routeResolveHandler( to, from, next ) {
  if ( RouteResolvers[ to.name ] && _.isFunction( RouteResolvers[ to.name ] ) ) {
    try {
      store.commit( MutationTypes.SET_ROUTE_RESOLVING_STATUS, { status: 'RESOLVING' } );

      const resolverResponse = await RouteResolvers[ to.name ]( { to, from } );
      if ( resolverResponse !== true ) {
        store.dispatch( ActionTypes.changeRoute, { name: resolverResponse.name } );
        return;
      }
      next( resolverResponse );
    } catch ( err ) {
      if ( process.env.NODE_ENV === 'development' ) {
        console.log( err );
      }
      next( false );
      store.dispatch( ActionTypes.changeRoute, { name: from.name } );
    } finally {
      store.commit( MutationTypes.SET_ROUTE_RESOLVING_STATUS, { status: 'RESOLVED' } );
    }
  } else {
    next( true );
  }
}

export async function RootResolver( to, from, next ) {
  const rootResolveFn = RouteResolvers[ RouteNames.ROOT.__ROOT__ ];

  try {
    await rootResolveFn( to );
    next();
  } catch ( err ) {
    next( true );
    // store.dispatch( ActionTypes.changeRoute, { name: from.name } );
  }
}
