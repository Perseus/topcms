<template>

  <nav class="navbar">
    <div class="navbar__left">
      <div class="navbar__brand">
        <router-link to="/"><img class="navbar__brand-image" src="~@/assets/img/logo.png" /></router-link>
      </div>
      <div class="navbar__search">
        <i class="fas fa-search"></i>
        <input type="text" class="navbar__search-input">
      </div>
    </div>
  </nav>
  
</template>

<script src="./Navbar.js"></script>
<style src="./Navbar.scss" lang="scss"></style>