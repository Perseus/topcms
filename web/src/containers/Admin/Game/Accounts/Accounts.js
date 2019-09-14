import { mapState, mapActions } from 'vuex';

import ActionTypes from '../../../../store/types/ActionTypes';
import RouteNames from '../../../../config/RouteNames';

const Accounts = {
  name: 'admin-game-accounts',
  data() {
    return {
      perPage: 10,
      currentPage: 1,
    };
  },
  computed: {
    ...mapStateToComputed(),

    isRetrievingAccounts() {
      return this.currentRequestsInProgress.includes( 'getFilteredAccounts' );
    },
  },

  methods: {
    ...mapActionsToMethods(),

    getBanStatus( banStatus ) {
      if ( !banStatus || banStatus === 0 ) {
        return false;
      }

      return true;
    },

    handleBanForUser( id, currentBan ) {
      this.toggleBanForUser( { id, currentBan } );
    },

    handlePageChange( page ) {
      const filteredAccountsOffset = ( ( page - 1 ) * 10 );
      this.retrieveFilteredAccounts( { offset: filteredAccountsOffset, filter: this.accountFilterUsed, searchKey: this.searchKey } );
    },

    viewAccountInDetail( id ) {
      this.changeRoute( { name: RouteNames.ADMIN.GAME.ACCOUNT, metaData: { params: { id } } } );
    },

  },
};

function mapActionsToMethods() {
  return mapActions( {
    retrieveFilteredAccounts: ActionTypes.retrieveFilteredAccounts,
    toggleBanForUser: ActionTypes.toggleBanForUser,
    changeRoute: ActionTypes.changeRoute,
  } );
}

function mapStateToComputed() {
  return mapState( {
    filteredAccounts: state => state.admin.filteredAccountData.filteredAccounts,
    totalFilteredAccounts: state => state.admin.filteredAccountData.totalFilteredAccounts,
    accountFilterUsed: state => state.admin.filteredAccountData.filterUsed,
    searchKey: state => state.admin.filteredAccountData.searchKey,
    currentRequestsInProgress: state => state.application.currentRequestsInProgress,
  } );
}

export default Accounts;
