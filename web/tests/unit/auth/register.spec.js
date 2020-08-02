import { mount, createLocalVue } from '@vue/test-utils';
import { ValidationObserver } from 'vee-validate';
//import Buefy from 'buefy';

import Vuex from 'vuex';
import faker from 'faker';

import '@services/Validations';

import Register from '@containers/Register/Register.vue';

const flushPromises = () => new Promise( setTimeout );

const localVue = createLocalVue();
localVue.use( Vuex );
localVue.use( Buefy );

localVue.component( 'ValidationObserver', ValidationObserver );

const registerUser = jest.fn();

function mountComponentWithLocalVue( component, options ) {
  const store = new Vuex.Store( {
    getters: {
      isUserRegistering: () => false,
    },
    actions: {
      registerUser
    }
  } );

  return mount( component, {
    localVue,
    store,
    ...options,
  } );
}

describe( 'Register Component', () => {
  it( 'renders correctly', () => {
    const wrapper = mountComponentWithLocalVue( Register );

    expect( wrapper ).toMatchSnapshot();
  } );

  it( 'has validation errors if all fields are empty', async() => {
    const wrapper = mountComponentWithLocalVue( Register );

    const submitButton = wrapper.find( '[data-test="register-button"]' );
    await submitButton.trigger( 'submit' );

    await flushPromises();

    const errorElements = wrapper.findAll( '.help' );
    errorElements.wrappers.forEach( wrap => expect( wrap.text() ).not.toHaveLength( 0 ) );
  } );

  it( 'has validation errors if password doesn\'t match confirm password', async() => {
    const wrapper = mountComponentWithLocalVue( Register, {
      data: () => ( {
        username: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      } )
    } );

    await wrapper.vm.$nextTick();

    const confirmPasswordField = wrapper.find( '[data-test="Confirm Password"]' );
    await confirmPasswordField.setValue( 'foobar' );

    const submitButton = wrapper.find( '[data-test="register-button"]' );
    await submitButton.trigger( 'submit' );

    await flushPromises();

    const confirmPasswordErrorEl = wrapper.find( '.help.is-danger' );
    expect( confirmPasswordErrorEl.text() ).toContain( 'match the value' );
  } );

  it( 'triggers registerUser action on successful form submit', async() => {
    const data = {
      username: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const wrapper = mountComponentWithLocalVue( Register, {
      data: () => data,
    } );

    await wrapper.vm.$nextTick();

    const confirmPasswordField = wrapper.find( '[data-test="Confirm Password"]' );
    await confirmPasswordField.setValue( data.password );

    const submitButton = wrapper.find( '[data-test="register-button"]' );
    await submitButton.trigger( 'submit' );

    await flushPromises();

    expect( registerUser ).toHaveBeenCalled();
  } );
} );
