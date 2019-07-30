<template>
  <section class="author-dashboard">
    <div class="new-author-cta">
      <b-button type="is-primary" @click="showCreateAuthorModal">Create new author</b-button>
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
    <b-modal :active.sync="shouldShowCreateAuthorModal" has-modal-card>
      <create-author-modal
        @createAuthor="handleCreateAuthor"
        :isLoading="isCreatingAuthor"
        :authorCreationError="authorCreationError"
      ></create-author-modal>
    </b-modal>
    <b-modal :active="shouldShowEditAuthorModal" @close="handleCloseEditModal" has-modal-card>
      <edit-author-modal
        @editAuthor="handleEditAuthor"
        @closeEditModal="handleCloseEditModal"
        :isLoading="isEditingAuthor"
        :authorDetails="editAuthorModalDetails"
        :authorEditingError="authorEditingError"
      ></edit-author-modal>
    </b-modal>
  </section>
</template>


<script src="./AuthorDashboard.js"></script>
<style src="./AuthorDashboard.scss" lang="scss" scoped></style>