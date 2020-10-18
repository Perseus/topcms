<template>
  <server-detail-structure>
    <template slot="main-content">
      <div class="no-news-articles" v-if="!areThereAnyNewsArticles">
        <template-card size="large">
          <template slot="card-content">
            <b-loading :is-full-page="false" :active.sync="fetchingNewsFeed" :can-cancel="false"></b-loading>
            <span v-if="!fetchingNewsFeed"> No news articles </span>
          </template>
        </template-card>
      </div>
      <section class="news-feed" v-else>
        <template-card v-for="(newsArticle) in newsFeed" :key="newsArticle.id" size="large" class="news-card">
            <template slot="title"> [News] {{ newsArticle.title }} </template>
            <template slot="card-content">
              <div class="card-content">
                <div class="content" v-html="getTruncatedHtml( newsArticle.content )"></div>
              </div>
            </template>
            <template slot="footer">
              by {{ newsArticle.author.name }} - {{ getDateInWords( newsArticle.updatedAt ) }} ago
              <a class="read-more-btn" @click.prevent="goToNewsPage(newsArticle.id)" >Read More</a>
            </template>
        </template-card>
        <b-button type="is-primary" @click="readAllNewsArticles">View all news articles</b-button>
      </section>
      
    </template>
  </server-detail-structure>
</template>


<script src="./Landing.js"></script>
<style lang="scss">
  .news-card {
    & .card-header-title {
      justify-content: flex-start;
      margin-left: 20px;
    }

    & .card-content {
      font-weight: normal;
      min-height: 80px;
    }
  }

  .no-news-articles {
    & .card-content {
      min-height: 80px;
      justify-content: center;
      align-items: center;
      display: flex;
      font-size: 24px;
    }
  }
</style>
<style src="./Landing.scss" lang="scss" scoped></style>