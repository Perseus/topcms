import _ from 'lodash';
import RouteResolvers from './RouteResolvers';
import RouteNames from '../../config/RouteNames';
import store from '../../store/store';
import ActionTypes from '../../store/types/ActionTypes';

export async function routeResolveHandler( to, from, next ) {
  if ( RouteResolvers[ to.name ] && _.isFunction( RouteResolvers[ to.name ] ) ) {
    try {
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
    next( false );
    store.dispatch( ActionTypes.changeRoute, { name: from.name } );
  }
}
