import { mapState, mapActions } from 'vuex';
import ActionTypes from '../../store/types/ActionTypes';

const AccountDetails = {
  name: 'account-details',
  data() {
    return {
      userDetails: {},
      oldPassword: '',
      newPassword: '',
    };
  },

  mounted() {
    this.userDetails = Object.assign( {}, this.user );
  },

  computed: {
    ...mapComputedToState(),

    hasFilledPasswords() {
      return ( this.oldPassword !== '' || this.newPassword !== '' );
    },

    shouldShowCancelButton() {
      if ( this.hasFilledPasswords || this.userDetails.email !== this.user.email ) {
        return true;
      }

      return false;
    },

    isUpdatingUser() {
      return ( this.requestsInProgress.includes( 'updateUser' ) );
    },
  },

  methods: {
    ...mapActionsToMethods(),

    resetForm() {
      this.oldPassword = '';
      this.newPassword = '';
      this.userDetails.email = this.user.email;
    },

    async handleUpdateUser() {
      const didFormValidationSucceed = await this.$validator.validateAll();

      if ( !didFormValidationSucceed ) {
        return;
      }

      this.updateUser( { newPassword: this.newPassword, oldPassword: this.oldPassword, email: this.userDetails.email } );
    },
  }

};


function mapComputedToState() {
  return mapState( {
    user: state => state.user,
    requestsInProgress: state => state.application.currentRequestsInProgress,
  } );
}

function mapActionsToMethods() {
  return mapActions( {
    updateUser: ActionTypes.updateUser,
  } );
}

export default AccountDetails;
