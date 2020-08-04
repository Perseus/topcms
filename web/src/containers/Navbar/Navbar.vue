<template>
  <b-navbar>
    <template slot="brand">
      <a class="navbar-item" @click.prevent="redirectToLanding">
        <img class="logo-image" src="@/assets/img/logo.png" />
        <span class="logo-text">{{ serverTitle }}</span>
      </a>
    </template>
    <template slot="start">
      <a @click.prevent="redirectToLanding" class="navbar-item">Home</a>
      <b-navbar-dropdown label="Admin" v-if="canAccessSiteAdmin">
        <b-navbar-item @click.prevent="redirectToSiteAdmin" href="">Site Admin</b-navbar-item>
        <b-navbar-item @click.prevent="redirectToGameAdmin" v-if="canAccessGameAdmin">Game Admin</b-navbar-item>
      </b-navbar-dropdown>
    </template>

    <template slot="end">
      <div class="navbar-item" v-if="!isUserLoggedIn">
        <div class="buttons">
          <a class="button is-primary" @click.prevent="redirectToSignup">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light" @click.prevent="redirectToLogin">Log in</a>
        </div>
      </div>
      <div class="navbar-item" v-else>
        <b-dropdown position="is-bottom-left" aria-role="list">
          <a class="user-dropdown navbar-link" slot="trigger">
            <b-icon icon="user" size="is-small" pack="fas"></b-icon>
            <span class="username">{{ username }}</span>
          </a>
          <b-dropdown-item aria-role="listitem" @click="redirectToUserManagement">Account</b-dropdown-item>
          <b-dropdown-item aria-role="listitem" @click="redirectToStorageBox">Storage Box</b-dropdown-item>
          <b-dropdown-item aria-role="listitem" @click="logout">Logout</b-dropdown-item>
        </b-dropdown>
      </div>
    </template>
  </b-navbar>
</template>



<script src="./Navbar.js"></script>
<style src="./Navbar.scss" lang="scss" scoped></style>