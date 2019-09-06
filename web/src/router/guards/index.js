import store from '../../store/store';
import ActionTypes from '../../store/types/ActionTypes';
import RouteNames from '../../config/RouteNames';

export function adminGuard( to, from, next ) {
  const { isUserLoggedIn, canAccessGameAdmin } = store.getters;
  if ( isUserLoggedIn && canAccessGameAdmin ) {
    next();
  } else {
    store.dispatch( ActionTypes.changeRoute, RouteNames.ROOT.__LANDING__ );
  }
}


export function userGuard( to, from, next ) {
  const { isUserLoggedIn } = store.getters;
  if ( isUserLoggedIn ) {
    next();
  } else {
    store.dispatch( ActionTypes.changeRoute, RouteNames.AUTH.LOGIN );
  }
}
