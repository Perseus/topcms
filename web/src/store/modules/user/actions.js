import MutationTypes from '../../types/MutationTypes';
import ActionTypes from '../../types/ActionTypes';
import { apolloClient } from '../../../apollo';
import {
  registerUserMutation, loginUserMutation, logoutUserMutation, updateUserMutation, transferItemMutation
} from '../../../apollo/mutations/auth';
import request from '../../../services/GraphQLRequest';
import { getCurrentUserQuery, getStorageBoxQuery } from '../../../apollo/queries/auth';
import Logger from '../../../services/Logger';
import RouteNames from '../../../config/RouteNames';

import { handleRegistrationErrors, handleLoginErrors, handleUpdateUserErrors } from '../../helpers/user';

const Actions = {
  async [ ActionTypes.registerUser ]( { commit, dispatch }, payload ) {
    commit( MutationTypes.REGISTERING_USER );
    try {
      const { username, password, email } = payload;
      const response = await request.mutation( registerUserMutation, {
        input: {
          username,
          password,
          email
        }
      } );

      const { createUser: createUserResponse } = response;
      const { data } = createUserResponse;

      commit( MutationTypes.SIGNIN_COMPLETE, {
        username: data.name,
        email: data.email,
        account_details: data.account_details
      } );

      dispatch( ActionTypes.changeRoute, {
        name: RouteNames.ROOT.__LANDING__
      } );
    } catch ( err ) {
      console.log( err );
      handleRegistrationErrors( err, { dispatch } );
    }
  },

  async [ ActionTypes.loginUser ]( { commit, dispatch }, payload ) {
    try {
      const { username, password } = payload;
      const response = await request.mutation( loginUserMutation, {
        input: {
          username,
          password
        }
      } );
      const { loginUser: loginResponse } = response;

      if ( !loginResponse.data ) {
        handleLoginErrors( loginResponse, { dispatch } );
        return;
      }

      const { name, email, account_details } = loginResponse.data;

      commit( MutationTypes.SIGNIN_COMPLETE, {
        username: name,
        email,
        account_details
      } );
      dispatch( ActionTypes.changeRoute, {
        name: RouteNames.ROOT.__LANDING__
      } );
    } catch ( err ) {
      handleLoginErrors( err, { dispatch } );
    }
  },

  async [ ActionTypes.retrieveUser ]( { commit, dispatch } ) {
    try {
      const response = await request.query( getCurrentUserQuery );

      const { me: currentUserResponse } = response;

      const {
        name, email, account_details, awardCenterPoints, mallPoints, character_details
      } = currentUserResponse.data;
      commit( MutationTypes.SIGNIN_COMPLETE, {
        username: name,
        email,
        awardCenterPoints,
        mallPoints,
        account_details,
        character_details
      } );
    } catch ( err ) {
      commit( MutationTypes.SIGNIN_FAILED, {
        errors: [ err ]
      } );
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
      const response = await request.mutation( updateUserMutation, {
        userInfo: {
          new_password,
          old_password,
          email
        }
      } );
      commit( MutationTypes.UPDATED_USER, { user: response.data.updateUser } );

      dispatch( ActionTypes.triggerToast, {
        content: 'User updated successfully',
        type: 'success',
        position: 'is-bottom',
        duration: 4000
      } );

      dispatch( ActionTypes.changeRoute, { name: RouteNames.ROOT.__LANDING__ } );
    } catch ( err ) {
      handleUpdateUserErrors( err );
    }
  },

  async [ ActionTypes.getStorageBox ]( { commit } ) {
    try {
      const { storageBox: response } = await request.query( getStorageBoxQuery );
      commit( MutationTypes.UPDATE_STORAGE_BOX, response.data );
    } catch ( err ) {
      Logger.log( `Error at action getStorageBox: ${err}`, 'error' );
    }
  },

  async [ ActionTypes.transferItemFromStorageBox ]( { commit, dispatch }, payload ) {
    try {
      const { itemId, characterId, quantity } = payload;
      const { transferItemToGame: response } = await request.mutation( transferItemMutation, {
        storageId: parseInt( itemId ),
        quantity: parseInt( quantity ),
        characterId: parseInt( characterId ),
      } );

      commit( MutationTypes.UPDATE_STORAGE_BOX, response.data );
      dispatch( ActionTypes.triggerToast, {
        content: 'Item transferred successfully! Please check your temporary bag in game.',
        duration: 5000,
        type: 'success',
      } );
    } catch ( err ) {
      Logger.log( `Error at action transferItemFromStorageBox ${err}`, 'error' );
    }
  }
};

export default Actions;
