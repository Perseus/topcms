<template>
<ValidationObserver v-slot="{ handleSubmit }">
  <form @submit.prevent="handleSubmit(handlePasswordUpdate)">
    <div class="card email-update-card">
      <header class="card-header">
        <div class="card-header-title">Update password</div>
      </header>
      <div class="card-content">
        <TInput v-model="password" name="password" type="password" label="Password" rules="required|min:5" />
      </div>
      <footer class="card-footer">
        <div class="card-footer-item">
          <b-button type="is-primary" :loading="isUpdatingPassword" native-type="submit">Update</b-button>
        </div>
      </footer>
    </div>
  </form>
</ValidationObserver>
</template>

<script>
import { BButton } from 'buefy/dist/components/button';
import TInput from '@components/ValidationInputs/TInput';
import request from '@services/GraphQLRequest';

export default {
  name: 'update-user-password-modal',
  data() {
    return {
      password: ''
    };
  },

  components: {
    TInput,
    'b-button': BButton,
  },

  computed: {
    isUpdatingPassword() {
      return request.isRequestInProgress( 'updateUserFromAdmin' )      
    },
  },

  methods: {
     handlePasswordUpdate() {
      this.$emit( 'handleUpdatePassword', { password: this.password } );
    }
  }
};
</script>
<style lang="scss" scoped>
.email-update-card {
  min-width: 300px;
}
</style>