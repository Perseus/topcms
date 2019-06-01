import * as MutationTypes from '../mutation-types';
import Router from '../../router';

export const RouterSyncPlugin = ( store ) => {
  store.subscribe( ( mutation, state ) => {
    if ( mutation.type === MutationTypes.CHANGING_ROUTE ) {
      console.log( mutation );
      goToRoute( mutation );
    }
  } );
}

function goToRoute( routeName ) {
  console.log( 'goToRoute executed' );
}
