<template>
  <div class="card">
    <div class="card-content">
      <form>
        <b-field
          :type="{ 'is-danger': errors.has('soloExp') }"
          :message="errors.first('soloExp')"
          label="Solo EXP"
        >
          <b-numberinput
            v-validate="'required'"
            name="soloExp"
            :value="serverRates.solo"
            v-model="serverRates.solo"
          ></b-numberinput>
        </b-field>
        <b-field
          :type="{ 'is-danger': errors.has('partyExp') }"
          :message="errors.first('partyExp')"
          name="partyExp"
          label="Party EXP"
        >
          <b-numberinput
            v-validate="'required'"
            name="partyExp"
            :value="serverRates.party"
            v-model="serverRates.party"
          ></b-numberinput>
        </b-field>
        <b-field
          :type="{ 'is-danger': errors.has('dropRate') }"
          :message="errors.first('dropRate')"
          name="dropRate"
          label="Drop Rate"
        >
          <b-numberinput
            v-validate="'required'"
            name="dropRate"
            :value="serverRates.drop"
            v-model="serverRates.drop"
          ></b-numberinput>
        </b-field>
        <b-field
          :type="{ 'is-danger': errors.has('shipExp') }"
          :message="errors.first('shipExp')"
          name="shipExp"
          label="Ship EXP"
        >
          <b-numberinput
            v-validate="'required'"
            name="shipExp"
            :value="serverRates.ship"
            v-model="serverRates.ship"
          ></b-numberinput>
        </b-field>
        <b-field
          :type="{ 'is-danger': errors.has('fairyExp') }"
          :message="errors.first('fairyExp')"
          name="fairyExp"
          label="Fairy EXP"
        >
          <b-numberinput
            v-validate="'required'"
            name="fairyExp"
            :value="serverRates.fairy"
            v-model="serverRates.fairy"
          ></b-numberinput>
        </b-field>
        <b-button
          class="edit-rates-btn"
          type="is-primary"
          @click="updateServerRates"
        >Edit Server Rates</b-button>
      </form>
    </div>
  </div>
</template>
      

<script>
export default {
  name: "server-rate-update-modal",
  props: {
    rates: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      serverRates: {}
    };
  },
  created() {
    this.serverRates = Object.assign({}, this.rates);
  },
  methods: {
    async updateServerRates() {
      const didFormValidationSucceed = await this.$validator.validateAll();
      if (!didFormValidationSucceed) {
        return;
      }

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