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
      <section class="news-feed" v-if="areThereAnyNewsArticles">
        <div class="card news-feed-card" v-for="(newsArticle) in newsFeed" :key="newsArticle.id">
          <header class="card-header">
            <p class="card-header-title news-title">{{ newsArticle.title }}</p>
          </header>
          <div class="card-content">
            <div class="content" v-html="getTruncatedHtml( newsArticle.content )"></div>
            <a @click.prevent="goToNewsPage( newsArticle.id )" class="read-more-link">Read More</a>
          </div>
          <footer class="card-footer">
            <div
              class="news-metadata"
            >by {{ newsArticle.author.name }} - {{ getDateInWords( newsArticle.updatedAt ) }} ago</div>
          </footer>
        </div>
        <b-button type="is-primary" @click="readAllNewsArticles">View all news articles</b-button>
      </section>
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


<script src="./Landing.js"></script>
<style src="./Landing.scss" lang="scss" scoped></style>