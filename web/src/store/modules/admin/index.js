import actions from './actions';
import mutations from './mutations';

function getInitialState() {
  return {
    filteredAccountData: {
      filteredAccounts: [],
      hasFetchedFilteredAccounts: false,
      totalFilteredAccounts: 0,
      filterUsed: '',
      searchKey: '',
    },
    retrievedAccountData: {},
    retrievedCharacterData: {},
    isCachingItemInfo: false,
    totalItemsToCache: 0,
    totalItemsCached: 0,
  };
}

const AdminModule = {
  state: getInitialState(),
  actions,
  mutations,
};

export default AdminModule;
