<template>
  
  <div class="app">
    
    <Navbar 
    :user="userState"
    @onLogoutUser="logoutUser" ></Navbar>
    <div class="main-container">
      <Sidebar></Sidebar>
      <router-view></router-view>
    </div>
    

  </div>

</template>

<script src="./Root.js"></script>
<style src="./Root.scss" lang="scss"></style>