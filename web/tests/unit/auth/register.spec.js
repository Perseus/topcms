import { mount } from '@vue/test-utils';
import { Validator } from 'vee-validate';
import Register from '../../../src/containers/Register/Register.vue';

describe( 'Register', () => {
  it( 'Renders all elements', () => {
    const $route = {
      path: 'http://localhost:8080/register',
    };

    const RegisterWrapper = mount( Register, {
      mocks: {
        $route,
        $validator: Validator,
      },
      attachToDocument: true
    } );

    expect( RegisterWrapper.vm.$route.path ).toBe( $route.path );
    expect( RegisterWrapper.contains( '[data-test="username"]' ) ).toBe( true );
  } );
} );
