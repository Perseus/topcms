<template>

  <div class="auth-modal">

    
    <font-awesome-icon icon="times" class="auth-modal__exit" @click="closeModal"> </font-awesome-icon>
    
    <form class="form-auth">

      <label class="form-auth__label"> Username </label>
      <input type="text" class="form-auth__text" v-model="username" />

      <label class="form-auth__label"> Password </label>
      <input type="password" class="form-auth__text" v-model="password" />

      <input type="submit" class="form-auth__submit" value="Login" @click="signupProcess" />

    </form>
  </div>

</template>


<script src="./AuthModal.js"></script>
<style src="./AuthModal.scss" lang="scss"></style>