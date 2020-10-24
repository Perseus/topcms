<template>
  <server-detail-structure>
    <template slot="main-content">

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
          v-if="newsFeed.length > 0"
        ></b-pagination>
        <div class="no-news-articles" v-if="newsFeed.length === 0">
          <template-card size="large">
            <template slot="card-content">
              <span> No news articles </span>
            </template>
          </template-card>
        </div>
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
        <b-loading :is-full-page="false" :active.sync="fetchingNewsFeed" :can-cancel="false"></b-loading>
        
    </template>
  </server-detail-structure>
</template>

<script src="./NewsList.js"></script>
<style src="./NewsList.scss" lang="scss" scoped></style>