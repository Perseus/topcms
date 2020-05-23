import _ from 'lodash';

import MutationTypes from '../../types/MutationTypes';

const Mutations = {
  [ MutationTypes.UPDATE_FILTERED_ACCOUNTS ]( state, payload ) {
    state.filteredAccountData.filteredAccounts = payload.data.users;
    state.filteredAccountData.totalFilteredAccounts = payload.data.total;
    state.filteredAccountData.hasFetchedFilteredAccounts = true;
    state.filteredAccountData.filterUsed = payload.filter;
    state.filteredAccountData.searchKey = payload.searchKey;
  },

  [ MutationTypes.UPDATE_USER_BAN ]( state, payload ) {
    const accountToUpdateFromAccountsList = _.find( state.filteredAccountData.filteredAccounts, { id: payload.id } );
    const doesFetchedAccountNeedToBeUpdated = ( state.retrievedAccountData.id === payload.id );
    if ( doesFetchedAccountNeedToBeUpdated ) {
      state.retrievedAccountData.ban = payload.banStatus;
    }

    if ( accountToUpdateFromAccountsList ) {
      accountToUpdateFromAccountsList.ban = payload.banStatus;
    }
  },

  [ MutationTypes.SET_FETCHED_ACCOUNT_DATA ]( state, payload ) {
    const { user } = payload;
    state.retrievedAccountData = user;
  },

  [ MutationTypes.SET_UPDATED_USER_DATA ]( state, payload ) {
    state.retrievedAccountData = Object.assign( {}, state.retrievedAccountData, payload );
  },

  [ MutationTypes.CACHING_ITEM_INFO ]( state, payload ) {
    if ( payload && payload.totalItems && payload.currentItem ) {
      state.totalItemsToCache = payload.totalItems;
      state.totalItemsCached = payload.currentItem;
    } else {
      state.isCachingItemInfo = true;
    }
  },

  [ MutationTypes.CACHED_ITEM_INFO ]( state ) {
    state.isCachingItemInfo = false;
  },

  [ MutationTypes.SET_FETCHED_CHARACTER_DATA ]( state, payload ) {
    const { characterDetails } = payload;
    state.retrievedCharacterData = characterDetails;
  },

  [ MutationTypes.UPDATE_FILTERED_CHARACTERS ]( state, payload ) {
    state.filteredCharacterData.filteredCharacters = payload.data.characters;
    state.filteredCharacterData.totalFilteredCharacters = payload.data.total;
    state.filteredCharacterData.hasFetchedFilteredCharacters = true;
    state.filteredCharacterData.filterUsed = payload.filter;
    state.filteredCharacterData.searchKey = payload.searchKey;
  },

  [ MutationTypes.UPDATE_MALL_POINTS ]( state, payload ) {
    const { updatedData } = payload;
    state.retrievedAccountData.mallPoints = updatedData.mallPoints;
    state.retrievedAccountData.awardCenterPoints = updatedData.awardCenterPoints;
  }
};

export default Mutations;
