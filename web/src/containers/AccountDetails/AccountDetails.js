import { mapState, mapActions } from 'vuex';
import { BButton } from 'buefy/dist/components/button';
import { BField } from 'buefy/dist/components/field';
import { BInput } from 'buefy/dist/components/input';

import request from '@services/GraphQLRequest';
import ActionTypes from '../../store/types/ActionTypes';

import TInput from '../../components/ValidationInputs/TInput.vue';

const AccountDetails = {
  name: 'account-details',
  data() {
    return {
      userDetails: {},
      oldPassword: '',
      newPassword: '',
    };
  },

  components: {
    TInput,
    'b-button': BButton,
    'b-field': BField,
    'b-input': BInput,
  },

  created() {
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
      return request.isRequestInProgress( 'updateUser' );
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
      this.updateUser( { newPassword: this.newPassword, oldPassword: this.oldPassword, email: this.userDetails.email } );
    },
  }

};


function mapComputedToState() {
  return mapState( {
    user: state => state.user.userData,
    requestsInProgress: state => state.application.currentRequestsInProgress,
  } );
}

function mapActionsToMethods() {
  return mapActions( {
    updateUser: ActionTypes.updateUser,
  } );
}

export default AccountDetails;
