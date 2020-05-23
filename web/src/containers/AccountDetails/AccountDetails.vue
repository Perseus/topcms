<template>
<ValidationObserver v-slot="{ handleSubmit }">

  <form @submit.prevent="handleSubmit(handleUpdateUser)">
    <div class="user-account-details card">
      <header class="card-header">
        <div class="card-header-title">Manage your account</div>
      </header>


      <div class="card-content">
        <div class="form-section">
          <div class="section-title">Account</div>
          <div class="section-fields">
            <b-field label="Username">
              <b-input v-model="userDetails.username" disabled></b-input>
            </b-field>
            <TInput mode="lazy" label="Email" name="Email" :value="userDetails.email" v-model="userDetails.email" type="email" rules="email" />
            <b-field label="Mall Points">
              <b-input v-model="userDetails.mallPoints" disabled></b-input>
            </b-field>
            <b-field label="Award Center Points">
              <b-input v-model="userDetails.awardCenterPoints" disabled></b-input>
            </b-field>
          </div>
        </div>

        <hr />

        <div class="form-section">
          <div class="section-title">Change Password</div>
          <div class="section-fields password">
            <TInput mode="lazy" label="Old Password" name="Old Password" v-model="oldPassword" type="password" rules="min:5|required_if:newPassword" />
            <TInput mode="lazy" label="New Password" name="New Password" v-model="newPassword" type="password" rules="min:5" vId="newPassword" />
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <a
          class="card-footer-item has-text-grey cancel-btn"
          @click="resetForm"
          v-if="shouldShowCancelButton"
        >Cancel</a>
        <b-button
          :loading="isUpdatingUser"
          type="is-primary"
          native-type="submit"
        >Save Changes</b-button>
      </footer>
    </div>
  </form>
</ValidationObserver>
</template>

<script src="./AccountDetails.js"></script>
<style src="./AccountDetails.scss" lang="scss" scoped></style>