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
        <div class="no-news-found" v-if="newsFeed.length === 0">
          No news articles found
        </div>
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
        
    </template>
  </server-detail-structure>
</template>

<script src="./NewsList.js"></script>
<style src="./NewsList.scss" lang="scss" scoped></style>