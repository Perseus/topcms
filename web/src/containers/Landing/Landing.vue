<template>
  <div class="columns">
    <div class="column is-one-fifths">
      <server-info :isLoading="isRetrievingGameStats" :gameStats="gameStats"></server-info>
    </div>
    <div class="column is-three-fifths">
      <section class="news-feed" v-if="areThereAnyNewsArticles">
        <div class="card news-feed-card" v-for="(newsArticle) in newsFeed" :key="newsArticle.id">
          <header class="card-header">
            <p class="card-header-title">{{ newsArticle.title }}</p>
          </header>
          <div class="card-content">
            <div class="content" v-html="getTruncatedHtml( newsArticle.content )"></div>
            <a @click.prevent="goToNewsPage( newsArticle.id )" class="read-more-link">Read More</a>
          </div>
          <footer class="card-footer">
            <div
              class="news-metadata"
            >by {{ newsArticle.author.name }} - {{ getDateInWords( newsArticle.createdAt ) }} ago</div>
          </footer>
        </div>
      </section>
      <b-loading :is-full-page="false" :active.sync="fetchingNewsFeed" :can-cancel="false"></b-loading>
    </div>
    <div class="column is-one-fifths">
      <!--
        not sure what I want to put here yet
      !-->
    </div>
  </div>
</template>


<script src="./Landing.js"></script>
<style src="./Landing.scss" lang="scss" scoped></style>