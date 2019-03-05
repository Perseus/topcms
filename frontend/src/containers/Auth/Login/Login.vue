<template>
  <div class="login">
    

    <form @submit.prevent="loginUser" class="login__form">
      <h1 class="login__title">Login</h1>
      <h2 class="login__subtitle">Please enter your login details</h2>
      <div class="login__field" :class="{
          'input-field-error': usernameError
          }">
        <label for="login__username-input" class="login__field-label">Username</label>
        <input type="text" id="login__username-input" class="login__field-input-text" v-model="username" />
        <span class="error-text" v-if="usernameError"> {{ errors['username'] }} </span>
      </div>
      <div class="login__field" :class="{
          'input-field-error': passwordError
          }">
        <label for="login__username-input" class="login__field-label">Password</label>
        <input type="password" id="login__username-input" class="login__field-input-text" v-model="password" />
        <span class="error-text" v-if="passwordError"> {{ errors['password'] }} </span>
      </div>
      <div class="input-field-error main-error" v-if="credentialsError">
        <span class="error-text">
          {{ errors['credentials'] }}
        </span>
        
      </div>
      <button class="login__submit" type="submit">
        <span v-if="!isLoggingIn">Login</span>
        <div class="loading-circle" v-else>
        </div>
        </button>
    </form>
  </div>
</template>


<script src="./Login.js"></script>
<style src="./Login.scss" lang="scss"></style>