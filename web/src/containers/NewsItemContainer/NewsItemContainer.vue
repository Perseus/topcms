<template>
  <div class="news-article-container" v-if="currentNewsItem">
    <div class="news-article card">
      <div class="card-content">
        <div class="article-heading is-size-1 has-text-black">{{ currentNewsItem.title }}</div>
        <div class="article-metadata">
          <div class="article-timestamp has-text-grey is-size-6">{{ newsCreatedAt }} ago</div>
          <div class="article-author has-text-grey is-size-6">by {{ currentNewsItem.author.name }}</div>
        </div>
        <div class="article-content is-size-4" v-html="currentNewsItem.content"></div>
      </div>
    </div>
  </div>
</template>

<script src="./NewsItemContainer.js"></script>
<style src="./NewsItemContainer.scss" lang="scss" scoped></style>