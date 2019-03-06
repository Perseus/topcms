<template>
  
  <div class="app">

    <Navbar 
    :user="userState"
    @onLogoutUser="logoutUser" ></Navbar>
    <Sidebar
    :user="userState"></Sidebar>
    <section class="main-container">
      <router-view></router-view>
    </section>
    

  </div>

</template>

<script src="./Root.js"></script>
<style src="./Root.scss" lang="scss"></style>