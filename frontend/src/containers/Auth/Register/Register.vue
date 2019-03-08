<template>
  <div class="register">
    
    {{ errorComputer }}
    <form @submit.prevent="registerUser" class="register__form">
      <h1 class="register__title">Register</h1>
      <h2 class="register__subtitle">Please enter your registration details</h2>
      <div class="register__field">
        <label for="register__username-input" class="register__field-label" :class="{
          'input-field-error': existsError ('username')
          }">Username</label>
        <input type="text" id="register__username-input" class="register__field-input-text" v-model="username" required/>
        <span class="error-text" v-if="existsError('username')"> {{ getError('username') }}</span>
      </div>
      <div class="register__field"  :class="{
          'input-field-error': existsError ('email')
          }">
        <label for="register__email-input" class="register__field-label">eMail</label>
        <input type="email" id="register__email-input" class="register__field-input-text" v-model="email" required/>
        <span class="error-text" v-if="existsError('email')"> {{ getError('email') }}</span>
      </div>
      <div class="register__field" :class="{
          'input-field-error': existsError ('emailRepeat')
          }">
        <label for="repeat-email-input" class="register__field-label">Repeat eMail</label>
        <input type="email" id="repeat-email-input" class="register__field-input-text" v-model="emailRepeat" required/>
        <span class="error-text" v-if="existsError('emailRepeat')"> {{ getError('emailRepeat') }}</span>
      </div>
      <div class="register__field" :class="{
          'input-field-error': existsError ('password')
          }">
        <label for="password-input" class="register__field-label">Password</label>
        <input type="password" id="password-input" class="register__field-input-text" v-model="password" required/>
        <span class="error-text" v-if="existsError('password')"> {{ getError('password') }}</span>
      </div>
      <button class="register__submit" type="submit">
        <span v-if="!isLoading">Register</span>
        <div class="loading-circle" v-else></div>
      </button>
      <span class="register__login-link" @click="$router.push('/auth/login')" >Log In</span>
    </form>
  </div>
</template>


<script src="./Register.js"></script>
<style src="./Register.scss" lang="scss"></style>