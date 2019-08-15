<template>
  <section class="site-admin-section">
    <div class="administration-actions">
      <div class="card">
        <div class="card-content">
          <b-button type="is-primary" @click="manageServerRates">Manage Server Rates</b-button>
          <!-- <b-button type="is-primary" @click="showCreateAuthorModal">Create new author</b-button> -->
        </div>
      </div>
    </div>
    <b-modal
      :active="shouldShowManageRatesModal"
      @close="handleCloseManageRatesModal"
      has-modal-card
    >
      <server-rates-update-modal
        :rates="serverRates"
        @handleServerRateUpdate="manageEditServerRates"
      ></server-rates-update-modal>
    </b-modal>
    <b-tabs class="admin-table" :animated="false" v-model="activeTab">
      <b-tab-item label="News">
        <admin-news-dashboard
          :news="news"
          :isLoading="isFetchingSiteInfo"
          @moveToCreateNewsPage="moveToCreateNewsPage"
          @deleteNewsArticle="deleteNewsArticle"
          @editNewsArticle="handleEditNewsArticle"
        ></admin-news-dashboard>
      </b-tab-item>
      <b-tab-item label="Authors">
        <admin-author-dashboard
          :authors="authors"
          :isLoading="isFetchingSiteInfo"
          :isCreatingAuthor="isCreatingAuthor"
          :authorCreationError="authorError"
          :shouldShowEditAuthorModal="shouldShowEditAuthorModal"
          :editAuthorModalDetails="editAuthorModalDetails"
          :isEditingAuthor="isUpdatingAuthor"
          :authorEditingError="authorError"
          @delete="handleDeleteAuthor"
          @fetchAuthors="fetchAuthors"
          @createAuthor="handleCreateAuthor"
          @showEditAuthor="handleShowEditAuthor"
          @editAuthor="handleEditAuthor"
          @closeAuthorEditModal="handleCloseAuthorEditModal"
        ></admin-author-dashboard>
      </b-tab-item>
      <b-tab-item label="Downloads">
        <admin-downloads-dashboard
          :authors="authors"
          :downloads="downloads"
          :isLoading="isFetchingSiteInfo"
          :isCreatingDownload="isCreatingDownload"
          :isEditingDownload="isUpdatingDownload"
          :shouldShowEditDownloadModal="shouldShowEditDownloadModal"
          :editDownloadModalDetails="editDownloadModalDetails"
          @createDownload="handleCreateDownload"
          @editDownload="handleEditDownload"
          @deleteDownload="handleDeleteDownload"
          @showEditDownload="handleShowEditDownload"
          @closeDownloadEditModal="handleCloseDownloadEditModal"
        ></admin-downloads-dashboard>
      </b-tab-item>
      <!-- <b-tab-item label="Polls">Polls</b-tab-item> -->
    </b-tabs>
  </section>
</template>


<script src="./Site.js"></script>
<style src="./Site.scss" lang="scss" scoped></style>