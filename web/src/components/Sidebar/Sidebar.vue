<template>
  <div class="sidebar">
    <router-link to="/">
      <div class="sidebar__title">topCMS</div>
    </router-link>
    <div class="sidebar__navigation-section">
      <ul class="navigation__list">
        <div class="navigation__list-title" @click="toggleDropdown('site')">
          Site Navigation
          <font-awesome-icon
            v-if="isSelected('site')"
            icon="caret-up"
            class="navigation__list-dropdown-icon"
          ></font-awesome-icon>
          <font-awesome-icon v-else icon="caret-down" class="navigation__list-dropdown-icon"></font-awesome-icon>
        </div>
        <div
          class="navigation__list-items"
          :class="{
          'navigation__list-items--active': isSelected('site')
        }"
        >
          <router-link to="/">
            <li class="navigation__list-item navigation__list-item--active">News</li>
          </router-link>
          <router-link to="/">
            <li class="navigation__list-item">Downloads</li>
          </router-link>
          <router-link to="/">
            <li class="navigation__list-item">Shop</li>
          </router-link>
          <router-link to="/">
            <li class="navigation__list-item">Ranking</li>
          </router-link>
          <router-link to="/">
            <li class="navigation__list-item">Media</li>
          </router-link>
        </div>
      </ul>
      <ul class="navigation__list" v-if="isUserLoggedIn">
        <div class="navigation__list-title" @click="toggleDropdown('account')">
          Account
          <font-awesome-icon
            v-if="isSelected('account')"
            icon="caret-up"
            class="navigation__list-dropdown-icon"
          ></font-awesome-icon>
          <font-awesome-icon v-else icon="caret-down" class="navigation__list-dropdown-icon"></font-awesome-icon>
        </div>
        <div
          class="navigation__list-items"
          :class="{
          'navigation__list-items--active': isSelected('account')
        }"
        >
          <router-link to="/">
            <li class="navigation__list-item">Profile</li>
          </router-link>
          <router-link to="/">
            <li class="navigation__list-item">Settings</li>
          </router-link>
        </div>
      </ul>
      <ul class="navigation__list" v-if="shouldShowAdminActions">
        <div class="navigation__list-title" @click="toggleDropdown('admin')">
          Admin Navigation
          <font-awesome-icon
            v-if="isSelected('admin')"
            icon="caret-up"
            class="navigation__list-dropdown-icon"
          ></font-awesome-icon>
          <font-awesome-icon v-else icon="caret-down" class="navigation__list-dropdown-icon"></font-awesome-icon>
        </div>
        <div
          class="navigation__list-items"
          :class="{
          'navigation__list-items--active': isSelected('admin')
        }"
        >
          <router-link to="/site/dashboard" v-if="shouldShowSiteManagement">
            <li class="navigation__list-item">Site Management</li>
          </router-link>
          <router-link to="/" v-if="shouldShowGameManagement">
            <li class="navigation__list-item">Game Management</li>
          </router-link>
        </div>
      </ul>
    </div>
  </div>
</template>


<script src="./Sidebar.js"></script>
<style src="./Sidebar.scss" lang="scss"></style>