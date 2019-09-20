import { SnackbarProgrammatic as Snackbar } from 'buefy';
import graphql from 'graphql-anywhere';
import ActionTypes from '../../types/ActionTypes';
import MutationTypes from '../../types/MutationTypes';

import { graphQLRequest } from '../../../services/GraphQLRequest';
import { getFilteredAccounts, getAccountData } from '../../../apollo/queries/admin/game';
import { toggleUserBan, updateUserFromAdmin } from '../../../apollo/mutations/admin/game';
import Logger from '../../../services/Logger';

const Actions = {
  async [ ActionTypes.retrieveFilteredAccounts ] ( { commit, dispatch }, payload ) {
    try {
      const { offset, filter, searchKey } = payload;
      const response = await graphQLRequest( dispatch, 'query', getFilteredAccounts, 'getFilteredAccounts', {
        offset,
        filter,
        searchKey
      } );

      commit( MutationTypes.UPDATE_FILTERED_ACCOUNTS, { data: response.data.usersWithFilter, filter, searchKey } );
    } catch ( err ) {
      Logger.log( `Error at action retrieveFilteredAccounts: ${err}` );
    }
  },

  async [ ActionTypes.toggleBanForUser ] ( { commit, dispatch }, payload ) {
    try {
      const { id, currentBan } = payload;
      let newBan = null;
      if ( !currentBan || currentBan === 0 ) {
        newBan = 1;
      } else {
        newBan = 0;
      }

      const response = await graphQLRequest( dispatch, 'mutation', toggleUserBan, 'toggleUserBan', {
        id: Number( id ),
        newBanStatus: newBan
      } );
      commit( MutationTypes.UPDATE_USER_BAN, { id: response.data.toggleUserBan.id, banStatus: response.data.toggleUserBan.ban } );
      Snackbar.open( {
        position: 'is-top-right',
        message: 'Ban status updated!',
        duration: 1500,
        type: 'is-success'
      } );
    } catch ( err ) {
      Logger.log( `Error at action toggleBanForUser: ${err}` );
    }
  },

  async [ ActionTypes.retrieveAccountData ] ( { commit, dispatch }, payload ) {
    try {
      const { id } = payload;
      const response = await graphQLRequest( dispatch, 'query', getAccountData, 'getAccountData', {
        id: Number( id )
      } );

      commit( MutationTypes.SET_FETCHED_ACCOUNT_DATA, { user: response.data.filteredUser } );
    } catch ( err ) {
      Logger.log( `Error at action retrieveAccountData: ${err} ` );
    }
  },

  async [ ActionTypes.adminUpdateUserEmail ] ( { commit, dispatch }, payload ) {
    try {
      const { email, id } = payload;
      const response = await graphQLRequest( dispatch, 'mutation', updateUserFromAdmin, 'updateUserFromAdmin', {
        id,
        email
      } );

      if ( !response ) {
        Snackbar.open( {
          message: 'There was an error while trying to update the email',
          duration: 2000,
          position: 'is-top-right',
          type: 'is-error',
        } );
        return;
      }

      Snackbar.open( {
        message: 'Email updated successfully',
        duration: 2000,
        position: 'is-top-right',
        type: 'is-success',
      } );
      commit( MutationTypes.SET_UPDATED_USER_DATA, { ...response.data.updateUserFromAdmin } );
    } catch ( err ) {
      Logger.log( `Error at action adminUpdateUserEmail: ${err}` );
    }
  },

  async [ ActionTypes.adminUpdateUser ] ( { commit, dispatch }, payload ) {
    try {
      const response = await graphQLRequest( dispatch, 'mutation', updateUserFromAdmin, 'updateUserFromAdmin', {
        ...payload
      } );

      if ( !response ) {
        Snackbar.open( {
          message: 'There was an error while trying to update user information',
          duration: 2000,
          position: 'is-top-right',
          type: 'is-error'
        } );
        return;
      }

      Snackbar.open( {
        message: 'User information updated successfully!',
        position: 'is-top-right',
        duration: 2000,
        type: 'is-success',
      } );
      commit( MutationTypes.SET_UPDATED_USER_DATA, { ...response.data.updateUserFromAdmin } );
    } catch ( err ) {
      Logger.log( `Error at action adminUpdateUser: ${err}` );
    }
  },

  async [ ActionTypes.retrieveCharacter ] ( { commit, dispatch }, payload ) {
    try {
      const { id } = payload;

      const response = await graphQLRequest;
    } catch ( err ) {

    }
  }
};


export default Actions;
