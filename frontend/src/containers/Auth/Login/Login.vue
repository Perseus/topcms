<template>
  <div class="login">
    

    <form @submit.prevent="loginUser" class="login__form">
      <h1 class="login__title">Login</h1>
      <h2 class="login__subtitle">Please enter your login details</h2>
      <div class="login__field" :class="{
          'input-field-error': getError('username')
          }">
        <label for="login__username-input" class="login__field-label">Username</label>
        <input type="text" id="login__username-input" class="login__field-input-text" v-model="username" />
        <span class="error-text" v-if="getError('username')"> {{ errors['username'] }} </span>
      </div>
      <div class="login__field" :class="{
          'input-field-error': getError('password')
          }">
        <label for="login__username-input" class="login__field-label">Password</label>
        <input type="password" id="login__username-input" class="login__field-input-text" v-model="password" />
        <span class="error-text" v-if="getError('password')"> {{ errors['password'] }} </span>
      </div>
      <div class="input-field-error main-error" v-if="getError('credentials')">
        <span class="error-text">
          {{ errors['credentials'] }}
        </span>
      </div>
      <span class="login__forgot-link">
        Forgot Password?
      </span>
      <button class="login__submit" type="submit">
        <span v-if="!isLoggingIn">Log in</span>
        <div class="loading-circle" v-else>
        </div>
      </button>
      <span class="login__signup-link">
        Sign Up
      </span>
    </form>
    
  </div>
</template>


<script src="./Login.js"></script>
<style src="./Login.scss" lang="scss"></style>