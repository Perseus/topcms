import RouteResolverMap from '../config/RouteResolverMap';

export function callRequiredRouteResolver( to, from, next ) {
  if ( !RouteResolverMap[ to.name ] ) {
    next();
    return;
  }

  RouteResolverMap[ to.name ]( to, next );
}
