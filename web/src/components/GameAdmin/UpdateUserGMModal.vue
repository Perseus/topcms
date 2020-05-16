
<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(handleGMUpdate)">
      <div class="card update-card">
        <header class="card-header">
          <div class="card-header-title">Update GM Level</div>
        </header>
        <div class="card-content">
          <TInput v-model="gm" rules="required|numeric" label="GM" name="GM" />
        </div>
        <footer class="card-footer">
          <div class="card-footer-item">
            <b-button type="is-primary" :loading="isUpdatingGM" native-type="submit">Update</b-button>
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
  name: 'update-user-gm-modal',
  props: {
    currentLevel: {
      type: Number,
      default: 0
    }
  },

  components: {
    TInput
  },
  
  data() {
    return {
      gm: 0
    };
  },


  created() {
    this.gm = this.currentLevel;
  },

  computed: {
    isUpdatingGM() {
      return request.isRequestInProgress( 'updateUserFromAdmin' );
    }
  },

  methods: {
     handleGMUpdate() {
      this.$emit('handleUpdateGMLevel', { gm: Number( this.gm ) });
    }
  }
};
</script>
<style lang="scss" scoped>
.update-card {
  min-width: 300px;
}
</style>