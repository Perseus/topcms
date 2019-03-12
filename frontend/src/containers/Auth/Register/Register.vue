<template>
  <div class="register">
    
    <form class="register__form" @submit.prevent="registerUser">
      <h1 class="register__title">Register</h1>
      <h2 class="register__subtitle">Please enter your registration details</h2>
      <TextInput v-model="username" :name="username" :error="getError('username')">
        <template slot="label"> Username </template>
      </TextInput>
      <TextInput v-model="email" :name="email" :inputType="'email'" :error="getError('email')">
        <template slot="label"> eMail </template>
      </TextInput>
      <TextInput v-model="password" :name="password" :inputType="'password'" :error="getError('password')">
        <template slot="label"> Password </template>
      </TextInput>
      <Button :loaderCondition="isLoggingIn" :height="'5rem'" :width="'32rem'">
        <template slot="button-text">
          Register
        </template>
      </Button>
      <span class="register__login-link" @click="$router.push('/auth/login')" >Log In</span>
    </form>
  </div>
</template>


<script src="./Register.js"></script>
<style src="./Register.scss" lang="scss"></style>