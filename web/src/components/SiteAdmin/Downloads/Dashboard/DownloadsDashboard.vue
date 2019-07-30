<template>
  <section class="downloads-dashboard">
    <div class="new-download-cta">
      <b-button type="is-primary" @click="showCreateDownloadModal">Create new download</b-button>
    </div>
    <b-table :data="authors" :loading="isLoading">
      <template slot-scope="props">
        <b-table-column field="id" label="ID" width="40" numeric>{{ props.row.id }}</b-table-column>
        <b-table-column field="name" label="Name">{{ props.row.name }}</b-table-column>
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
            @click="editAuthorPrompt( props.row.id)"
          >Edit</b-button>
          <b-button
            type="is-danger"
            size="is-small"
            icon-left="trash"
            @click="deleteAuthorPrompt( props.row.id )"
          >Delete</b-button>
        </b-table-column>
      </template>
    </b-table>
  </section>
</template>


<script src="./DownloadsDashboard.js"></script>
<style src="./DownloadsDashboard.scss" lang="scss" scoped></style>