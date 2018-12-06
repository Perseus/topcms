<template>

  <div class="app-container">
    <Navbar></Navbar>
    <transition name="fade">
      <div class="container">
        <router-view></router-view>
      </div>
    </transition>
  </div>
  

</template>

<script src="./Root.js"></script>
<style src="./Root.scss" lang="scss"></style>zl