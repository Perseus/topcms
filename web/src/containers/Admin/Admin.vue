<template>
  <div class="admin-choose-splash" v-if="isAdminDashboardPage">
    <div class="card site-admin" @click="redirectToSiteAdmin">
      <div class="card-content">Site Administration</div>
    </div>
    <div class="card game-admin" @click="redirectToGameAdmin">
      <div class="card-content">Game Administration</div>
    </div>
  </div>
  <router-view v-else></router-view>
</template>


<script src="./Admin.js"></script>
<style src="./Admin.scss" lang="scss" scoped></style>