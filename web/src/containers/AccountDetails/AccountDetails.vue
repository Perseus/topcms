<template>
  <div class="user-account-details card">
    <header class="card-header">
      <div class="card-header-title">Manage your account</div>
    </header>

    <div class="card-content">
      <form @submit.prevent>
        <div class="form-section">
          <div class="section-title">Account</div>
          <div class="section-fields">
            <b-field label="Username">
              <b-input v-model="userDetails.username" disabled></b-input>
            </b-field>
            <b-field
              :type="{ 'is-danger': errors.has('email') }"
              :message="errors.first('email')"
              label="Email"
            >
              <b-input
                v-validate="'required'"
                name="email"
                v-model="userDetails.email"
                type="email"
              ></b-input>
            </b-field>
          </div>
        </div>

        <hr />

        <div class="form-section">
          <div class="section-title">Change Password</div>
          <div class="section-fields password">
            <b-field
              :type="{ 'is-danger': errors.has('old password') }"
              :message="errors.first('old password')"
              label="Old Password"
            >
              <b-input
                v-validate="'required|min:5'"
                name="old password"
                v-model="oldPassword"
                type="password"
              ></b-input>
            </b-field>
            <b-field
              :type="{ 'is-danger': errors.has('new password') }"
              :message="errors.first('new password')"
              label="New Password"
            >
              <b-input
                v-validate="'required|min:5'"
                name="new password"
                v-model="newPassword"
                type="password"
              ></b-input>
            </b-field>
          </div>
        </div>
      </form>
    </div>
    <footer class="card-footer">
      <a
        class="card-footer-item has-text-grey cancel-btn"
        @click="resetForm"
        v-if="shouldShowCancelButton"
      >Cancel</a>
      <b-button class="card-footer-item" type="is-primary" @click="updateUser">Save Changes</b-button>
    </footer>
  </div>
</template>

<script src="./AccountDetails.js"></script>
<style src="./AccountDetails.scss" lang="scss" scoped></style>