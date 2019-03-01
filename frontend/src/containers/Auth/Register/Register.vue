<template>
  <div class="register">
    

    <form @submit.prevent="registerUser" class="register__form">
      <h1 class="register__title">Register</h1>
      <h2 class="register__subtitle">Please enter your registration details</h2>
      <div class="register__field">
        <label for="register__username-input" class="register__field-label">Username</label>
        <input type="text" id="register__username-input" class="register__field-input-text" />
      </div>
      <div class="register__field">
        <label for="register__username-input" class="register__field-label">eMail</label>
        <input type="email" id="register__username-input" class="register__field-input-text" />
      </div>
      <div class="register__field">
        <label for="register__username-input" class="register__field-label">Repeat eMail</label>
        <input type="email" id="register__username-input" class="register__field-input-text" />
      </div>
      <div class="register__field">
        <label for="register__username-input" class="register__field-label">Password</label>
        <input type="password" id="register__username-input" class="register__field-input-text" />
      </div>
      <button class="register__submit" type="submit">
        <span v-if="!isLoading">Register</span>
        <div class="loading-circle" v-else>

        </div>
        </button>
    </form>
  </div>
</template>


<script src="./Register.js"></script>
<style src="./Register.scss" lang="scss"></style>