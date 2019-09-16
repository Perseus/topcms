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
  };
}

const AdminModule = {
  state: getInitialState(),
  actions,
  mutations,
};

export default AdminModule;
