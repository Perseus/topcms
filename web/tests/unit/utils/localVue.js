import { mount, createLocalVue } from '@vue/test-utils';
import { ValidationObserver } from 'vee-validate';
//import Buefy from 'buefy';

import Vuex from 'vuex';

import '@services/Validations';


const localVue = createLocalVue();
localVue.use( Vuex );
localVue.use( Buefy );

localVue.component( 'ValidationObserver', ValidationObserver );

export function mountComponentWithLocalVue( component, options, storeOptions ) {
  const store = new Vuex.Store( {
    ...storeOptions
  } );

  return mount( component, {
    localVue,
    store,
    ...options,
  } );
}

export const flushPromises = () => new Promise( setTimeout );
