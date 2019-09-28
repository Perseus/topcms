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
  },

  [ MutationTypes.CACHING_ITEM_INFO ] ( state, payload ) {
    if ( payload && payload.totalItems && payload.currentItem ) {
      state.totalItemsToCache = payload.totalItems;
      state.totalItemsCached = payload.currentItem;
    } else {
      state.isCachingItemInfo = true;
    }
  },

  [ MutationTypes.CACHED_ITEM_INFO ] ( state ) {
    state.isCachingItemInfo = false;
  },

  [ MutationTypes.SET_FETCHED_CHARACTER_DATA ] ( state, payload ) {
    const { characterDetails } = payload;

    if ( characterDetails.inventories ) {
      characterDetails.inventories.forEach( ( inventory ) => {
        if ( inventory.content && inventory.content !== '[]' ) {
          inventory.content = JSON.parse( inventory.content );
          inventory.content.forEach( ( content ) => {
            content.itemInfo = JSON.parse( content.itemInfo );
          } );
        }
      } );
    }

    characterDetails.look = JSON.parse( characterDetails.look || '{}' );
    _.forEach( characterDetails.look, ( look ) => {
      look.itemInfo = JSON.parse( look.itemInfo );
    } );
    state.retrievedCharacterData = characterDetails;
  }
};

export default Mutations;
