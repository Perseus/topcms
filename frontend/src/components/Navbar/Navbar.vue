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
        <template v-if="!isUserLoggedIn">
          <router-link to="/auth/register"> <button class="navbar__auth-signup-btn"> Register </button> </router-link>
          <router-link to="/auth/login"> <button class="navbar__auth-login-btn"> Log In </button> </router-link>
        </template>
        <template v-else>
          <div class="navbar__auth-user" @click="showAuthDropdown">
            <span class="navbar__auth-username">{{ user.name }}</span>
            <font-awesome-icon class="navbar__auth-user-icon" icon="caret-down"></font-awesome-icon>
            <ul class="navbar__auth-dropdown">
              <li class="navbar__auth-dropdown-item"> Account Details </li>
              <li class="navbar__auth-dropdown-item"> Settings </li>
              <li class="navbar__auth-dropdown-item"> Site Panel </li>
              <li class="navbar__auth-dropdown-item"> Admin Panel </li>
              <li class="navbar__auth-dropdown-item navbar__auth-dropdown-item--logout" @click="logoutUser">
                <font-awesome-icon class="navbar__auth-logout-icon" icon="sign-out-alt"></font-awesome-icon> 
                Logout 
              </li>
            </ul> 
          </div>
          
          
        </template>
      </div>
      
  </nav>
  
</template>

<script src="./Navbar.js"></script>
<style src="./Navbar.scss" lang="scss"></style>