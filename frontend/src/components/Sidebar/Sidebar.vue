<template>
  <div class="sidebar">
    <div class="sidebar__navigation-section">
      <ul class="navigation__list">
        <router-link to="/">
          <li class="navigation__list-item navigation__list-item--active">
            <font-awesome-icon class="navigation__list-icon" :icon="[ 'far', 'newspaper' ]" />
            News
          </li>
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
      </ul>
    </div>
  </div>
</template>


<script src="./Sidebar.js"></script>
<style src="./Sidebar.scss" lang="scss"></style>