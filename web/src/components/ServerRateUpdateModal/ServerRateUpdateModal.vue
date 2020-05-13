<template>
  <div class="card">
    <div class="card-content">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(updateServerRates)">
          <TInput label="Solo EXP" v-model="serverRates.solo" name="Solo EXP" rules="required|numeric" />
          <TInput label="Party EXP" v-model="serverRates.party" name="Party EXP" rules="required|numeric" />
          <TInput label="Drop Rate" v-model="serverRates.drop" name="Drop Rate" rules="required|numeric" />
          <TInput label="Ship EXP" v-model="serverRates.ship" name="Ship EXP" rules="required|numeric" />
          <TInput label="Fairy EXP" v-model="serverRates.fairy" name="Fairy EXP" rules="required|numeric" />
          <b-button
            class="edit-rates-btn"
            type="is-primary"
            native-type="submit"
          >Edit Server Rates</b-button>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>
      

<script>
import TInput from '@/components/ValidationInputs/TInput.vue';

export default {
  name: "server-rate-update-modal",
  props: {
    rates: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    TInput,
  },
  data() {
    return {
      serverRates: {}
    };
  },
  created() {
    this.serverRates = Object.assign({}, this.rates);
  },
  watch: {
    rates(newVal, oldVal) {
      this.serverRates = Object.assign({}, this.rates);
    }
  },
  methods: {
    updateServerRates() {
      console.log(this.rates, this.serverRates);
      this.$emit("handleServerRateUpdate", { rates: this.serverRates });
    }
  }
};
</script>
<style lang="scss" scoped>
.edit-rates-btn {
  margin-top: 1rem;
}
</style>