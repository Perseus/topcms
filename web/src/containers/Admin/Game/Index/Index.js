import { mapActions, mapState } from 'vuex';
import findKey from 'lodash/findKey';
import { BButton } from 'buefy/dist/components/button';
import { BField } from 'buefy/dist/components/field';
import { BInput } from 'buefy/dist/components/input';
import { BDropdown, BDropdownItem } from 'buefy/dist/components/dropdown';
import { BIcon } from 'buefy/dist/components/icon';
import { BProgress } from 'buefy/dist/components/progress';

import request from '@services/GraphQLRequest';
import GeneralConfig from '../../../../config/GeneralConfig';
import ActionTypes from '../../../../store/types/ActionTypes';
import RouteNames from '../../../../config/RouteNames';
import { creatingItemCache } from '../../../../apollo/subscriptions/admin/game';

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

  components: {
    'b-button': BButton,
    'b-field': BField,
    'b-input': BInput,
    'b-icon': BIcon,
    'b-dropdown': BDropdown,
    'b-dropdown-item': BDropdownItem,
    'b-progress': BProgress
  },

  computed: {
    ...mapStateToComputed(),

    isFetchingAccounts() {
      return request.isRequestInProgress( 'usersWithFilter' );
    },

    isFetchingCharacters() {
      return request.isRequestInProgress( 'charactersWithFilter' );
    },

    isUploadingItemInfo() {
      return request.isRequestInProgress( 'uploadItemInfo' );
    },
    itemCachedPercentage() {
      if ( this.totalItemsToCache === 0 ) {
        return 0;
      }

      return Math.ceil( ( this.totalItemsCached / this.totalItemsToCache ) * 100 );
    },

    shouldShowCachingProgressBar() {
      return ( this.isCachingItemInfo && this.totalItemsToCache > 0 );
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

    redirectToMallCategories() {
      this.changeRoute( { name: RouteNames.ADMIN.COMMERCE.CATEGORIES } );
    },

    redirectToMallItems() {
      this.changeRoute( { name: RouteNames.ADMIN.COMMERCE.ITEMS } );
    },

    async searchAccounts() {
      const filterKey = findKey( this.accountSearchFilters, filter => filter === this.selectedAccountSearchFilter );
      await this.retrieveFilteredAccounts( { filter: filterKey, searchKey: this.accountSearchTerm, offset: 0 } );
      this.changeRoute( { name: RouteNames.ADMIN.GAME.ACCOUNTS } );
    },

    async searchCharacters() {
      const filterKey = findKey( this.characterSearchFilters, filter => filter === this.selectedCharacterSearchFilter );
      await this.retrieveFilteredCharacters( { filter: filterKey, searchKey: this.characterSearchTerm, offset: 0 } );
      this.changeRoute( { name: RouteNames.ADMIN.GAME.CHARACTERS } );
    },

    generateItemInfoCache() {
      this.startCachingItemInfo();
    },

    openItemInfoUploadWindow() {
      this.$refs.iteminfoUploadInput.click();
    },

    handleIteminfoUpload( event ) {
      const file = event.target.files[ 0 ];

      if ( file.type !== 'text/plain' ) {
        this.$buefy.toast.open( {
          message: 'Please enter a valid file type ( only .txt files are allowed ) ',
          type: 'is-danger',
          duration: 3000,
        } );
        return;
      }

      if ( file.size >= 5000000 ) {
        this.$buefy.toast.open( {
          message: 'Please enter a file smaller than 5MB',
          type: 'is-danger',
          duration: 3000,
        } );
        return;
      }

      const formData = new FormData();
      formData.append( 'ItemInfo', file );
      this.uploadItemInfo( { file: formData } );
    },

  },
};

function mapActionsToMethods() {
  return mapActions( {
    retrieveFilteredAccounts: ActionTypes.retrieveFilteredAccounts,
    changeRoute: ActionTypes.changeRoute,
    startCachingItemInfo: ActionTypes.generateItemInfoCache,
    uploadItemInfo: ActionTypes.uploadItemInfo,
    retrieveFilteredCharacters: ActionTypes.retrieveFilteredCharacters,
  } );
}

function mapStateToComputed() {
  return mapState( {
    currentRequestsInProgress: state => state.application.currentRequestsInProgress,
    isCachingItemInfo: state => state.admin.isCachingItemInfo,
    totalItemsToCache: state => state.admin.totalItemsToCache,
    totalItemsCached: state => state.admin.totalItemsCached,
  } );
}

export default Index;
