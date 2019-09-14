import { mapState, mapActions } from 'vuex';

import ActionTypes from '../../../../store/types/ActionTypes';
import RouteNames from '../../../../config/RouteNames';
import { hasValidJobIcon } from '../../../../utils/CharacterUtils';

const AdminGameAccount = {
  name: 'admin-game-account-view',
  mounted() {
    if ( !this.accountData || this.accountData === null ) {
      this.changeRoute( { name: RouteNames.ADMIN.GAME.INDEX } );
    }
  },
  computed: {
    ...mapComputedToState(),
  },

  methods: {
    ...mapMethodsToActions(),

    getBanStatus( banStatus ) {
      if ( !banStatus || banStatus === 0 ) {
        return false;
      }

      return true;
    },

    handleBanForUser( id, currentBan ) {
      this.toggleBanForUser( { id, currentBan } );
    },

    getValidCharacters( characters ) {
      const validCharacters = characters.filter( character => character.delflag === 0 );
      return validCharacters;
    },

    getCharacterIcon( character ) {
      if ( hasValidJobIcon( character ) ) {
        // eslint-disable-next-line
        return require( `@/assets/img/chars/${character.icon.toLowerCase()}_${character.job.toLowerCase()}.gif` );
      }
      // eslint-disable-next-line
      return require( `@/assets/img/chars/unknown.gif` );
    }
  }
};


function mapComputedToState() {
  return mapState( {
    accountData: state => state.admin.retrievedAccountData,
  } );
}

function mapMethodsToActions() {
  return mapActions( {
    changeRoute: ActionTypes.changeRoute,
    toggleBanForUser: ActionTypes.toggleBanForUser,
  } );
}

export default AdminGameAccount;
