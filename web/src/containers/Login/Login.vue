<template>
  <section class="container login-form">
    <div class="card">
      <div class="card-content">
        <form @submit.prevent="onUserLogin">
          <b-field
            label="Username"
            :type="{ 'is-danger': errors.has('username') }"
            :message="errors.first('username')"
          >
            <b-input
              v-validate="'required'"
              data-test="username"
              name="username"
              v-model="username"
            ></b-input>
          </b-field>
          <b-field
            label="Password"
            :type="{ 'is-danger': errors.has('password') }"
            :message="errors.first('password')"
          >
            <b-input
              v-model="password"
              v-validate="'required|min:8'"
              name="password"
              type="password"
              password-reveal
            ></b-input>
          </b-field>
          <div class="cta">
            <div class="small-action-group">
              <a href="#" class="forgot-password" @click.prevent="redirectToForgot">Forgot Password?</a>
              <a href="#" class="sign-up-cta" @click.prevent="redirectToSignup">Sign Up</a>
            </div>
            <b-button
              type="is-primary"
              native-type="submit"
              class="login-btn"
              :loading="isUserLoggingIn"
            >Login</b-button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>


<script src="./Login.js"></script>
<style src="./Login.scss" lang="scss" scoped></style>