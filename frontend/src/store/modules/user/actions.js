import * as types from '../../mutation-types';
import { requestRouteChange } from '../../../utils/router/router';
import { tokenName } from '../../../utils/config';
import { apolloProvider } from '../../../apollo/index';
import { getCurrentUserQuery, logoutUserQuery } from '../../../apollo/queries/auth';
import { loginUserMutation, registerUserMutation } from '../../../apollo/mutations/auth';
import { graphQLErrorExtractor } from '../../../utils/errorHandler';

const Actions = {

  async onUserLogin( context, payload ) {
    context.commit( types.LOGIN_IN_PROGRESS, payload );
    try {
      const loginStatus = await apolloProvider.defaultClient.mutate( {
        mutation: loginUserMutation,
        variables: {
          name: payload.username,
          password: payload.password
        }
      } );
      const { email, name, account_details } = loginStatus.data.loginUser;
      context.commit( types.LOGIN_COMPLETED, { email, name, account_details } );
      requestRouteChange( payload.onSuccessRedirect );
      return { success: true };
    } catch ( err ) {
      context.commit( types.LOGIN_COMPLETED );
      const errors = graphQLErrorExtractor( err );
      if ( errors.includes( 'INCORRECT_CREDENTIALS' ) ) {
        return { error: 'Incorrect username or password' };
      }
    }
  },

  async getUserAuth( context, payload ) {
    context.commit( types.APPLICATION_LOADING );

    if ( !this.getters.userAuthStatus ) {
      try {
        const userData = await apolloProvider.defaultClient.query( {
          query: getCurrentUserQuery
        } );
        context.commit( types.USER_LOGGED_IN, userData.data.me );
        requestRouteChange( payload.name );
      } catch ( err ) {
        const errors = graphQLErrorExtractor( err );
        if ( errors.includes( 'UNAUTHENTICATED' ) ) {
          context.commit( types.USER_UNAUTHORIZED );
        }
      }
    }
    context.commit( types.APPLICATION_LOADED );
  },

  async logoutUser( context, payload ) {

    if ( this.state.user.isLoggedIn ) {
      try {
        const logoutStatus = await apolloProvider.defaultClient.query( {
          query: logoutUserQuery
        } );
        if ( logoutStatus.data.logout === 'LOGOUT_SUCCESS' ) {
          context.commit( types.USER_LOGGED_OUT );
          location.reload();
        }
        return logoutStatus;
      } catch ( err ) {
        const errors = graphQLErrorExtractor( err );
        if ( errors.includes( 'UNAUTHENTICATED' ) ) {
          context.commit( types.USER_UNAUTHORIZED );
        }
      }
    }

  },

  async registerUser( context, payload ) {

    context.commit( types.SIGNUP_IN_PROGRESS, payload );

    try {
      const registrationStatus = await apolloProvider.defaultClient.mutate( {
        mutation: registerUserMutation,
        variables: {
          name: payload.username,
          email: payload.email,
          password: payload.password
        }
      } );

      context.commit( types.SIGNUP_COMPLETED, { type: 'success' } );
      requestRouteChange( payload.onSuccessRedirect );

      return { success: true };

    } catch ( err ) {
      const errors = graphQLErrorExtractor( err );
      const parsedErrors = {};

      if ( errors.includes( 'EMAIL_EXISTS' ) ) {
        parsedErrors.email = 'Email is already registered';
      }
      if ( errors.includes( 'NAME_EXISTS' ) ) {
        parsedErrors.username = 'Username is already registered';
      }
      context.commit( types.SIGNUP_COMPLETED, { type: 'error', error: parsedErrors } );

      return {
        errors: parsedErrors
      };
    }

  }

};


export default Actions;
