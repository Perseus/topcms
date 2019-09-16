import { mapActions, mapState } from 'vuex';
import _ from 'lodash';

import GeneralConfig from '../../../../config/GeneralConfig';
import ActionTypes from '../../../../store/types/ActionTypes';
import RouteNames from '../../../../config/RouteNames';

const Index = {
  name: 'admin-game-index',
  data() {
    return {
      accountSearchTerm: '',
      accountSearchFilters: {},
      selectedAccountSearchFilter: '',
      characterSearchTerm: '',
      characterSearchFilters: {},
      selectedCharacterSearchFilter: '',
    };
  },

  computed: {
    ...mapStateToComputed(),

    isFetchingAccounts() {
      return this.currentRequestsInProgress.includes( 'getFilteredAccounts' );
    }
  },

  created() {
    this.accountSearchFilters = GeneralConfig.ACCOUNT_SEARCH_FILTERS;
    this.characterSearchFilters = GeneralConfig.CHARACTER_SEARCH_FILTERS;
    this.selectedCharacterSearchFilter = this.characterSearchFilters.ACCOUNT_NAME;
    this.selectedAccountSearchFilter = this.accountSearchFilters.ACCOUNT_NAME;
  },


  methods: {
    ...mapActionsToMethods(),

    async searchAccounts() {
      const filterKey = _.findKey( this.accountSearchFilters, filter => filter === this.selectedAccountSearchFilter );
      await this.retrieveFilteredAccounts( { filter: filterKey, searchKey: this.accountSearchTerm, offset: 0 } );
      this.changeRoute( { name: RouteNames.ADMIN.GAME.ACCOUNTS } );
    },
  },
};

function mapActionsToMethods() {
  return mapActions( {
    retrieveFilteredAccounts: ActionTypes.retrieveFilteredAccounts,
    changeRoute: ActionTypes.changeRoute,
  } );
}

function mapStateToComputed() {
  return mapState( {
    currentRequestsInProgress: state => state.application.currentRequestsInProgress,
  } );
}

export default Index;
