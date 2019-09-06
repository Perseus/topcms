import { Snackbar } from 'buefy/dist/components/snackbar';

import MutationTypes from '../../types/MutationTypes';
import ActionTypes from '../../types/ActionTypes';
import { apolloClient } from '../../../apollo';
import { registerUserMutation, loginUserMutation, logoutUserMutation } from '../../../apollo/mutations/auth';
import { getCurrentUserQuery } from '../../../apollo/queries/auth';
import { extractGraphQLErrors } from '../../../utils/ErrorExtractor';
import Logger from '../../../services/Logger';
import RouteNames from '../../../config/RouteNames';

const Actions = {
  async [ ActionTypes.registerUser ] ( { commit, dispatch }, payload ) {
    commit( MutationTypes.REGISTERING_USER );
    try {
      const { username, password, email } = payload;
      await apolloClient.mutate( {
        mutation: registerUserMutation,
        variables: {
          input: {
            username,
            password,
            email
          }
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
      const loginResponse = await apolloClient.mutate( {
        mutation: loginUserMutation,
        variables: {
          input: {
            username,
            password
          }
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

  async [ ActionTypes.retrieveUser ] ( { commit } ) {
    try {
      const retrieveUserResponse = await apolloClient.query( {
        query: getCurrentUserQuery
      } );
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

  async [ ActionTypes.logoutUser ] () {
    try {
      await apolloClient.mutate( {
        mutation: logoutUserMutation,
      } );
      window.location.reload();
    } catch ( err ) {
      Logger.log( `Error at logoutUser: ${err} ` );
    }
  },

  async [ ActionTypes.updateUser ] ( { commit }, payload ) {
    try {

    } catch ( err ) {
      Snackbar.open( {
        message: 'There was an error while trying to update your account details',
        type: 'is-danger',
        position: 'is-bottom',
        duration: 4000
      } );
    }
  }
};

export default Actions;
