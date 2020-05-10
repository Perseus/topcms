<template>
  <section class="container login-form">
    <div class="card">
      <div class="card-content">
        <ValidationObserver v-slot="{ handleSubmit }" ref="loginForm">
          <form @submit.prevent="handleSubmit(onUserLogin)">
            <TInput label="Username" rules="required" v-model="username" name="Username"/>
            <TInput label="Password" type="password" rules="required|min:5" v-model="password" name="Password"/>

            <div class="cta">
              <div class="small-action-group">
                <a
                  href="#"
                  class="forgot-password"
                  @click.prevent="redirectToForgot"
                >Forgot Password?</a>
                <a href="#" class="sign-up-cta" @click.prevent="redirectToSignup">Sign Up</a>
              </div>
              <b-button
                type="is-primary"
                native-type="submit"
                class="login-btn"
                :loading="isUserLoggingIn"
              >
                Login
              </b-button>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </section>
</template>


<script src="./Login.js"></script>
<style src="./Login.scss" lang="scss" scoped></style>