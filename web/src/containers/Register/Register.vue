<template>
  <section class="container register-form">
    <div class="card">
      <div class="card-content">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(onUserRegister)">
            <TInput label="Username" name="Username" v-model="username" rules="required|min:4" />
            <TInput label="E-mail" name="E-mail" v-model="email" rules="required|email" />
            <TInput label="Password" type="password" name="Password" v-model="password" vId="password" rules="required|min:5" />
            <TInput label="Confirm Password" type="password" name="Confirm Password" rules="required|confirmed:password" />

            <div class="cta">
              <a
              href="#"
              class="have-account-cta"
              @click.prevent="redirectToLogin"
            >Already have an account ?</a>
            <b-button data-test="register-button" type="is-primary" native-type="submit" :loading="isUserRegistering">Register</b-button>
          
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </section>
</template>


<script src="./Register.js"></script>
<style src="./Register.scss" lang="scss" scoped></style>