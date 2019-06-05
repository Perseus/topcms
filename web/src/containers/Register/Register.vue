<template>
  <section class="container register-form">
    <div class="card">
      <div class="card-content">
        <form @submit.prevent="onUserRegister">
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
            label="Email"
            :type="{ 'is-danger': errors.has('email') }"
            :message="errors.first('email')"
          >
            <b-input v-validate="'required|email'" name="email" v-model="email"></b-input>
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
            <a
              href="#"
              class="have-account-cta"
              @click.prevent="redirectToLogin"
            >Already have an account ?</a>
            <b-button type="is-primary" native-type="submit" :loading="isUserRegistering">Register</b-button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>


<script src="./Register.js"></script>
<style src="./Register.scss" lang="scss" scoped></style>