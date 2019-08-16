<template>
  <div class="card">
    <header class="card-header">
      <div class="card-header-title">Navigation</div>
    </header>
    <div class="card-content">
      <ul>
        <li>
          <a @click="redirectTo('news')">News</a>
        </li>
        <li>
          <a @click="redirectTo('downloads')">Downloads</a>
        </li>
        <li>
          <a @click="redirectTo('ranking')">Ranking</a>
        </li>
        <li>
          <a @click="redirectTo('mall')">Item Mall</a>
        </li>
        <li>
          <a @click="redirectTo('awardCenter')">Award Center</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script src="./SidebarNavigationContainer.js"></script>
<style src="./SidebarNavigationContainer.scss" lang="scss" scoped></style>