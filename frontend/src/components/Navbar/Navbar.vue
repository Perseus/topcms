<template>

  <nav class="navbar">

    <div class="navbar__logo">
      <router-link to="/">
        <img src="img/logo.png">
      </router-link>
    </div>

    <ul class="navbar__nav">
      <router-link to="/"><li class="navbar__nav-item">Home</li></router-link>
      <li class="navbar__nav-item">Account
        <ul class="navbar__nav-dropdown">
          <router-link to="/"><li class="navbar__nav-dropdown-item">Register</li></router-link>
          <router-link to="/"><li class="navbar__nav-dropdown-item">Login</li></router-link>
        </ul>
      </li>
      <router-link to=""><li class="navbar__nav-item">Community</li></router-link>
      <router-link to=""><li class="navbar__nav-item">Item Shop</li></router-link>
      <router-link to=""><li class="navbar__nav-item">Media</li></router-link>
      <router-link to=""><li class="navbar__nav-item">Support</li></router-link>
    </ul>
  </nav>

</template>

<script src="./Navbar.js"></script>
<style src="./Navbar.scss" lang="scss"></style>