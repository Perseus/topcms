<template>

  <nav class="navbar">

    <div class="navbar__search-container">
      <font-awesome-icon class="navbar__search-container-icon" icon="search"></font-awesome-icon>
      <input class="navbar__search-container-input" type="text" v-model="searchText" placeholder="Search the game database..." />
    </div>

    <div class="navbar__actions">
      <div class="navbar__actions-container" @click="openSignupModal">
        <a href="#" class="navbar__action"> Sign Up </a>
      </div>
      <div class="navbar__actions-container" @click="openLoginModal">
        <a href="#" class="navbar__action"> Log In </a>
      </div>
      
    </div>

  </nav>
  
</template>

<script src="./Navbar.js"></script>
<style src="./Navbar.scss" lang="scss"></style>