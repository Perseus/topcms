import { SnackbarProgrammatic as Snackbar } from 'buefy';

import MutationTypes from '../../types/MutationTypes';
import ActionTypes from '../../types/ActionTypes';
import { apolloClient } from '../../../apollo';
import {
  registerUserMutation, loginUserMutation, logoutUserMutation, updateUserMutation
} from '../../../apollo/mutations/auth';
import request from '../../../services/GraphQLRequest';
import { getCurrentUserQuery } from '../../../apollo/queries/auth';
import { extractGraphQLErrors } from '../../../utils/ErrorExtractor';
import Logger from '../../../services/Logger';
import RouteNames from '../../../config/RouteNames';

const Actions = {
  async [ ActionTypes.registerUser ]( { commit, dispatch }, payload ) {
    commit( MutationTypes.REGISTERING_USER );
    try {
      const { username, password, email } = payload;
      const createdUser = await request.mutation( registerUserMutation, {
        input: {
          username,
          password,
          email
        }
      } );
      dispatch( ActionTypes.changeRoute, {
        name: RouteNames.AUTH.LOGIN
      } );
      commit( MutationTypes.REGISTRATION_COMPLETE );
    } catch ( err ) {
      commit( MutationTypes.REGISTRATION_COMPLETE, { errors: extractGraphQLErrors( err ) } );
    }
  },

  async [ ActionTypes.loginUser ]( { commit, dispatch }, payload ) {
    commit( MutationTypes.SIGNING_IN_USER );
    try {
      const { username, password } = payload;
      const loginResponse = await request.mutation( loginUserMutation, {
        input: {
          username,
          password
        }
      } );
      const { name, email, account_details } = loginResponse.data.loginUser;
      commit( MutationTypes.SIGNIN_COMPLETE, {
        username: name,
        email,
        account_details
      } );
      dispatch( ActionTypes.changeRoute, {
        name: RouteNames.ROOT.__LANDING__
      } );
    } catch ( err ) {
      commit( MutationTypes.SIGNIN_COMPLETE, { errors: extractGraphQLErrors( err ) } );
    }
  },

  async [ ActionTypes.retrieveUser ]( { commit, dispatch } ) {
    try {
      const retrieveUserResponse = await request.query( getCurrentUserQuery );
      const { name, email, account_details } = retrieveUserResponse.data.me;
      commit( MutationTypes.SIGNIN_COMPLETE, {
        username: name,
        email,
        account_details
      } );
    } catch ( err ) {
      const error = extractGraphQLErrors( err );
    }
  },

  async [ ActionTypes.logoutUser ]() {
    try {
      await apolloClient.mutate( {
        mutation: logoutUserMutation,
      } );
      window.location.reload();
    } catch ( err ) {
      Logger.log( `Error at logoutUser: ${err} ` );
    }
  },

  async [ ActionTypes.updateUser ]( { commit, dispatch }, payload ) {
    try {
      const { newPassword: new_password, oldPassword: old_password, email } = payload;
      const response = await graphQLRequest( dispatch, 'mutation', updateUserMutation, 'updateUser', {
        userInfo: {
          new_password,
          old_password,
          email
        }
      } );
      commit( MutationTypes.UPDATED_USER, { user: response.data.updateUser } );
      Snackbar.open( {
        message: 'User updated successfully',
        type: 'is-success',
        position: 'is-bottom',
        duration: 4000
      } );

      dispatch( ActionTypes.changeRoute, { name: RouteNames.ROOT.__LANDING__ } );
    } catch ( err ) {
      const error = extractGraphQLErrors( err );
      if ( error === 'INVALID_OLD_PASSWORD' ) {
        Snackbar.open( {
          message: 'The old password is incorrect. Please enter the correct password',
          type: 'is-danger',
          position: 'is-bottom',
          duration: 4000,
        } );
        return;
      }

      Snackbar.open( {
        message: 'There was an error while trying to update your account details. Please check the details that you have changed.',
        type: 'is-danger',
        position: 'is-bottom',
        duration: 4000
      } );
    }
  }
};

export default Actions;
