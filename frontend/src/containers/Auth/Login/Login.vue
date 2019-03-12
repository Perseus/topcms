<template>
  <div class="login">
    

    <form @submit.prevent="loginUser" class="login__form">
      <h1 class="login__title">Login</h1>
      <h2 class="login__subtitle">Please enter your login details</h2>
      <TextInput v-model="username" :name="username" :error="getError('username')">
        <template slot="label"> Username </template>
      </TextInput>
      <TextInput v-model="password" :name="password" :error="getError('password')">
        <template slot="label"> Password </template>
      </TextInput>
      <span class="login__forgot-link">
        Forgot Password?
      </span>
      <Button :loaderCondition="isLoggingIn" :height="'5rem'" :width="'32rem'">
        <template slot="button-text">
          Login
        </template>
      </Button>
      <span class="login__signup-link" @click="$router.push('/auth/register')">
        Sign Up
      </span>
    </form>
    
  </div>
</template>


<script src="./Login.js"></script>
<style src="./Login.scss" lang="scss"></style>