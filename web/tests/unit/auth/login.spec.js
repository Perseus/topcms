import faker from 'faker';

import Vuex from 'vuex';
import Login from '@containers/Login/Login.vue';
import userModule from '@store/modules/user';
import request from '@services/GraphQLRequest';
import ActionTypes from '@store/types/ActionTypes';
import { mountComponentWithLocalVue, flushPromises } from '../utils/localVue';

jest.mock( '@services/GraphQLRequest' );

request.mutation.mockImplementation( ( _, variables ) => Promise.resolve( {
  loginUser: {
    code: 'OK',
    message: null,
    success: true,
    errors: null,
    data: {
      name: variables.name, account_details: { access_levels: [ 2, 0, 1 ], __typename: 'Account' }, __typename: 'User'
    },
    __typename: 'UserResponse'
  }
} ) );

const loginUser = jest.fn();
const mountLoginComponent = ( mountOptions, storeOptions ) => mountComponentWithLocalVue( Login, mountOptions, {
  getters: {
    isUserLoggingIn: () => false,
  },
  actions: {
    loginUser
  },
  ...storeOptions
} );

describe( 'Login Component', () => {
  it( 'renders correctly', () => {
    const wrapper = mountLoginComponent();

    expect( wrapper ).toMatchSnapshot();
  } );

  it( 'displays validation errors if the form is submitted without any data', async() => {
    const wrapper = mountLoginComponent();

    const loginButton = wrapper.find( '[data-test="login-button"]' );
    await loginButton.trigger( 'submit' );

    await flushPromises();

    const errorEls = wrapper.findAll( '.help' );
    errorEls.wrappers.forEach( wrap => expect( wrap.text() ).not.toHaveLength( 0 ) );
  } );

  it( 'triggers the loginUser function on valid form submission', async() => {
    const wrapper = mountLoginComponent( {
      data: () => ( {
        username: faker.name.findName(),
        password: faker.internet.password(),
      } )
    } );

    const loginButton = wrapper.find( '[data-test="login-button"]' );
    await loginButton.trigger( 'submit' );

    await flushPromises();

    expect( loginUser ).toHaveBeenCalled();
  } );

  it( 'loginUser action triggers graphql request', async() => {
    const store = new Vuex.Store( {
      modules: {
        userModule
      }
    } );

    const data = {
      username: faker.name.findName(),
      password: faker.internet.password()
    };

    await store.dispatch( ActionTypes.loginUser, data );

    expect( request.mutation ).toHaveBeenCalled();
  } );

  it( 'loginUser action commits SIGNIN_COMPLETE and dispatches changeRoute on response', async() => {
    const SIGNIN_COMPLETE = jest.fn();
    const changeRoute = jest.fn();

    const store = new Vuex.Store( {
      modules: {
        userModule: {
          ...userModule,
          mutations: {
            SIGNIN_COMPLETE,
          },
          actions: Object.assign( userModule.actions, {
            changeRoute
          } )
        }
      }
    } );

    const data = {
      username: faker.name.findName(),
      password: faker.internet.password()
    };

    await store.dispatch( ActionTypes.loginUser, data );

    expect( SIGNIN_COMPLETE ).toHaveBeenCalled();
    expect( changeRoute ).toHaveBeenCalled();
  } );
} );
