<template>
  <div class="card server-info">
    <header class="card-header">
      <div class="card-header-title">Server Stats</div>
    </header>
    <div class="card-content">
      <ul>
        <li class="server-stat">
          <span class="stat-name">Accounts:</span>
          <span class="stat-number">{{ gameStats.accounts }}</span>
        </li>
        <li class="server-stat">
          <span class="stat-name">Characters:</span>
          <span class="stat-number">{{ gameStats.characters }}</span>
        </li>
        <li class="server-stat">
          <span class="stat-name">Online:</span>
          <span class="stat-number">{{ gameStats.online }}</span>
        </li>
        <li class="server-stat">
          <span class="stat-name">Online Record:</span>
          <span class="stat-number">{{ gameStats.onlineRecord }}</span>
        </li>
      </ul>
    </div>
    <div class="card-footer"></div>
    <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="false"></b-loading>
  </div>
</template>


<script src="./ServerInfo.js"></script>
<style src="./ServerInfo.scss" lang="scss" scoped></style>