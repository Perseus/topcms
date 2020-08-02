import { mapState, mapActions } from 'vuex';
import { BButton } from 'buefy/dist/components/button';
import { BTable } from 'buefy/dist/components/table';
import ActionTypes from '../../../../store/types/ActionTypes';
import RouteNames from '../../../../config/RouteNames';

const Characters = {
  name: 'admin-game-Characters',

  data() {
    return {
      perPage: 10,
      currentPage: 1,
    };
  },

  components: {
    'b-button': BButton,
    'b-table': BTable
  },

  computed: {
    ...mapStateToComputed(),

    isRetrievingCharacters() {
      return this.currentRequestsInProgress.includes( 'retrievingFilteredCharacters' );
    },
  },

  methods: {
    ...mapActionsToMethods(),

    redirectToBaseAdmin() {
      this.changeRoute( { name: RouteNames.ADMIN.GAME.INDEX } );
    },

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
      const filteredCharactersOffset = ( ( page - 1 ) * 10 );
      this.retrieveFilteredCharacters( { offset: filteredCharactersOffset, filter: this.characterFilterUsed, searchKey: this.searchKey } );
    },

    viewAccountInDetail( id ) {
      this.changeRoute( { name: RouteNames.ADMIN.GAME.ACCOUNT, metaData: { params: { id } } } );
    },

    viewCharacterInDetail( id ) {
      this.changeRoute( { name: RouteNames.ADMIN.GAME.CHARACTER, metaData: { params: { id } } } );
    }

  },
};

function mapActionsToMethods() {
  return mapActions( {
    retrieveFilteredCharacters: ActionTypes.retrieveFilteredCharacters,
    toggleBanForUser: ActionTypes.toggleBanForUser,
    changeRoute: ActionTypes.changeRoute,
  } );
}

function mapStateToComputed() {
  return mapState( {
    filteredCharacters: state => state.admin.filteredCharacterData.filteredCharacters,
    totalFilteredCharacters: state => state.admin.filteredCharacterData.totalFilteredCharacters,
    characterFilterUsed: state => state.admin.filteredCharacterData.filterUsed,
    searchKey: state => state.admin.filteredCharacterData.searchKey,
    currentRequestsInProgress: state => state.application.currentRequestsInProgress,
  } );
}

export default Characters;
