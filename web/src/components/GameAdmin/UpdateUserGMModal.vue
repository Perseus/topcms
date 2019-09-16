<template>
  <form @submit.prevent="handleGMUpdate">
    <div class="card update-card">
      <header class="card-header">
        <div class="card-header-title">Update GM Level</div>
      </header>
      <div class="card-content">
        <b-field :type="{ 'is-danger': errors.has('gm') }" :message="errors.first('gm')" label="GM">
          <b-input v-validate="'required'" name="gm" v-model="gm" type="gm"></b-input>
        </b-field>
      </div>
      <footer class="card-footer">
        <div class="card-footer-item">
          <b-button type="is-primary" native-type="submit">Update</b-button>
        </div>
      </footer>
    </div>
  </form>
</template>

<script src>
export default {
  name: "update-user-email-modal",
  data() {
    return {
      gm: 0
    };
  },
  methods: {
    async handleGMUpdate() {
      const didValidationSucceed = await this.$validator.validateAll();

      if (didValidationSucceed) {
        this.$emit("handleUpdateEmail", { email: this.email });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.update-card {
  min-width: 300px;
}
</style>