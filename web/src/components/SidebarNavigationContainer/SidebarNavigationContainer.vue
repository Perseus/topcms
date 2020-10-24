<template>
  <div class="card sidebar-card">
    <header class="card-header">
      <div class="card-header-title">Main Navigation</div>
    </header>
    <div class="card-content">
      <ul>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/news">News</router-link>
        </li>
        <li>
          <router-link to="/downloads">Downloads</router-link>
        </li>
        <li>
          <router-link to="/ranking">Ranking</router-link>
        </li>
        <li>
          <router-link to="/commerce/item-mall">Item Mall</router-link>
        </li>
        <li>
          <router-link to="/commerce/award-center">Award Center</router-link>
        </li>
      </ul>
    </div>
    <div class="card-footer"></div>
  </div>
</template>

<script src="./SidebarNavigationContainer.js"></script>
<style src="./SidebarNavigationContainer.scss" lang="scss" scoped></style>