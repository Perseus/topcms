<template>
  <nav class="navbar">
    <div class="navbar__search">
      <input type="text" class="navbar__search-input">
      <font-awesome-icon class="navbar__search-icon" icon="search"/>
    </div>

    <div class="navbar__auth">
      <template v-if="!isUserLoggedIn">
        <router-link to="/auth/register">
          <button class="navbar__auth-auth-btn register">Register</button>
        </router-link>
        <router-link to="/auth/login">
          <button class="navbar__auth-auth-btn">Log In</button>
        </router-link>
      </template>
      <template v-else>
        <div
          class="navbar__auth-user"
          @click="toggleAuthDropdown"
          v-click-outside="hideAuthDropdown"
        >
          <span class="navbar__auth-user-avatar">
            <font-awesome-icon icon="user"></font-awesome-icon>
          </span>
          <font-awesome-icon class="navbar__auth-user-icon" icon="caret-down"></font-awesome-icon>
        </div>
        <ul
          class="navbar__auth-dropdown"
          :class="{
              'navbar__auth-dropdown--shown': showDropdown }"
        >
          <div class="navbar__auth-dropdown-info">
            <div class="avatar">
              <font-awesome-icon icon="user"></font-awesome-icon>
            </div>
            <div class="info">
              <div class="username">{{ user.name }}</div>
              <div class="email">{{ user.email }}</div>
            </div>
          </div>
          <li class="navbar__auth-dropdown-item">Account Details</li>
          <li class="navbar__auth-dropdown-item">Settings</li>
          <li
            class="navbar__auth-dropdown-item navbar__auth-dropdown-item--logout"
            @click="logoutUser"
          >
            <font-awesome-icon class="navbar__auth-logout-icon" icon="sign-out-alt"></font-awesome-icon>Logout
          </li>
        </ul>
      </template>
    </div>
  </nav>
</template>

<script src="./Navbar.js"></script>
<style src="./Navbar.scss" lang="scss"></style>