<template>
  <section class="container register-form">
    <div class="card">
      <div class="card-content">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(onUserRegister)">
            <TInput label="Username" name="Username" v-model="username" rules="required|min:4"></TInput>
            <TInput label="E-mail" name="E-mail" v-model="email" rules="required|email"></TInput>
            <TInput label="Password" type="password" name="Password" v-model="password" vid="password" rules="required|min:5"></TInput>
            <TInput label="Confirm Password" type="password" name="Confirm Password" rules="confirmed:password"></TInput>

            <div class="cta">
              <a
              href="#"
              class="have-account-cta"
              @click.prevent="redirectToLogin"
            >Already have an account ?</a>
            <b-button type="is-primary" native-type="submit" :loading="isUserRegistering">Register</b-button>
          
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </section>
</template>


<script src="./Register.js"></script>
<style src="./Register.scss" lang="scss" scoped></style>