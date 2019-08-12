import _ from 'lodash';
import RouteResolvers from './RouteResolvers';
import RouteNames from '../../config/RouteNames';

export async function routeResolveHandler( to, from, next ) {
  if ( RouteResolvers[ to.name ] && _.isFunction( RouteResolvers[ to.name ] ) ) {
    try {
      const resolverResponse = await RouteResolvers[ to.name ]( { to, from } );
      next( resolverResponse );
    } catch ( err ) {
      if ( process.env.NODE_ENV === 'development' ) {
        console.log( err );
      }
      next( false );
    }
  } else {
    next();
  }
}

export async function RootResolver( to, from, next ) {
  const rootResolveFn = RouteResolvers[ RouteNames.ROOT.__ROOT__ ];
  try {
    await rootResolveFn( to );
    next();
  } catch ( err ) {
    next( false );
  }
}
