import store from '../../store/index';

export function requestRouteChange( name ) {
  const payload = {
    route: {
      name,
    }
  };
  
  store.dispatch( 'requestRouteChange', payload );
};

