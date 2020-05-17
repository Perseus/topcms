<template>
  <div class="commerce-categories-container">
    <div class="new-category-cta">
      <b-button type="is-primary" @click="showCategoryCreateModal">Create new category</b-button>
    </div>
    <b-table :loading="isFetchingCategories" :data="commerceCategories">
      <template slot-scope="props">
        <b-table-column field="id" label="ID" width="40" numeric>{{ props.row.id }}</b-table-column>
        <b-table-column field="name" label="Name">{{ props.row.name }}</b-table-column>
        <b-table-column field="total_items" label="Total Items">{{ props.row.total_items || 0 }}</b-table-column>
        <b-table-column field="actions" label="Actions" class="table-actions">
          <b-button
            class="edit-btn"
            type="is-warning"
            size="is-small"
            icon-left="edit"
            @click="showCategoryEditModal(props.row.id, props.row.name)"
          >Edit</b-button>
          <b-button
            type="is-danger"
            size="is-small"
            icon-left="trash"
            @click="toggleDeletePrompt(props.row.id)"
          >Delete</b-button>
        </b-table-column>
      </template>
    </b-table>

    <b-modal :active="shouldShowAddCategoryModal" @close="handleCloseAddModal" has-modal-card>
      <add-commerce-category
        @createCommerceCategory="handleCreateCategory"
        :isLoading="isCreatingCommerceCategory"
        :categoryCreationError="categoryCreationError"
        v-if="shouldShowAddCategoryModal"
      ></add-commerce-category>
    </b-modal>

    <b-modal :active="shouldShowEditCategoryModal" @close="handleCloseAddModal" has-modal-card>
      <edit-commerce-category
        @editCommerceCategory="handleEditCategory"
        :isLoading="isEditingCommerceCategory"
        :categoryEditingError="categoryEditingError"
        :modalOptions="modalOptions"
        v-if="shouldShowEditCategoryModal"
      />
    </b-modal>
  </div>
</template>

<script src="./Categories.js"></script>
<style src="./Categories.scss" lang="scss" scoped></style>