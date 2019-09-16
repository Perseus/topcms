<template>
  <form @submit.prevent="handlePasswordUpdate">
    <div class="card email-update-card">
      <header class="card-header">
        <div class="card-header-title">Update password</div>
      </header>
      <div class="card-content">
        <b-field
          :type="{ 'is-danger': errors.has('password') }"
          :message="errors.first('password')"
          label="Password"
        >
          <b-input v-validate="'required|min:5'" name="password" v-model="password" type="password"></b-input>
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
  name: "update-user-password-modal",
  data() {
    return {
      password: ""
    };
  },
  methods: {
    async handlePasswordUpdate() {
      const didValidationSucceed = await this.$validator.validateAll();

      if (didValidationSucceed) {
        this.$emit("handleUpdatePassword", { password: this.password });
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