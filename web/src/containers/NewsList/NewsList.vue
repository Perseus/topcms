<template>
  <div class="columns">
    <div class="column is-one-fifths">
      <sidebar-navigation-container @redirectToPage="redirectToPage"></sidebar-navigation-container>
      <server-info
        class="server-info-container"
        :isLoading="isRetrievingGameStats"
        :gameStats="gameStats"
      ></server-info>
    </div>
    <div class="column is-three-fifths">
      <b-pagination
        class="news-list-pagination"
        :total="total"
        :current.sync="current"
        :range-before="rangeBefore"
        :range-after="rangeAfter"
        :order="order"
        :size="size"
        :simple="isSimple"
        :rounded="isRounded"
        :per-page="perPage"
        @change="handleNewsFeedPageChange"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      ></b-pagination>
      <div class="card news-feed-card" v-for="(news) in newsFeed" :key="news.id">
        <header class="card-header">
          <p class="card-header-title news-title">{{ news.title }}</p>
        </header>
        <div class="card-content">
          <div class="content" v-html="getTruncatedHtml( news.content )"></div>
          <a @click.prevent="goToNewsPage( news.id )" class="read-more-link">Read More</a>
        </div>
        <footer class="card-footer">
          <div
            class="news-metadata"
          >by {{ news.author.name }} - {{ getDateInWords( news.updatedAt ) }} ago</div>
        </footer>
      </div>
      <b-loading :is-full-page="false" :active.sync="fetchingNewsFeed" :can-cancel="false"></b-loading>
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

<script src="./NewsList.js"></script>
<style src="./NewsList.scss" lang="scss" scoped></style>