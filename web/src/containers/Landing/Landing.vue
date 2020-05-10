<template>
  <server-detail-structure>
    <template slot="main-content">
      <div class="no-news-articles" v-if="!areThereAnyNewsArticles">
        No news articles found
      </div>
      <section class="news-feed" v-else>
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
    </template>
  </server-detail-structure>
</template>


<script src="./Landing.js"></script>
<style src="./Landing.scss" lang="scss" scoped></style>