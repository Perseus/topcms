<template>

  <nav class="navbar">

      <div class="navbar__title">
        <router-link to="/">
          <span class="navbar__title-text"> topCMS </span>
        </router-link>
      </div>

      <div class="navbar__search">
        <input type="text" class="navbar__search-input" />
        <font-awesome-icon class="navbar__search-icon" icon="search" />
      </div>

      <div class="navbar__auth">
        <router-link to="/auth/register"> <button class="navbar__auth-signup-btn"> Register </button> </router-link>
        <router-link to="/auth/login"> <button class="navbar__auth-login-btn"> Log In </button> </router-link>
      </div>
      
  </nav>
  
</template>

<script src="./Navbar.js"></script>
<style src="./Navbar.scss" lang="scss"></style>