<template>
<ValidationObserver v-slot="{ handleSubmit }">
  <form @submit.prevent="handleSubmit(handleEmailUpdate)">
    <div class="card email-update-card">
      <header class="card-header">
        <div class="card-header-title">Update eMail</div>
      </header>
      <div class="card-content">
        <TInput v-model="email" name="EMail" label="eMail" type="email" rules="required|email" />
      </div>
      <footer class="card-footer">
        <div class="card-footer-item">
          <b-button type="is-primary" :loading="isUpdatingEmail" native-type="submit">Update</b-button>
        </div>
      </footer>
    </div>
  </form>
</ValidationObserver>
</template>

<script>

import TInput from '@components/ValidationInputs/TInput';
import request from '@services/GraphQLRequest';

export default {
  name: 'update-user-email-modal',
  data() {
    return {
      email: ''
    };
  },

  components: {
    TInput
  },

  computed: {
    isUpdatingEmail() {
      return request.isRequestInProgress( 'updateUserFromAdmin' );
    }
  },

  methods: {
     handleEmailUpdate() {
      this.$emit('handleUpdateEmail', { email: this.email });
    }
  }
};
</script>
<style lang="scss" scoped>
.email-update-card {
  min-width: 300px;
}
</style>