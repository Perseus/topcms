import store from '../../store/index';

export function authGuard( to, from, next ) {
  if ( !store.getters.userAuthStatus ) {
    next( false );
  } else {
    next();
  }
}

export function siteGuard( to, from, next ) {
  if ( !store.getters.permissions.includes( 'site' ) ) {
    next(false);
  } else {
    next();
  }
}

export function noAuthAllowedGuard( to, from, next ) {
  if ( store.getters.userAuthStatus ) {
    next( false );
  } else {
    next();
  }
}

export function adminGuard( to, from, next ) {
  if ( !store.getters.permissions.includes( 'admin' ) ) {
    next(false);
  } else {
    next();
  }
}