import _ from 'lodash';

import MutationTypes from '../../types/MutationTypes';

const Mutations = {
  [ MutationTypes.UPDATE_FILTERED_ACCOUNTS ] ( state, payload ) {
    state.filteredAccountData.filteredAccounts = payload.data.users;
    state.filteredAccountData.totalFilteredAccounts = payload.data.total;
    state.filteredAccountData.hasFetchedFilteredAccounts = true;
    state.filteredAccountData.filterUsed = payload.filter;
    state.filteredAccountData.searchKey = payload.searchKey;
  },

  [ MutationTypes.UPDATE_USER_BAN ] ( state, payload ) {
    const accountToUpdateFromAccountsList = _.find( state.filteredAccountData.filteredAccounts, { id: payload.id } );
    const doesFetchedAccountNeedToBeUpdated = ( state.retrievedAccountData.id === payload.id );
    if ( doesFetchedAccountNeedToBeUpdated ) {
      state.retrievedAccountData.ban = payload.banStatus;
    }

    if ( accountToUpdateFromAccountsList ) {
      accountToUpdateFromAccountsList.ban = payload.banStatus;
    }
  },

  [ MutationTypes.SET_FETCHED_ACCOUNT_DATA ] ( state, payload ) {
    const { user } = payload;
    state.retrievedAccountData = user;
  },

  [ MutationTypes.SET_UPDATED_USER_DATA ] ( state, payload ) {
    state.retrievedAccountData = Object.assign( {}, state.retrievedAccountData, payload );
  }
};

export default Mutations;
