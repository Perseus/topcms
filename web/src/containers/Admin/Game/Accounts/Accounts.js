import { mapState, mapActions } from 'vuex';
import { BButton } from 'buefy/dist/components/button';
import { BSwitch } from 'buefy/dist/components/switch';
import { BTable } from 'buefy/dist/components/table';

import request from '@services/GraphQLRequest';
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

  components: {
    'b-button': BButton,
    'b-switch': BSwitch,
    'b-table': BTable
  },

  computed: {
    ...mapStateToComputed(),

    isRetrievingAccounts() {
      return request.isRequestInProgress( 'getFilteredAccounts' );
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
