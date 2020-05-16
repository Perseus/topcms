import { SnackbarProgrammatic as Snackbar } from 'buefy';
import axios from 'axios';

import ActionTypes from '../../types/ActionTypes';
import MutationTypes from '../../types/MutationTypes';

import { characterInventoryCooker } from '../../cookers/adminCooker';

import request from '../../../services/GraphQLRequest';
import {
  getFilteredAccounts, getAccountData, getCharacterData, getFilteredCharacters
} from '../../../apollo/queries/admin/game';
import { toggleUserBan, updateUserFromAdmin, resetUserSecurityCode } from '../../../apollo/mutations/admin/game';
import Logger from '../../../services/Logger';
import socketHandler from '../../../socket';
import { handleCharacterSearchErrors } from '../../helpers/admin';
import RouteNames from '../../../config/RouteNames';

const Actions = {
  async [ ActionTypes.retrieveFilteredAccounts ]( { commit }, payload ) {
    try {
      const { offset, filter, searchKey } = payload;
      const { usersWithFilter: response } = await request.query( getFilteredAccounts, {
        offset,
        filter,
        searchKey
      } );

      commit( MutationTypes.UPDATE_FILTERED_ACCOUNTS, { data: response.data, filter, searchKey } );
    } catch ( err ) {
      Logger.log( `Error at action retrieveFilteredAccounts: ${err}` );
    }
  },

  async [ ActionTypes.toggleBanForUser ]( { commit, dispatch }, payload ) {
    try {
      const { id, currentBan } = payload;
      let newBan = null;
      if ( !currentBan || currentBan === 0 ) {
        newBan = 1;
      } else {
        newBan = 0;
      }

      const { toggleUserBan: response } = await request.mutation( toggleUserBan, {
        id: parseInt( id ),
        newBanStatus: newBan
      } );
      commit( MutationTypes.UPDATE_USER_BAN, { id: response.data.id, banStatus: response.data.ban } );
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

  async [ ActionTypes.retrieveAccountData ]( { commit }, payload ) {
    try {
      const { id } = payload;
      const { filteredUser: response } = await request.query( getAccountData, {
        id: parseInt( id ),
      } );

      commit( MutationTypes.SET_FETCHED_ACCOUNT_DATA, { user: response.data } );
    } catch ( err ) {
      Logger.log( `Error at action retrieveAccountData: ${err} ` );
    }
  },

  async [ ActionTypes.adminUpdateUserEmail ]( { commit }, payload ) {
    try {
      const { email, id } = payload;
      const { updateUserFromAdmin: response } = await request.mutation( updateUserFromAdmin, {
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
      commit( MutationTypes.SET_UPDATED_USER_DATA, { ...response.data } );
    } catch ( err ) {
      Logger.log( `Error at action adminUpdateUserEmail: ${err}` );
    }
  },

  async [ ActionTypes.adminUpdateUser ]( { commit, dispatch }, payload ) {
    try {
      const { updateUserFromAdmin: response } = await request.mutation( updateUserFromAdmin, {
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
      commit( MutationTypes.SET_UPDATED_USER_DATA, { ...response.data } );
    } catch ( err ) {
      Logger.log( `Error at action adminUpdateUser: ${err}` );
    }
  },

  async [ ActionTypes.retrieveFilteredCharacters ]( { commit, dispatch }, payload ) {
    try {
      const { offset, filter, searchKey } = payload;

      const { charactersWithFilter: response } = await request.query( getFilteredCharacters, {
        offset,
        filter,
        searchKey
      } );

      commit( MutationTypes.UPDATE_FILTERED_CHARACTERS, { data: response.data, filter, searchKey } );
    } catch ( err ) {
      Logger.log( `Error at action retrieveFilteredCharacters: ${err}` );
    }
  },

  async [ ActionTypes.retrieveCharacter ]( { commit, dispatch }, payload ) {
    try {
      const { id } = payload;

      const { filteredCharacter: response } = await request.query( getCharacterData, {
        id: parseInt( id ),
      } );

      commit( MutationTypes.SET_FETCHED_CHARACTER_DATA, { characterDetails: response.data } );
    } catch ( err ) {
      handleCharacterSearchErrors( err );
      dispatch( ActionTypes.changeRoute, { name: RouteNames.ADMIN.GAME.INDEX } );
    }
  },

  async [ ActionTypes.generateItemInfoCache ]( { commit, dispatch }, payload ) {
    try {
      commit( MutationTypes.CACHING_ITEM_INFO );
      socketHandler.emit( 'generateItemInfoCache' );
      socketHandler.listen( 'failed', ( error, cb ) => {
        if ( error.error.code === 'cache.CHECKSUM_LATEST' ) {
          Snackbar.open( {
            message: 'The ItemInfo cache is already up to date',
            type: 'is-danger',
            duration: 3000
          } );
        }

        if ( error.error.code === 'cache.UNKNOWN_ITEMINFO' ) {
          Snackbar.open( {
            message: 'The uploaded ItemInfo has an invalid format. Please check the uploaded file.',
            type: 'is-danger',
            duration: 3000
          } );
        }

        commit( MutationTypes.CACHED_ITEM_INFO );
      } );

      socketHandler.listen( 'itemCached', ( data ) => {
        const { totalItems, currentItem } = data;
        commit( MutationTypes.CACHING_ITEM_INFO, { totalItems, currentItem } );
      } );

      socketHandler.listen( 'itemCacheFinished', ( ) => {
        commit( MutationTypes.CACHED_ITEM_INFO );
        Snackbar.open( {
          message: 'ItemInfo cached successfully!',
          type: 'is-success',
          duration: 3000
        } );
      } );
    } catch ( err ) {
      Logger.log( err, 'error' );
      commit( MutationTypes.CACHED_ITEM_INFO );
    }
  },

  async [ ActionTypes.uploadItemInfo ]( { commit, dispatch }, payload ) {
    try {
      dispatch( ActionTypes.updateRequestsInProgress, { type: 'START', name: 'uploadItemInfo' } );

      const response = await axios.post( `${process.env.VUE_APP_HTTP_URL}/uploadItemInfo`, payload.file, {
      } );

      if ( response.data.status === 'success' ) {
        Snackbar.open( {
          message: 'File uploaded successfully',
          type: 'is-success',
          duration: 3000
        } );
      } else {
        Snackbar.open( {
          message: 'There was an error while trying to upload the file',
          type: 'is-danger',
          duration: 3000
        } );
      }
    } catch ( err ) {
      Logger.log( err, 'error' );
    } finally {
      dispatch( ActionTypes.updateRequestsInProgress, { type: 'COMPLETE', name: 'uploadItemInfo' } );
    }
  },

  async [ ActionTypes.resetUserSecurityCode ]( { dispatch }, payload ) {
    try {
      const { id } = payload;
      await request.mutation( resetUserSecurityCode, {
        id: parseInt( id )
      } );

      Snackbar.open( {
        message: 'Security code reset successfully',
        type: 'is-success',
        duration: 3000
      } );
    } catch ( err ) {
      Logger.log( `Error at action resetUserSecurityCode: ${err} ` );
      Snackbar.open( {
        message: 'An error occured while trying to reset the security code',
        duration: 3000,
        type: 'is-danger'
      } );
    }
  }
};


export default Actions;
