import ActionTypes from '../../types/ActionTypes';
import MutationTypes from '../../types/MutationTypes';

import { graphQLRequest } from '../../../services/GraphQLRequest';
import { getFilteredAccounts, getAccountData } from '../../../apollo/queries/admin/game';
import { toggleUserBan } from '../../../apollo/mutations/admin/game';
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
  }
};


export default Actions;
