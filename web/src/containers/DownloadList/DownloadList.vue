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
      <div class="download-section" v-for="( section ) in getDownloadSections()" :key="section">
        <b-collapse class="card">
          <div slot="trigger" slot-scope="props" role="button">
            <header class="download-section-header">
              <span class="section-title">{{ section }}</span>
              <b-icon :icon="props.open ? 'caret-down' : 'caret-up'"></b-icon>
            </header>
          </div>

          <div class="download-section-body">
            <div class="card" v-for="(download) in getDownloads( section )" :key="download.id">
              <header class="card-header">
                <div class="card-header-title">
                  <div
                    class="has-text-white has-background-primary download-version is-size-6"
                    v-if="shouldShowVersion"
                  >{{ download.version }}</div>
                  {{ download.title }}
                </div>
                <div class="download-info is-size-7">by {{ download.author.name }}</div>
              </header>
              <section class="card-content">
                <div class="content" v-html="download.description"></div>
                <div
                  class="created-at is-size-7 is-pulled-right"
                >{{ getDateInWords( download.createdAt ) }} ago</div>
              </section>
              <footer class="card-footer">
                <img
                  :src="getSourceIcon( download )"
                  class="download-source-icon card-footer-item"
                  v-if="shouldShowSourceIcon"
                />
                <a :href="download.url" target="_blank" class="card-footer-item">Download</a>
              </footer>
            </div>
          </div>
        </b-collapse>
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