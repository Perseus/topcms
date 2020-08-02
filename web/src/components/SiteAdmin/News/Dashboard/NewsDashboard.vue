<template>
  <section class="news-dashboard">
    <div class="new-article-cta">
      <b-button type="is-primary" @click="moveToCreateNewsPage">Create new news article</b-button>
    </div>
    <b-table :data="news" :loading="isLoading">
      <template slot-scope="props">
        <b-table-column field="id" label="ID" width="40" numeric>{{ props.row.id }}</b-table-column>
        <b-table-column field="Title" label="Title">{{ getClippedHTML( props.row.title ) }}</b-table-column>
        <b-table-column field="author" label="Author">{{ props.row.author.name }}</b-table-column>
        <b-table-column
          field="createdAt"
          label="Created At"
        >{{ getDateInWords( props.row.createdAt ) }} ago</b-table-column>
        <b-table-column field="actions" label="Actions" class="table-actions">
          <b-button
            class="edit-btn"
            type="is-warning"
            size="is-small"
            icon-left="edit"
            icon-pack="fas"
            @click="editNewsArticle( props.row.id )"
          >Edit</b-button>
          <b-button
            type="is-danger"
            size="is-small"
            icon-left="trash"
            icon-pack="fas"
            @click="deleteNewsPrompt( props.row.id )"
          >Delete</b-button>
        </b-table-column>
      </template>
    </b-table>
  </section>
</template>


<script src="./NewsDashboard.js"></script>
<style src="./NewsDashboard.scss" lang="scss" scoped></style>