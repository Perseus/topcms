<template>
   <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(handlePointsUpdate)" class="update-user-mall-points-form">
      <div class="card update-card">
        <header class="card-header">
          <div class="card-header-title">Update {{ mallType }} Points</div>
        </header>
        <div class="card-content">
          <TInput v-model="points" :value="points" rules="required|integer" label="Points" name="Points" />
        </div>
        <footer class="card-footer">
          <div class="card-footer-item">
            <b-button type="is-primary" :loading="isUpdatingPoints" native-type="submit">Add points</b-button>
          </div>
        </footer>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
  import { BButton } from 'buefy/dist/components/button';
  import request from '@services/GraphQLRequest';
  import TInput from '@components/ValidationInputs/TInput.vue';

  export default {
    name: 'update-user-mall-points',

    data() {
      return {
        points: 0,
      }
    },

    components: {
      TInput,
      'b-button': BButton
    },

    props: {
      modalOptions: {
        type: Object,
        default: () => {},
      }
    },

    created() {
      this.points = this.modalOptions.points;
    },

    computed: {
      isUpdatingPoints() {
        return request.isRequestInProgress('addCommercePoints');
      },

      mallType() {
        return ( this.modalOptions.type === 'CREDIT' ? 'Award Center' : 'Item Mall' );
      }
    },

    methods: {
      handlePointsUpdate() {
        this.$emit('updatePoints', { type: this.modalOptions.type, points: this.points} );
      }
    }
  }
</script>
<style lang="scss" scoped>
  .update-user-mall-points-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>