import { mapState, mapActions } from 'vuex';

import ActionTypes from '../../../../store/types/ActionTypes';
import RouteNames from '../../../../config/RouteNames';
import { hasValidJobIcon } from '../../../../utils/CharacterUtils';
import UpdateUserEmailModal from '../../../../components/GameAdmin/UpdateUserEmailModal.vue';
import UpdateUserPasswordModal from '../../../../components/GameAdmin/UpdateUserPasswordModal.vue';
import UpdateUserGMLevelModal from '../../../../components/GameAdmin/UpdateUserGMModal.vue';

import GeneralConfig from '../../../../config/GeneralConfig';

const AdminGameAccount = {
  name: 'admin-game-account-view',

  components: {
    'update-user-email-modal': UpdateUserEmailModal,
    'update-user-password-modal': UpdateUserPasswordModal,
    'update-user-gm-level-modal': UpdateUserGMLevelModal,
  },

  mounted() {
    if ( !this.accountData || this.accountData === null ) {
      this.changeRoute( { name: RouteNames.ADMIN.GAME.INDEX } );
    }
  },

  computed: {
    ...mapComputedToState(),

    shouldShowUpdateUserEmailModal() {
      return ( Boolean( this.modalState.type ) && this.modalState.type === GeneralConfig.MODAL_TYPES.UPDATE_USER_EMAIL );
    },

    shouldShowUpdatePasswordModal() {
      return ( Boolean( this.modalState.type ) && this.modalState.type === GeneralConfig.MODAL_TYPES.UPDATE_USER_PASSWORD );
    },

    shouldShowUpdateGMModal() {
      return ( Boolean( this.modalState.type ) && this.modalState.type === GeneralConfig.MODAL_TYPES.UPDATE_USER_GM );
    },
  },

  methods: {
    ...mapMethodsToActions(),

    getBanStatus( banStatus ) {
      if ( !banStatus || banStatus === 0 ) {
        return false;
      }

      return true;
    },

    openEmailUpdateModal() {
      this.toggleModal( { type: GeneralConfig.MODAL_TYPES.UPDATE_USER_EMAIL } );
    },

    openPasswordUpdateModal() {
      this.toggleModal( { type: GeneralConfig.MODAL_TYPES.UPDATE_USER_PASSWORD } );
    },

    openGMLevelUpdateModal() {
      this.toggleModal( { type: GeneralConfig.MODAL_TYPES.UPDATE_USER_GM } );
    },

    handleBanForUser( id, currentBan ) {
      this.toggleBanForUser( { id, currentBan } );
    },

    getValidCharacters( characters ) {
      const validCharacters = characters.filter( character => character.delflag === 0 );
      return validCharacters;
    },

    getCharacterIcon( character ) {
      try {
        // eslint-disable-next-line
          return require( `@/assets/img/chars/${character.icon.toLowerCase()}_${character.job.toLowerCase()}.gif` );
      } catch ( err ) {
        // eslint-disable-next-line
        return require( '@/assets/img/chars/unknown.gif' );
      }
    },

    async handleUpdateUserEmail( data ) {
      await this.adminUpdateUserEmail( { email: data.email, id: this.accountData.id } );
      this.toggleModal();
    },

    async handleUpdateUserPassword( data ) {
      await this.adminUpdateUser( { password: data.password, id: this.accountData.id } );
      this.toggleModal();
    },

    async handleUpdateUserGMLevel( data ) {
      await this.adminUpdateUser( { gm: data.gm, id: this.accountData.id } );
      this.toggleModal();
    },

    redirectToCharacter( characterId ) {
      this.changeRoute( { name: RouteNames.ADMIN.GAME.CHARACTER, metaData: { params: { id: characterId } } } );
    }
  }
};


function mapComputedToState() {
  return mapState( {
    accountData: state => state.admin.retrievedAccountData,
    modalState: state => state.application.modalState,
  } );
}

function mapMethodsToActions() {
  return mapActions( {
    changeRoute: ActionTypes.changeRoute,
    toggleBanForUser: ActionTypes.toggleBanForUser,
    toggleModal: ActionTypes.toggleModal,
    adminUpdateUserEmail: ActionTypes.adminUpdateUserEmail,
    adminUpdateUser: ActionTypes.adminUpdateUser
  } );
}

export default AdminGameAccount;
