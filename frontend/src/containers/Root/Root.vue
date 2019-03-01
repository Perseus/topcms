<template>
  
  <div class="app">
    
    <Navbar></Navbar>
    <div class="main-container">
      <Sidebar></Sidebar>
      <router-view></router-view>
    </div>
    

  </div>

</template>

<script src="./Root.js"></script>
<style src="./Root.scss" lang="scss"></style>