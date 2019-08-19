<template>
  <div class="columns">
    <div class="column is-one-fifths">
      <sidebar-navigation-container></sidebar-navigation-container>
      <server-info
        class="server-info-container"
        :isLoading="isRetrievingGameStats"
        :gameStats="gameStats"
      ></server-info>
    </div>
    <div class="column is-three-fifths">
      <div class="card" v-for="(download) in downloads" :key="download.id">
        <header class="card-header">
          <p class="card-header-title">{{ download.title }}</p>
          <div
            class="download-info is-size-7"
          >by {{ download.author.name }} {{ getDateInWords( download.createdAt ) }} ago</div>
        </header>
        <footer class="card-footer">
          <a :href="download.url" target="_blank" class="card-footer-item">Download</a>
        </footer>
      </div>
      <b-loading :is-full-page="false" :active.sync="isFetchingDownloads" :can-cancel="false"></b-loading>
    </div>
    <div class="column is-one-fifths">
      <staff-status-container :staffInfo="GMInfo" :isFetchingStaffInfo="fetchingStaffInfo"></staff-status-container>
      <server-rates-container
        class="server-rates-container"
        :rates="serverRates"
        :isLoading="fetchingServerRates"
      ></server-rates-container>
    </div>
  </div>
</template>

<script src="./DownloadList.js"></script>
<style src="./DownloadList.scss" lang="scss" scoped></style>