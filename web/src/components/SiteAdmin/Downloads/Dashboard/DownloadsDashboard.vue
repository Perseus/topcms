<template>
  <section class="downloads-dashboard">
    <div class="new-download-cta">
      <b-button type="is-primary" @click="showCreateDownloadModal">Create new download</b-button>
    </div>
    <b-table :data="downloads" :loading="isLoading">
      <template slot-scope="props">
        <b-table-column field="id" label="ID" width="40" numeric>{{ props.row.id }}</b-table-column>
        <b-table-column field="Title" label="Title">{{ props.row.title }}</b-table-column>
        <b-table-column field="url" label="Link">{{ props.row.url }}</b-table-column>
        <b-table-column field="Section" label="Section">{{ props.row.section }}</b-table-column>
        <b-table-column field="Version" label="Version">{{ props.row.version }}</b-table-column>
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
            @click="editDownloadPrompt( props.row.id )"
          >Edit</b-button>
          <b-button
            type="is-danger"
            size="is-small"
            icon-left="trash"
            icon-pack="fas"
            @click="deleteDownloadPrompt( props.row.id )"
          >Delete</b-button>
        </b-table-column>
      </template>
    </b-table>
    <b-modal :active.sync="shouldShowCreateDownloadModal"  has-modal-card>
      <create-download-modal
        @createDownload="handleCreateDownload"
        :isLoading="isCreatingDownload"
        :downloadCreationError="downloadCreationError"
        :authors="authors"
        v-if="shouldShowCreateDownloadModal"
      ></create-download-modal>
    </b-modal>
    <b-modal :active="shouldShowEditDownloadModal" @close="handleCloseEditModal" has-modal-card>
      <edit-download-modal
        @editDownload="handleEditDownload"
        @closeEditModal="handleCloseEditModal"
        :isLoading="isEditingDownload"
        :downloadDetails="editDownloadModalDetails"
        :downloadEditingError="downloadEditingError"
        :authors="authors"
        v-if="shouldShowEditDownloadModal"
      ></edit-download-modal>
    </b-modal>
  </section>
</template>


<script src="./DownloadsDashboard.js"></script>
<style src="./DownloadsDashboard.scss" lang="scss" scoped></style>