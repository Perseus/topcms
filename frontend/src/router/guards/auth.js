import store from '../../store/index';

export function authGuard(to, from, next) {
  if (!store.state.userState.isLoggedIn) {
    next(false);
  } else {
    next();
  }
}

export function noAuthAllowedGuard(to, from, next) {
  if (store.state.userState.isLoggedIn) {
    next(false);
  } else {
    next();
  }
}
