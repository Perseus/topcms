<template>
  <div class="card server-info">
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
          <span class="stat-number">{{ gameStats.online_record }}</span>
        </li>
      </ul>
    </div>
    <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="false"></b-loading>
  </div>
</template>


<script src="./ServerInfo.js"></script>
<style src="./ServerInfo.scss" lang="scss" scoped></style>