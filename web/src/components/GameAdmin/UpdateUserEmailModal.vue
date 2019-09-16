<template>
  <form @submit.prevent="handleEmailUpdate">
    <div class="card email-update-card">
      <header class="card-header">
        <div class="card-header-title">Update eMail</div>
      </header>
      <div class="card-content">
        <b-field
          :type="{ 'is-danger': errors.has('email') }"
          :message="errors.first('email')"
          label="Email"
        >
          <b-input v-validate="'required|email'" name="email" v-model="email" type="email"></b-input>
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
      email: ""
    };
  },
  methods: {
    async handleEmailUpdate() {
      const didValidationSucceed = await this.$validator.validateAll();

      if (didValidationSucceed) {
        this.$emit("handleUpdateEmail", { email: this.email });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.email-update-card {
  min-width: 300px;
}
</style>