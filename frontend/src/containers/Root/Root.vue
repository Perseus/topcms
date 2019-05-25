<template>
  <div class="app">
    <Navbar :user="userState" @onLogoutUser="logoutUser"></Navbar>
    <Sidebar :user="userState"></Sidebar>
    <section class="main-container">
      <router-view></router-view>
    </section>
    <transition
      enter-active-class="animated fadeInRight fast"
      leave-active-class="animated fadeOutLeft fast"
    >
      <notify-toast v-if="isToastVisible" :options="toastOptions" @dismissToast="dismissToast"></notify-toast>
    </transition>
  </div>
</template>

<script src="./Root.js"></script>
<style src="./Root.scss" lang="scss"></style>