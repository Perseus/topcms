<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img class="logo-image" src="@/assets/img/logo.png">
        <span class="logo-text">topCMS</span>
      </router-link>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbar"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbar" class="navbar-menu">
      <div class="navbar-start">
        <router-link
          to="/admin/site"
          class="navbar-item"
          v-if="canAccessSiteAdmin"
        >Site Administration</router-link>
        <router-link
          to="/admin/game"
          class="navbar-item"
          v-if="canAccessGameAdmin"
        >Game Administration</router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item" v-if="!isUserLoggedIn">
          <div class="buttons">
            <a class="button is-primary" @click.prevent="redirectToSignup">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light" @click.prevent="redirectToLogin">Log in</a>
          </div>
        </div>
        <div class="navbar-item">
          <b-dropdown position="is-bottom-left" aria-role="list">
            <a class="user-dropdown navbar-link" slot="trigger">
              <b-icon icon="user" size="is-small"></b-icon>
              <span class="username">{{ username }}</span>
            </a>
            <b-dropdown-item aria-role="listitem">Account</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Logout</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </div>
  </nav>
</template>



<script src="./Navbar.js"></script>
<style src="./Navbar.scss" lang="scss" scoped></style>